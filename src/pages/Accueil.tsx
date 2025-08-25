import React from 'react'
import PageTitle from '../components/ui/PageTitle';
import { BarChart3, User } from 'lucide-react';

import sourceData from '../data/sourceData.json';
import revenues from '../data/revenues.json';
import Bars from '../components/chart.js/Bars';
import Circle from '../components/chart.js/Circle';
import Breadcrumb from '../components/ui/Breadcrumb';

const Accueil: React.FC = () => {
    const breadcrumbItems = [
        { name: 'Accueil', link: '' }
    ];

    const stats = [
        { title: 'Utilisateurs Totaux', value: '12,345', change: '+12%', color: 'bg-blue-500' },
        { title: 'Revenus', value: '€45,678', change: '+8%', color: 'bg-green-500' },
        { title: 'Commandes', value: '1,234', change: '-3%', color: 'bg-yellow-500' },
        { title: 'Taux de Conversion', value: '3.2%', change: '+0.5%', color: 'bg-purple-500' },
    ];

    const notifs = [
        { action: 'Nouvel utilisateur inscrit', time: 'Il y a 2 minutes', user: 'Alice Martin' },
        { action: 'Commande complétée', time: 'Il y a 15 minutes', user: 'Bob Dupont' },
        { action: 'Paiement reçu', time: 'Il y a 1 heure', user: 'Claire Bernard' },
        { action: 'Document téléchargé', time: 'Il y a 2 heures', user: 'David Rousseau' },
    ];

    return (
        <>
            <PageTitle title='Accueil' />
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-7xl mx-auto mt-12">
                {/* Cards de statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {stat.change} ce mois
                                    </p>
                                </div>
                                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <BarChart3 className="text-white" size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Graphique principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

                {/* Activité récente */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
                        <div className="space-y-4">
                            {notifs.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <User size={16} className="text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tâches Rapides</h3>
                        <div className="space-y-3">
                            {[
                                'Créer un nouveau rapport',
                                'Inviter des utilisateurs',
                                'Configurer les notifications',
                                'Exporter les données',
                                'Planifier une maintenance'
                            ].map((task, index) => (
                                <button
                                    key={index}
                                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                                            {task}
                                        </span>
                                        <span className="text-gray-400 group-hover:text-blue-500">→</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl mt-8 p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tableau de données</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="pb-3 text-sm font-medium text-gray-600">Produit</th>
                                    <th className="pb-3 text-sm font-medium text-gray-600">Statut</th>
                                    <th className="pb-3 text-sm font-medium text-gray-600">Ventes</th>
                                    <th className="pb-3 text-sm font-medium text-gray-600">Revenue</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {['Produit A', 'Produit B', 'Produit C'].map((product, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="py-3 text-sm text-gray-900">{product}</td>
                                        <td className="py-3">
                                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                Actif
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-gray-900">{(1250 + i * 200).toLocaleString()}</td>
                                        <td className="py-3 text-sm font-medium text-gray-900">€{(15000 + i * 3000).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Accueil;
