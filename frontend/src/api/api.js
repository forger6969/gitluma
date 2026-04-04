import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("access_token");
            window.location.href = "/";
        }
        return Promise.reject(err);
    }
);

api.interceptors.request.use((config) => {

    const access_token = localStorage.getItem("access_token")

    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
    }

    return config

})

export default api