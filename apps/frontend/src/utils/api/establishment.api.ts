import { api } from '@/src/services/api'
import { EstablishmentData, EstablishmentName } from '@/src/types/establishment'

export const createEstablishment = (dto: EstablishmentData) =>
  api.post('/establecimiento/registrar', dto)

export const updateEstablishmentName = (dto: EstablishmentName) =>
  api.patch(`/establecimiento/editar-nombre`, dto)
