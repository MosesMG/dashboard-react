import AuthLayout from "../layout/AuthLayout";
import Accueil from "../pages/Accueil";
import PrivateRoute from "./PrivateRoutes";

export default [
    {
        // element: <PrivateRoute />,
        children: [
            { 
                element: <AuthLayout />,
                children: [
                    { path: 'accueil', element: <Accueil /> }
                ]
            }
        ]
    }
]
