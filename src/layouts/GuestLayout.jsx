import { Outlet } from "react-router-dom";
import PublicRoute from "../config/PublicRoute";

function GuestLayout() {
    return (
        <PublicRoute>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <Outlet />
            </div>
        </PublicRoute>
    );
}

export default GuestLayout;
