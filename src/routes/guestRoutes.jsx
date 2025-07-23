import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export default [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />
    }
]
