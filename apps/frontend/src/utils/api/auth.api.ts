import { api } from '@/src/services/api'

export const registerUser = (dto: any) => api.post('/auth/crear-cuenta', dto)

export const loginUser = (dto: any) => api.post('/auth/iniciar-sesion', dto)
