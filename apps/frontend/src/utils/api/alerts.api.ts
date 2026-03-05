import { apiIA } from '@/src/services/api'

export const getAlerts = (id: string) => apiIA.get(`/${id}`)

export const getLastsAlerts = (id: string) => apiIA.get(`/${id}/ultimas`)
