import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ collapsed = false }) => {
    const router = useLocation();

    const navLinks = [
        { href: 'accueil', icon: 'fas fa-home', name: 'Accueil' },
        { href: 'users', icon: 'fas fa-users', name: 'Utilisateurs' },
        { href: 'products', icon: 'fas fa-box', name: 'Produits' },
        { href: 'orders', icon: 'fas fa-shopping-cart', name: 'Commandes' },
        { href: 'customers', icon: 'fas fa-user-friends', name: 'Clients' },
        { href: 'reports', icon: 'fas fa-file-alt', name: 'Rapports' }
    ];

    return (
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-50 shadow-lg border-r border-gray-200
                transition-all duration-300 z-40 ${collapsed ? 'w-16' : 'w-64'}`}>

            <div className="flex flex-col h-full">

                <nav className="flex-1 mt-2 px-2 py-4 space-y-2 overflow-y-auto">
                    {navLinks.map(link => (
                        <Navlink key={link.href} href={link.href} icon={link.icon} 
                                active={router.pathname === `/${link.href}`} collapsed={collapsed}>
                            {link.name}
                        </Navlink>
                    ))}
                </nav>

                <div className="px-4 py-3 border-t border-gray-200">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div
                                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <i className="fas fa-user text-white text-sm"></i>
                            </div>
                        </div>
                        <div className={`ml-3 transition-opacity duration-300 ${collapsed ? 'hidden' : 'block'}`}>
                            <p className="text-sm font-medium text-gray-900">John Doe</p>
                            <p className="text-xs text-gray-500">Administrateur</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function Navlink({ href, collapsed, icon, active, children }) {
    return (
        <Link to={href}
            className={`group flex items-center p-3 font-semibold rounded-lg
                    ${active ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors'}`}>    
            <i className={icon}></i>
            <span className={`${collapsed ? 'h-6' : 'ml-3 uppercase transition-opacity duration-300'}`}>
                {!collapsed && children}
            </span>
        </Link>
    )
}

export default Sidebar;
