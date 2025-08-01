import { useEffect } from "react";
import useAuth from "../context/AuthContext";
import PageTitle from "../components/ui/PageTitle";
import Breadcrumb from "../components/ui/BreadCrumb";
import Bars from "../components/chart.js/Bars";
import Circle from "../components/chart.js/Circle";

import sourceData from '../data/sourceData.json';
import revenues from '../data/revenues.json';

const Accueil = () => {
    const { user, getUser } = useAuth();

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, []);

    const breadCrumbItems = [
        { name: 'Accueil' }
    ]

    return (
        <>
            <PageTitle title="Accueil" />

            <Breadcrumb items={breadCrumbItems} />

            <section>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Tableau de Bord</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 font-semibold">Utilisateurs</p>
                                <p className="text-3xl font-bold">1,234</p>
                            </div>
                            <i className="fas fa-users text-3xl text-blue-100"></i>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 font-semibold">Revenus</p>
                                <p className="text-3xl font-bold">€45,678</p>
                            </div>
                            <i className="fas fa-euro-sign text-3xl text-green-100"></i>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 font-semibold">Commandes</p>
                                <p className="text-3xl font-bold">567</p>
                            </div>
                            <i className="fas fa-shopping-cart text-3xl text-purple-100"></i>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 font-semibold">Produits</p>
                                <p className="text-3xl font-bold">89</p>
                            </div>
                            <i className="fas fa-box text-3xl text-orange-100"></i>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-300 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            <i className="fas fa-chart-simple text-blue-500 mr-2"></i>
                            Évolution des Ventes
                        </h3>
                        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                            <Bars sourceData={sourceData} />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            <i className="fas fa-chart-pie text-green-500 mr-2"></i>
                            Répartition par Catégorie
                        </h3>
                        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                            <Circle sourceData={revenues} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Accueil;
