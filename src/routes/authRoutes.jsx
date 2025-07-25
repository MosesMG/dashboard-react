import AuthLayout from "../layouts/AuthLayout";
import Accueil from "../pages/Accueil";
import ListeArticle from "../pages/articles/ListeArticle";
import ListeCategorie from "../pages/categories/ListeCategorie";
import ListeClients from "../pages/customers/ListeClients";
import ListeOrders from "../pages/orders/ListeOrders";
import ListeStore from "../pages/stores/ListeStore";
import Users from "../pages/Users";

export default [
    { 
        element: <AuthLayout />,
        children: [
            { path: 'accueil', element: <Accueil />, name: 'accueil' },
            { path: 'utilisateurs', element: <Users />, name: 'users' },
            { path: 'boutiques', children: [
                { path: '', element: <ListeStore />, name: 'boutiques.liste' }
            ] },
            { path: 'categories', children: [
                { path: '', element: <ListeCategorie />, name: 'categories.liste' }
            ] },
            { path: 'articles', children: [
                { path: '', element: <ListeArticle />, name: 'articles.liste' }
            ] },
            { path: 'commandes', children: [
                { path: '', element: <ListeOrders />, name: 'commandes.liste' }
            ] },
            { path: 'clients', children: [
                { path: '', element: <ListeClients />, name: 'clients.liste' }
            ] }
            
        ]
    }
];
