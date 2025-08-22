import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router"
import Login from "./Login"
import Browse from "./Browse"

const Layout = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },

    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}
export default Layout

  