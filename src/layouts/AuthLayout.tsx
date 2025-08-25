import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AuthLayout: React.FC = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

            <Navbar isCollapsed={isSidebarCollapsed} />

            {/* Contenu principal */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed
                    ? 'ml-16' : 'ml-64'} mt-16 mb-12 p-6`}>
                <Outlet />
            </main>

            <Footer isCollapsed={isSidebarCollapsed} />
        </div>
    );
}

export default AuthLayout;
