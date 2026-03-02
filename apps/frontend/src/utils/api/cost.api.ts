import { api } from '@/src/services/api'
import { CreateCostData, UpdateCostData } from '@/src/types/cost'

export const createCost = async (values: CreateCostData) =>
  api.post('/costos/registrar', values)

export const getBatchCosts = (id: string) =>
  api.get('/costos/costos-lote/' + id)

export const getCostDetail = (id: string) => api.get(`/costos/detalle/${id}`)

export const updateCost = (dto: UpdateCostData, id: string) =>
  api.put(`/costos/actualizar/${id}`, dto)

export const deleteCost = (id: string) => api.delete(`/costos/eliminar/${id}`)
