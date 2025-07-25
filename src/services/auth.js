import axiosClient from "./axios";

export const authService = {
    async login(credentials) {
        try {
            await axiosClient.get('/sanctum/csrf-cookie');
            const { data } = await axiosClient.post('/login', credentials);
            return data;
        } catch (error) {
            throw error.response?.data?.message;
        }
    },

    async register(userData) {
        try {
            await axiosClient.get('/sanctum/csrf-cookie');
            const { data } = await axiosClient.post('/register', userData);
            return data;
        } catch (error) {
            throw error.response?.data?.message;
        }
    },

    async logout() {
        await axiosClient.post('/logout');
    },

    async forgotPassword(email) {
        try {
            await axiosClient.get('/sanctum/csrf-cookie');
            const { data } = await axiosClient.post('/forgot-password', { email });
            return data;
        } catch (error) {
            throw error.response?.data?.message;
        }
    },

    async resetPassword(token, email, password, password_confirmation) {
        try {
            await axiosClient.get('/sanctum/csrf-cookie');
            const { data } = await axiosClient.post('/reset-password', {
                token,
                email,
                password,
                password_confirmation,
            });
            return data;
        } catch (error) {
            throw error.response?.data?.message;
        }
    },

    async getUser() {
        try {
            await axiosClient.get('/sanctum/csrf-cookie');
            const { data } = await axiosClient.get('/api/user');
            return data;
        } catch (error) {
            throw error.response?.data?.message;
        }
    },
};
