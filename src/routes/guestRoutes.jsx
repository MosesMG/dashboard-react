import GuestLayout from "../layouts/GuestLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export default [
    {
        element: <GuestLayout />,
        children: [
            {
                path: "/login", name: 'login', element: <Login />,
            },
            {
                path: "/register", name: 'register', element: <Register />
            }
        ]
    }
];
