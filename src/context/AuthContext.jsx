import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    // const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const csrf = async () => axiosClient.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        const { data } = await axiosClient.get('/api/user');
        setUser(data);
    }

    const login = async (credentials) => {
        await csrf();
        try {
            await axiosClient.post('/login', credentials);
            getUser();
            navigate('/accueil');
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            }
        }
    }

    const register = async (userData) => {
        await csrf();
        try {
            await axiosClient.post('/register', userData);
            getUser();
            navigate('/accueil');
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            }
        }
    }

    // const login = async (credentials) => {
    //     try {
    //         await axiosClient.get('/sanctum/csrf-cookie');
    //         const response = await axiosClient.post('/login', credentials);
    //         setUser(response.data.user);
    //         return { success: true };
    //     } catch (error) {
    //         if (error.response?.status === 422) {
    //             return {
    //                 success: false,
    //                 errors: error.response.data.errors
    //             };
    //         } else if (error.response?.status === 401) {
    //             return {
    //                 success: false,
    //                 errors: { email: ['Identifiants incorrects.'] }
    //             };
    //         }
    //         return {
    //             success: false,
    //             errors: { general: ['Une erreur est survenue.'] }
    //         };
    //     }

    const logout = async () => {
        try {
            await axiosClient.post('/logout');
            setUser(null);
        } catch (error) {
            console.log('Erreur de déconnexion: ', error);
        }
    };

    const value = {
        user, errors, setErrors, getUser,
        login, register, logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
