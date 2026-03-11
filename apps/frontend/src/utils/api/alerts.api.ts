import { api } from '@/src/services/api'

export const getAlerts = (id: string, range: string) =>
  api.get(`/alertas/${id}`, {
    params: { range },
  })

export const getLastsAlerts = (id: string) => api.get(`/alertas/${id}/ultimas`)

export const changeViewedAlert = (id: string) => api.put(`/alertas/${id}/visto`)

export const getNoViewedAlerts = (id: string) =>
  api.get(`/alertas/${id}/no-vistas`)
