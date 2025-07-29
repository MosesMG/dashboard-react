import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { useEffect } from "react";
import Loader from "../components/ui/Loader";

function GuestLayout() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/accueil');
        }
    }, [user, loading]);

    if (loading) return <Loader />;
    
    return (
        !user && (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <Outlet />
            </div>
        )
    );
}

export default GuestLayout;
