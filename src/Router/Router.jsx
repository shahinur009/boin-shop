import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Error from "../components/Error";
import Products from "../Pages/Products/Products";
import Layout from "../layout/layout";
import Login from "../Pages/login/login";
import Register from "../Pages/register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Products />,
                loader: () => fetch('http://localhost:5000/productCount')
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
]);