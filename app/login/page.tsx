"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Cookies from "universal-cookie"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TOKEN_COOKIE_NAME } from "@/config"
import axios from "axios"

export default function () {
  const [loggingIn, setLoggingIn] = useState(false)

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: any) {
    setLoggingIn(true)
    try {
      const { data } = await axios.post("/api/login", values)
      const { token } = data
      const cookies = new Cookies()
      cookies.set(TOKEN_COOKIE_NAME, token, { path: "/" })
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      console.log({ token })

      router.push("/databases")
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed"
      alert(message)
    } finally {
      setLoggingIn(false)
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>Your username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>Your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loggingIn}
              type="submit"
              className="block mx-auto"
            >
              {loggingIn ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>
          <p className="text-center mt-4">
            No account? Register{" "}
            <Link href="/register" className="font-bold text-primary">
              here
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  )
}
