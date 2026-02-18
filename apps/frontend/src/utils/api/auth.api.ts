import { api } from '@/src/services/api'

export const registerUser = (dto: any) => api.post('/register', dto)

export const loginUser = (dto: any) => api.post('/login', dto)
