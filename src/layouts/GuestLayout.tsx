import React from "react";
import { Outlet } from "react-router-dom";

const GuestLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Outlet />
        </div>
    );
}

export default GuestLayout;
