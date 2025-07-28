import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// axiosClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('auth_token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axiosClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem('auth_token');
//             localStorage.removeItem('user');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosClient;
