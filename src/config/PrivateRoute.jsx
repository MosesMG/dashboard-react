import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if (loading) return <div>
        <i className="fa fa-spinner fa-spin mr-2"></i>
        Chargement en cours...
    </div>;

    return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

export default PrivateRoute;
