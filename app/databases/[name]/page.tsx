"use client"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import DeleteButton from "@/components/DeleteButton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { useRouter, useParams } from "next/navigation"
import axios from "axios"
import Cookies from "universal-cookie"
import { TOKEN_COOKIE_NAME } from "@/config"

const { NEXT_PUBLIC_DB_HOST, NEXT_PUBLIC_DB_PORT } = process.env

export default function () {
  const [loading, setLoading] = useState(false)
  const [database, setDatabase] = useState<any>()

  const router = useRouter()
  const { name } = useParams()

  async function getData() {
    const cookies = new Cookies()
    const token = cookies.get(TOKEN_COOKIE_NAME)
    const headers = { Authorization: `Bearer ${token}` }
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/databases/${name}`, { headers })
      setDatabase(data)
    } catch (error: any) {
      if (error.response.status === 401) return router.push("/login")
      alert("Data query failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="mt-4">
        {loading ? (
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
        ) : (
          <>
            {database ? (
              <>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/databases">
                        Databases
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {database ? database.db : "Database"}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex justify-between my-4 ">
                  <h2 className="text-4xl">
                    {database ? database.db : "Database"}
                  </h2>
                  <DeleteButton />
                </div>
                <p>Host: {NEXT_PUBLIC_DB_HOST || database.host}</p>
                <p>Port: {NEXT_PUBLIC_DB_PORT || database.port}</p>
                <p>Database: {database.db}</p>
                <p>User: {database.username}</p>
                <p>
                  Connection string:{" "}
                  {`postgresql://${database.username}:YOUR_PASSWORD@${
                    NEXT_PUBLIC_DB_HOST || database.host
                  }:${NEXT_PUBLIC_DB_PORT || database.port}/${database.db}`}
                </p>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  )
}