import { createBrowserRouter, RouterProvider } from "react-router"
import Auth from "./Auth"
import Browse from "./Browse"


const Layout = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Auth mode="login" />
        },
        {
            path: "/signup",
            element: <Auth mode="signup" />
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

