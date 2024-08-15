import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Error from "../components/Error";
import Products from "../Pages/Products/Products";
import Layout from "../layout/layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Products />
            },
            // {
            //     path:'/login',
            //     element:
            // }
        ]
    },
]);