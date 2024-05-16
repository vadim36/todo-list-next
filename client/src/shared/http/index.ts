import axios, { AxiosError } from "axios"
import Cookies from "js-cookie"

export const API_URL = 'http://localhost:7000'

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

$api.interceptors.request.use((config) => {
  const accessToken: string | undefined = Cookies.get('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  
  return config
})

$api.interceptors.response.use((config) => config, async (error: AxiosError) => {
  const originalRequest: any = error.config
  if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest._isRetry = true
    try {
      await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true })
      return $api.request(originalRequest!)
    } catch {
      console.log('Не авторизован')
    }
  }
  throw error
})