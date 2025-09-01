import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContextType, LoginResponse, RegisterResponse } from '../types/auth';
import type { JwtProps, User } from "../types/user";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../services/api.service";
import type { AxiosResponse } from "axios";
import axios from "axios";

interface AuthProviderProps {
    children: ReactNode;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Initialisation : vérifier si un token existe au démarrage
    useEffect(() => {
        const initAuth = async () => {
            const oldToken = localStorage.getItem('token');

            if (oldToken) {
                try {
                    setToken(oldToken);

                    const payload = JSON.parse(atob(oldToken.split('.')[1]));
                    const userData = await getUser(payload.id);
                    setUser(userData);
                    // Optionnel : Vérifier que le token est toujours valide
                    const decoded = jwtDecode<JwtProps>(oldToken);

                    if (decoded.exp * 1000 < Date.now()) {
                        localStorage.removeItem("token");
                        setToken(null);
                    } else {
                        setToken(oldToken);
                        await getUser(decoded.id);
                    }
                } catch (error) {
                    console.error('Erreur lors de la restauration de la session:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (
        email: string,
        password: string,
        navigate?: (path: string) => void
    ): Promise<void> => {
        try {
            setLoading(true);

            const response: AxiosResponse<LoginResponse> = await axiosClient.post('/auth/login', {
                email,
                password,
            });

            const { token: newToken, user: userData } = response.data.body;

            setToken(newToken);
            setUser(userData);

            localStorage.setItem('token', newToken);

            if (navigate) navigate('/accueil');

        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("Erreur lors de la connexion.");
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        navigate?: (path: string) => void,
    ): Promise<void> => {
        try {
            setLoading(true);

            const response: AxiosResponse<RegisterResponse> = await axiosClient.post('/auth/register', {
                name,
                email,
                password,
            });

            const { token: newToken, newUser } = response.data.body;

            setToken(newToken);
            setUser(newUser);

            localStorage.setItem('token', newToken);

            if (navigate) navigate('/accueil');

        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("Erreur lors de l'inscription.")
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = (): void => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const getUser = async (id: string): Promise<User> => {
        try {
            const response: AxiosResponse<User> = await axiosClient.get(`/auth/user/${id}`);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message;
                throw new Error(errorMessage);
            } else {
                throw new Error('Erreur inconnue');
            }
        }
    };

    const value: AuthContextType = {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        getUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};

export default AuthContext;
