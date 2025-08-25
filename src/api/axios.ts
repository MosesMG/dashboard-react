import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    withXSRFToken: true,
    // withCredentials: true,
});

export default axiosClient;
