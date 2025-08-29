import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    withXSRFToken: true,
    withCredentials: true,
});

// Intercepteur pour ajouter automatiquement le token aux requêtes
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
