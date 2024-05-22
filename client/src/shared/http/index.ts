import axios from "axios"

export const API_URL = 'http://localhost:7000'

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

$api.interceptors.response.use((config) => config, async (error) => {
  const originalRequest: any = error.config
  if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest._isRetry = true
    try {
      await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken: localStorage.getItem('refreshToken')
      }, { withCredentials: true })
      return $api.request(originalRequest!)
    } catch {
      console.log('Do not auth')
    }
  }
  throw error
})