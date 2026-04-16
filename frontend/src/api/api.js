import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const refreshApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.response.use(
    async (res) => res,
    async (err) => {

        const originalReq = err.config

        if (err.response && err.response.status === 429) {
            if (window.location.pathname !== "/too-many-requests") {
                window.location.href = "/too-many-requests"
            }
            return Promise.reject(err)
        }

        try {
            // 🔥 2. 401 HANDLER (refresh token)
            if (err.response?.status === 401 && !originalReq._retry) {
                originalReq._retry = true

                const refresh_token = localStorage.getItem("refresh_token")

                // ❗ refreshApi ishlatamiz (loop bo‘lmasligi uchun)
                const request = await refreshApi.post("/api/auth/refresh", {
                    refresh_token
                })

                const token = request.data.token

                localStorage.setItem("access_token", token)

                originalReq.headers.Authorization = `Bearer ${token}`

                return await api(originalReq)
            }

        } catch (error) {
            localStorage.clear()
            window.location = "/"
            return Promise.reject(error)
        }

        return Promise.reject(err)
    }
)

api.interceptors.request.use((config) => {

    const access_token = localStorage.getItem("access_token")

    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
    }

    return config
})

export default api