import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestLayout: React.FC = () => {
    const { user, token, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-y-5 min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
                <p className="text-2xl font-semibold uppercase text-gray-700 animate-pulse">Chargement</p>
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
