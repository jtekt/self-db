import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import { ThemeProvider } from "@/components/theme-provider"

import Root from "@/routes/Root"
import Login from "@/routes/Login"
import Register from "@/routes/Register"
import Databases from "@/routes/Databases"
import NewDatabase from "@/routes/NewDatabase"
import Database from "@/routes/Database"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/databases",
    element: <Databases />,
  },
  {
    path: "/databases/new",
    element: <NewDatabase />,
  },
  {
    path: "/databases/:name",
    element: <Database />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header className="fixed h-16 flex items-center px-4 inset-0 border-b">
        <span className="text-2xl">Self DB</span>
      </header>
      <main className="max-w-4xl mx-auto mt-20">
        <RouterProvider router={router} />
      </main>
    </ThemeProvider>
  </React.StrictMode>
)
