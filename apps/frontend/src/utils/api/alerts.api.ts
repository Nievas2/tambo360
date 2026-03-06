import { apiIA } from '@/src/services/api'

export const getAlerts = (id: string, range: string) =>
  apiIA.get(`/${id}`, {
    params: { range },
  })

export const getLastsAlerts = (id: string) => apiIA.get(`/${id}/ultimas`)

export const changeViewedAlert = (id: string) => apiIA.put(`/${id}/visto`)

export const getNoViewedAlerts = (id: string) => apiIA.get(`/${id}/no-vistas`)
