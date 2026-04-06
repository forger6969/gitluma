import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const refreshApi = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})

api.interceptors.response.use(
  async  (res) => res,
   async (err) => {

     const originalReq = err.config

    try {
            if (err.response?.status === 401 && !originalReq._retry) {
                originalReq._retry = true
            const refresh_token = localStorage.getItem("refresh_token")
            const request = await api.post("/api/auth/refresh",{
                refresh_token
            } )
const token = request.data.token
localStorage.setItem("access_token" , token)
console.log(token);

originalReq.headers.Authorization = `Bearer ${token}`

return await api(originalReq)


        }
    } catch (err) {
        localStorage.clear()
        window.location = "/"
        return Promise.reject(err);

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