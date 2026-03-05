import { getDecreaseTypes } from '@/src/utils/api/decrease.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useDecreaseType() {
  return useQuery({
    queryKey: queryKeys.decrease.types(),
    queryFn: async () => {
      const { data } = await getDecreaseTypes()
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
