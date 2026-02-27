import { getBatch } from '@/src/utils/api/batch.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useBatch({ id }: { id: string }) {
  return useQuery({
    queryKey: queryKeys.batch.detail(id),
    queryFn: async () => {
      const { data } = await getBatch(id)
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
