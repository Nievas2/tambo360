import { API_ENDPOINTS } from '@/src/constants/routes'
import axios from 'axios'

export const api = axios.create({
  baseURL: API_ENDPOINTS.BASE,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthMe = error.config?.url?.includes('/auth/me')
    const isLogout = error.config?.url?.includes('/auth/logout')

    if (error.response?.status === 401) {
      // Si falla /auth/me, no redirigimos por fuera de React
      // Solo dejamos que el catch de AuthContext lo maneje
      if (!isAuthMe && !isLogout && typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const apiGob = axios.create({
  baseURL: API_ENDPOINTS.GOB,
  withCredentials: true,
})
