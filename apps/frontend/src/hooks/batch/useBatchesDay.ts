import { getBatchesDay } from '@/src/utils/api/batch.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useBatchesDay() {
  return useQuery({
    queryKey: queryKeys.batch.day(),
    queryFn: async () => {
      const { data } = await getBatchesDay()
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
}
