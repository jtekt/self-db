import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

import { Loader2 } from "lucide-react"
import axios from "axios"

export default function () {
  const [loading, setLoading] = useState(false)
  const [databases, setDatabases] = useState<any[]>([])

  const navigate = useNavigate()

  async function getData() {
    setLoading(true)
    try {
      const { data } = await axios.get("/databases")
      setDatabases(data.items)
    } catch (error: any) {
      if (error.response.status === 401) return navigate("/login")
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
      <div className="flex justify-between mt-4 ">
        <h2 className="text-4xl">Databases</h2>
        <Button asChild>
          <Link
            className={buttonVariants({ variant: "outline" })}
            to="/databases/new"
          >
            New
          </Link>
        </Button>
      </div>
      <div className="mt-6">
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
      </div>
    </>
  )
}
