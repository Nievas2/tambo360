import { getNoViewedAlerts } from '@/src/utils/api/alerts.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

interface NoViewedAlertsProps {
  id: string
}
export function useNoViewedAlerts({ id }: NoViewedAlertsProps) {
  return useQuery({
    queryKey: queryKeys.alert.noViewed(),
    queryFn: async () => {
      const { data } = await getNoViewedAlerts(id)
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
