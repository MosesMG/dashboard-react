import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const csrf = async () => axiosClient.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        try {
            const { data } = await axiosClient.get('/api/user');
            setUser(data);
        } catch (err) {
            setUser(null);
            throw (err);
        } finally {
            setLoading(false);
        }
    }

    const login = async (credentials) => {
        await csrf();
        try {
            await axiosClient.post('/login', credentials);
            getUser();
            return { success: true }
        } catch (err) {
            if (err.response?.status === 422) {
                return {
                    success: false,
                    errors: setErrors(err.response.data.errors),
                }
            }
        }
    }

    const register = async (userData) => {
        await csrf();
        try {
            await axiosClient.post('/register', userData);
            getUser();
            return { success: true }
        } catch (err) {
            if (err.response?.status === 422) {
                return {
                    success: false,
                    errors: setErrors(err.response.data.errors),
                }
            }
        }
    }

    const logout = async () => {
        try {
            await axiosClient.post('/logout');
            setUser(null);
        } catch (error) {
            console.log('Erreur de déconnexion: ', error);
        }
    };

    const value = {
        user, errors, setErrors, getUser, loading,
        login, register, logout
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
