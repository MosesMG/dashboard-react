import React from "react";

const Footer: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
    return (
        <footer className={`bg-white border-t border-gray-200 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'
            } fixed bottom-0 right-0 left-0`}>
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600">
                        © 2025 Dashboard App. Tous droits réservés.
                    </p>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                            Aide
                        </a>
                        <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                            Politique de confidentialité
                        </a>
                        <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                            Conditions
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
