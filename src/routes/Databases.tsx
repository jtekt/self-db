import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import Cookies from "universal-cookie"
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

import { Loader2 } from "lucide-react"

const { VITE_API_URL } = import.meta.env

export default function () {
  const [loading, setLoading] = useState(false)
  const [databases, setDatabases] = useState<any[]>([])

  const navigate = useNavigate()

  async function getData() {
    const cookies = new Cookies()
    const token = cookies.get("token")

    const url = `${VITE_API_URL}/databases`

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const options = { headers }

    setLoading(true)
    try {
      const response = await fetch(url, options)
      if (response.status === 401) navigate("/login")
      const data = await response.json()
      setDatabases(data.items)
    } catch (error) {
      alert("Data query failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Databases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <Button asChild>
            <Link
              className={buttonVariants({ variant: "outline" })}
              to="/databases/new"
            >
              New
            </Link>
          </Button>
        </div>

        {loading ? (
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
        ) : (
          <ul>
            {databases.map((database: any) => (
              <li key={database} className="my-2">
                <Link to={`/databases/${database}`}>{database}</Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
