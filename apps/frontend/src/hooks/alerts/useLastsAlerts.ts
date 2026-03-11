import { getLastsAlerts } from '@/src/utils/api/alerts.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

interface LastsAlertsProps {
  id: string
}
export function useLastsAlerts({ id }: LastsAlertsProps) {
  return useQuery({
    queryKey: queryKeys.alert.lasts(),
    queryFn: async () => {
      const { data } = await getLastsAlerts(id)
      return data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
