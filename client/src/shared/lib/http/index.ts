import axios, { AxiosError } from "axios"

const API_URL = 'http://localhost:7000'

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use((config) => config, async (error: AxiosError) => {
  const originalRequest: any = error.config
  if (error.response!.status = 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest._isRetry = true
    try {
      const authPayload = await axios.post<IAuthPayload>(`${API_URL}/auth/refresh`, {
        refreshToken: localStorage.getItem('token')
      }, {withCredentials: true})
      localStorage.setItem('token', authPayload.data.accessToken)
      return $api.request(originalRequest)
    } catch {
      alert('Не авторизован')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
  throw error
})