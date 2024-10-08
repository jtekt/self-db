"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useFormState } from "react-dom"
import { Save } from "lucide-react"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SubmitButton } from "@/components/SubmitButton"
import { createDbAction } from "@/actions/databases"

export default function () {
  const form = useForm({
    defaultValues: {
      database: "",
    },
  })

  const [state, formAction] = useFormState(createDbAction, undefined)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/databases">Databases</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-4xl my-4">Databases</h2>
      <Form {...form}>
        <form action={formAction} className="space-y-4">
          <FormField
            control={form.control}
            name="database"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Database</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    pattern="^[a-zA-Z0-9-_]*$"
                  />
                </FormControl>
                <FormDescription>Alphanumeric</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton>
            <Save />
          </SubmitButton>
        </form>
      </Form>
      {state?.error && <div className="my-4 text-center">{state?.error}</div>}
    </>
  )
}
