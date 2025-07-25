import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>
        <i className="fa fa-spinner fa-spin mr-2"></i>
        Chargement en cours...    
    </div>;
    
    return !user ? children : <Navigate to="/accueil" replace />;
}

export default PublicRoute;
