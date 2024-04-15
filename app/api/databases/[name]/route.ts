import { pool } from "@/db"
import { NextResponse } from "next/server"
import { NEXT_PUBLIC_DB_HOST, NEXT_PUBLIC_DB_PORT } from "@/config"
import { getUserIdByName } from "@/app/lib/actions"
import format from "pg-format"

const getDbOfUser = async (userId: number, dbName: string) => {
  const query = `SELECT datname FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datdba = $1 AND pg_catalog.pg_database.datname = $2;`

  const res = await pool.query(query, [userId, dbName] as any)
  return res.rows.map(({ datname }) => datname)
}

type Params = {
  name: string
}

export async function GET(request: Request, context: { params: Params }) {
  const { name } = context.params

  const xUserHeader = request.headers.get("X-User")
  if (!xUserHeader)
    return NextResponse.json(
      { message: `Missing X-User header` },
      { status: 401 }
    )
  const { username } = JSON.parse(xUserHeader)

  const userId = await getUserIdByName(username)
  const [db] = await getDbOfUser(userId, name)

  return NextResponse.json(
    { username, db, host: NEXT_PUBLIC_DB_HOST, port: NEXT_PUBLIC_DB_PORT },
    { status: 200 }
  )
}

export async function DELETE(request: Request, context: { params: Params }) {
  const { name } = context.params

  const xUserHeader = request.headers.get("X-User")
  if (!xUserHeader)
    return NextResponse.json(
      { message: `Missing X-User header` },
      { status: 401 }
    )
  const { username } = JSON.parse(xUserHeader)

  const userId = await getUserIdByName(username)
  const [db] = await getDbOfUser(userId, name)
  if (!db)
    return NextResponse.json(
      { message: `DB ${name} not found for user ${username}` },
      { status: 400 }
    )

  const query = format(`DROP DATABASE %I`, name)

  await pool.query(query)

  return NextResponse.json(
    { username, db, host: NEXT_PUBLIC_DB_HOST, port: NEXT_PUBLIC_DB_PORT },
    { status: 200 }
  )
}
