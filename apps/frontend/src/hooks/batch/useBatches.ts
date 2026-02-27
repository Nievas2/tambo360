import { getBatches } from '@/src/utils/api/batch.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useBatches() {
  return useQuery({
    queryKey: queryKeys.batch.lists(),
    queryFn: async () => {
      const { data } = await getBatches()
      console.log(data)
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
