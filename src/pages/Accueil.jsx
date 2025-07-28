import { useEffect } from "react";
import useAuth from "../context/AuthContext";

const Accueil = () => {
    const { user, getUser } = useAuth();

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, []);

    return (
        <div>
            ACCUEIL { user?.name }
        </div>
    )
}

export default Accueil;
