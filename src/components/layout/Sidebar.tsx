import { BarChart3, FileText, Home, Layers, Layers2, Menu, Settings, Users } from 'lucide-react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

interface SideComponents {
    isCollapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SideComponents> = ({ isCollapsed, onToggle }) => {
    const location = useLocation();

    const menuItems = [
        { icon: Home, label: 'Accueil', href: '/accueil' },
        { icon: FileText, label: 'Posts', href: '/posts' },
        { icon: Layers, label: 'Catégories', href: '/categories' },
        { icon: Layers2, label: 'Articles', href: '/articles' },
        { icon: BarChart3, label: 'Analyses', href: '/analyses' },
        { icon: Users, label: 'Utilisateurs', href: '/utilisateurs' },
        { icon: Settings, label: 'Paramètres', href: '#' },
    ];

    return (
        <div className={`bg-slate-900 text-white h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'
            } fixed left-0 top-0 z-30 shadow-xl`}>
            {/* Header avec bouton toggle */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                {!isCollapsed && (
                    <h2 className="text-xl font-bold text-blue-400">Dashboard</h2>
                )}
                <button
                    onClick={onToggle}
                    className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav className="mt-6 space-y-3 p-2">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.href}
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors group relative ${location.pathname.startsWith(item.href)
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                            : 'text-slate-300 hover:bg-slate-600 hover:text-white'
                        }`}
                    >
                        <item.icon size={20} className="flex-shrink-0" />
                        {!isCollapsed && (
                            <span className="ml-3 uppercase font-semibold transition-opacity duration-300">
                                {item.label}
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-16 ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                {item.label}
                            </div>
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
