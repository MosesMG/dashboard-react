import { useEffect, useRef, useState } from "react";

const Navbar = ({ onToggle }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side */}
                    <div className="flex items-center">
                        {/* Menu hamburger */}
                        <button onClick={onToggle}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors">
                            <i className="fas fa-bars text-lg"></i>
                        </button>

                        {/* <Logo */}
                        <div className="ml-4 flex items-center">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                                <i className="fas fa-tachometer-alt text-white text-xl"></i>
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-800">Dashboard</span>
                        </div>
                    </div>

                    {/* Searchbar */}
                    <div className="hidden md:block flex-1 max-w-lg mx-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-search text-gray-400"></i>
                            </div>
                            <input type="text" placeholder="Rechercher..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors relative">
                                <i className="fas fa-bell text-lg"></i>
                                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
                            </button>
                        </div>

                        {/* Messages */}
                        <button
                            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                            <i className="fas fa-envelope text-lg"></i>
                        </button>

                        {/* Profile dropdown */}
                        <div className="relative" ref={profileMenuRef}>
                            <button onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                    <i className="fas fa-user text-white text-sm"></i>
                                </div>
                                <span className="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
                                <i className="fas fa-chevron-down text-xs text-gray-400"></i>
                            </button>

                            {/* Dropdown menu */}
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                    <a href="#"
                                        className="flex items-center px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                        <i className="fas fa-user mr-3 text-gray-400"></i>
                                        Mon Profil
                                    </a>
                                    <a href="#"
                                        className="flex items-center px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                        <i className="fas fa-cog mr-3 text-gray-400"></i>
                                        Paramètres
                                    </a>
                                    <hr className="my-1 border-gray-200" />
                                    <a href="#"
                                        className="flex items-center px-4 py-2 my-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                        <i className="fas fa-sign-out-alt mr-3 text-gray-400"></i>
                                        Déconnexion
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
