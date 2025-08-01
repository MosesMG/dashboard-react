import { Link, useLocation } from "react-router-dom";
import useAuth from "../../context/AuthContext";

const Sidebar = ({ collapsed = false }) => {
    const { user } = useAuth();
    const location = useLocation();

    const navLinks = [
        { href: 'accueil', icon: 'fas fa-home', name: 'Accueil' },
        { href: 'boutiques', icon: 'fas fa-store', name: 'Boutiques' },
        { href: 'categories', icon: 'fas fa-tags', name: 'Catégories' },
        { href: 'articles', icon: 'fas fa-box', name: 'Articles' },
        { href: 'commandes', icon: 'fas fa-shopping-cart', name: 'Commandes' },
        { href: 'clients', icon: 'fas fa-user-friends', name: 'Clients' },
        { href: 'utilisateurs', icon: 'fas fa-users', name: 'Utilisateurs' },
        { href: 'rapports', icon: 'fas fa-file-alt', name: 'Rapports' }
    ];

    return (
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-200 shadow-lg border-r border-gray-200
                transition-all duration-300 z-40 ${collapsed ? 'w-16' : 'w-64'}`}>

            <div className="flex flex-col h-full">
                <nav className="flex-1 mt-2 px-2 py-4 space-y-2 overflow-y-auto">
                    {navLinks.map(link => (
                        <Navlink key={link.href} href={link.href} icon={link.icon} 
                                active={location.pathname === `/${link.href}`} collapsed={collapsed}>
                            {link.name}
                        </Navlink>
                    ))}
                </nav>

                <div className="px-4 py-2 border-t border-gray-400">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div
                                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <i className="fas fa-user text-white text-sm"></i>
                            </div>
                        </div>
                        <div className={`ml-3 transition-opacity duration-300 ${collapsed ? 'hidden' : 'block'}`}>
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function Navlink({ href, collapsed, icon, active, children }) {
    return (
        <Link to={href} title={collapsed && children}
            className={`group flex items-center p-3 font-semibold rounded-lg
                    ${active ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors'}`}>    
            <i className={icon}></i>
            <span className={`${collapsed ? 'h-6' : 'ml-3 uppercase transition-opacity duration-300'}`}>
                {!collapsed && children}
            </span>
        </Link>
    )
}

export default Sidebar;
