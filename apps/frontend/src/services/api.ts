import { API_ENDPOINTS } from '@/src/constants/routes'
import axios from 'axios'

export const api = axios.create({
  baseURL: API_ENDPOINTS.BASE,
  withCredentials: true,
})

export const apiIA = axios.create({
  baseURL: API_ENDPOINTS.BASE_IA,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthMe = error.config?.url?.includes('/auth/me')
    const isLogout = error.config?.url?.includes('/auth/logout')

    if (error.response?.status === 401) {
      if (!isAuthMe && !isLogout && typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
