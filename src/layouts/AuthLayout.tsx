import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const AuthLayout: React.FC = () => {
    
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const { user, token, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-y-5 min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
                <p className="text-2xl font-semibold uppercase text-gray-700 animate-pulse">Chargement</p>
            </div>
        );
    }

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />

            <Navbar isCollapsed={isCollapsed} />

            {/* Contenu principal */}
            <main className={`flex-1 transition-all duration-300 ${isCollapsed
                    ? 'ml-16' : 'ml-64'} mt-16 mb-12 p-6`}>
                <Outlet />
            </main>

            <Footer isCollapsed={isCollapsed} />
        </div>
    );
}

export default AuthLayout;
