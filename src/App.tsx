import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from "./Layout/Layout"
import { lazy } from "react"

const ReduxPg = lazy(() => import("./pages/Redux"))
const JotaiPg = lazy(() => import("./pages/Jotai"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        index: true,
        element: <JotaiPg/>
      },
      {
        path: "/redux",
        element: <ReduxPg/>
      }
    ]
  }
])

export default function App(){

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}