import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestLayout: React.FC = () => {
    const { user, token, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    
    if (token && user) {
        return <Navigate to="/accueil" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Outlet />
        </div>
    );
}

export default GuestLayout;
