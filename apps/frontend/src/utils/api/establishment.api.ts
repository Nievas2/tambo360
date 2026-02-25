import { api } from '@/src/services/api'
import { EstablishmentData } from '@/src/types/establishment'

export const createEstablishment = (dto: EstablishmentData) =>
  api.post('/establecimiento/registrar', dto)
