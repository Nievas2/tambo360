import { api } from '@/src/services/api'

export const getProducts = () => api.get('/productos')
