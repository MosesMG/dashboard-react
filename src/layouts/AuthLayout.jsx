import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import { useState } from "react";

const AuthLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onToggle={toggleSidebar} />

            <div className="flex">
                <Sidebar collapsed={collapsed} />

                <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
                    <div className="p-6 min-h-[calc(100vh-3rem)]">
                        <div className="bg-white rounded-lg shadow-sm p-6 mt-15 mb-6">
                            <Outlet />
                        </div>
                    </div>

                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default AuthLayout;
