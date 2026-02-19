import { API_ENDPOINTS } from '@/src/constants/routes'
import axios from 'axios'

export const api = axios.create({
  baseURL: API_ENDPOINTS.BASE,
  withCredentials: true,
})
