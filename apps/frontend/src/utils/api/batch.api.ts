import { api } from '@/src/services/api'
import { BatchData } from '@/src/types/batch'

export const createBatch = (dto: BatchData) => api.post('/lote/registrar', dto)

export const updateBatch = (dto: BatchData, id: string) =>
  api.put(`/lote/actualizar/${id}`, dto)

export const getBatches = () => api.get('/lote/listar')

export const getBatch = (id: string) => api.get(`/lote/buscar-lote/${id}`)

export const getBatchesDay = () => api.get('/lote/produccion-hoy')

export const deleteBatch = (id: string) => api.delete(`/lote/eliminar/${id}`)
