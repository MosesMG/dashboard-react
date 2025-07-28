import { Outlet } from "react-router-dom";

function GuestLayout() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Outlet />
        </div>
    );
}

export default GuestLayout;
