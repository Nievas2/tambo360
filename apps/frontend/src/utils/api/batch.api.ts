import { api } from '@/src/services/api'
import { BatchData } from '@/src/types/batch'

export const createBatch = (dto: BatchData) =>
  api.post('/lote/registrar', {
    idProducto: dto.idProducto,
    cantidad: dto.cantidad,
    fechaProduccion: dto.fechaProduccion,
    unidad: 'kg',
  })

export const updateBatch = (dto: BatchData, id: string) =>
  api.put(`/lote/actualizar/${id}`, dto)

export const getBatches = () => api.get('/lote/listar')

export const getBatch = (id: string) => api.get(`/lote/${id}`)

export const deleteBatch = (id: string) => api.delete(`/lote/eliminar/${id}`)
