import { getAlerts } from '@/src/utils/api/alerts.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

interface LastsAlertsProps {
  id: string
}
export function useAlerts({ id }: LastsAlertsProps) {
  return useQuery({
    queryKey: queryKeys.alert.lists(),
    queryFn: async () => {
      const { data } = await getAlerts(id)
      return data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
