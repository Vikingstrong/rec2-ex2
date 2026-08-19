import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from "./Layout/Layout"
import { lazy } from "react"

const HomePg = lazy(() => import("./pages/Home"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        index: true,
        element: <HomePg/>
      }
    ]
  }
])

export default function App(){

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}