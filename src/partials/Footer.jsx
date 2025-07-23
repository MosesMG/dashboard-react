const Footer = () => {
    const annee = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                    <i className="far fa-copyright mr-1"></i>
                    <span>{ annee } Dashboard. Tous droits réservés.</span>
                </div>

                <div className="flex items-center space-x-6 mt-2 sm:mt-0">
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center">
                        <i className="fas fa-shield-alt mr-1"></i>
                        Confidentialité
                    </a>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center">
                        <i className="fas fa-file-contract mr-1"></i>
                        Conditions
                    </a>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center">
                        <i className="fas fa-life-ring mr-1"></i>
                        Support
                    </a>
                </div>

                <div className="flex items-center text-sm text-gray-400 mt-2 sm:mt-0">
                    <i className="fas fa-code-branch mr-1"></i>
                    <span>v1.0.0</span>
                </div>
            </div>

            {/* <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center">
                        <i className="fas fa-server mr-1"></i>
                        <span>Statut du serveur: </span>
                        <span className="text-green-500 ml-1 flex items-center">
                            <i className="fas fa-circle text-xs mr-1"></i>
                            En ligne
                        </span>
                    </div>

                    <div className="flex items-center mt-1 sm:mt-0">
                        <i className="fas fa-clock mr-1"></i>
                        <span>Dernière mise à jour: {{ lastUpdate }}</span>
                    </div>
                </div>
            </div> */}
        </footer>
    )
}

export default Footer;
