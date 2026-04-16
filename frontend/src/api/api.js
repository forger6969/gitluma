import axios from "axios"
import { startRateLimit } from "../store/slices/rateLimitSlice"

let injectedStore = null
export const injectStore = (store) => {
    injectedStore = store
}

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
            const retryAfter = err.response?.headers?.["retry-after"]
            const retryAfterSeconds = Number(retryAfter)
            const retryAfterMs = Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
                ? retryAfterSeconds * 1000
                : 30000
            injectedStore?.dispatch?.(startRateLimit({ retryAfterMs }))
            return Promise.reject(err)
        }

        try {
            if (err.response?.status === 401 && !originalReq._retry) {
                originalReq._retry = true

                const refresh_token = localStorage.getItem("refresh_token")

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