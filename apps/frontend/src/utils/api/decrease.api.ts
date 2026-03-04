import { api } from '@/src/services/api'
import { DecreaseData, DecreaseWithLote } from '@/src/types/decrease'

export const getDecreaseTypes = () => api.get('/mermas/tipos')

export const createDecrease = (dto: DecreaseWithLote) =>
  api.post('/mermas/', dto)

export const getDecreases = () => api.get('/mermas')

export const getDecrease = (id: string) => api.get(`/mermas/${id}`)

export const updateDecrease = (dto: DecreaseData, id: string) =>
  api.put(`/mermas/${id}`, dto)

export const deleteDecrease = (id: string) => api.delete(`/mermas/${id}`)
