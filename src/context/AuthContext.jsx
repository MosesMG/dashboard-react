import { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../services/axios';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            try {
                await axiosClient.get('/sanctum/csrf-cookie');
                const userData = await authService.getUser();
                setUser(userData);
            } catch (error) {
                setUser(null);
                console.error("Erreur de connexion: ", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    useEffect(() => {
        const i = axiosClient.interceptors.response.use(
            r => r,
            error => {
                if (error.response?.status === 401) {
                    setUser(null);
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
        return () => axiosClient.interceptors.response.eject(i);
    }, [navigate]);

    const login = async (credentials) => {
        const userData = await authService.login(credentials);
        setUser(userData);
    }

    const register = async (userData) => {
        await authService.register(userData);
    }

    const logout = async () => {
        await authService.logout();
        setUser(null);
    }

    const forgotPassword = async (email) => {
        await authService.forgotPassword(email);
    }

    const resetPassword = async (data) => {
        await authService.resetPassword(data);
    }

    const value = {
        user, loading, login, register, logout, forgotPassword, resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    );
};
