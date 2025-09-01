import { Bell, ChevronDown, LogOut, Search, Settings, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [showNotifications, setShowNotifications] = useState<boolean>(false);
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <header className={`bg-white shadow-sm border-b border-gray-200 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'
            } fixed top-0 right-0 left-0 z-20`}>
            <div className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Tableau de Bord
                    </h1>
                </div>

                <div className="flex items-center space-x-5">
                    {/* Search Bar */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Chercher..."
                            className="pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 transition-all duration-200"
                        />
                    </div>

                    {/* Notifications */}
                    <div className="relative" ref={notificationsRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 rounded-lg hover:bg-gray-100 relative"
                        >
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                                </div>
                                <div className="p-2 max-h-96 overflow-y-auto">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                                            <p className="text-sm text-gray-900">Nouvelle notification #{i}</p>
                                            <p className="text-xs text-gray-500 mt-1">Il y a 5 minutes</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="relative" ref={profileMenuRef}>
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">
                                    {user?.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <span className="hidden sm:block text-sm font-medium text-gray-700">
                                {user?.name.split(' ')[0]}
                            </span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="font-medium text-gray-900">{user?.name}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>
                                <div className="p-2">
                                    <Link 
                                        to="/profile"
                                        className="w-full flex items-center space-x-2 p-2 mb-1 rounded-lg hover:bg-gray-100"
                                    >
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700 text-sm">Profil</span>
                                    </Link>

                                    <Link
                                        to="/parametres"
                                        className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                                    >
                                        <Settings className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700 text-sm">Paramètres</span>
                                    </Link>
                                    <hr className="my-2 border-gray-200" />

                                    <button
                                        onClick={() => handleLogout()}
                                        className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-red-600 hover:cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-sm">Se déconnecter</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
