import { getGraph } from '@/src/utils/api/dashboard.api'
import { GraphParams } from '@/src/types/dashboard'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/src/utils/queryKeys'

export function useGraph({ params }: { params: GraphParams }) {
  return useQuery({
    queryKey: queryKeys.dashboard.graph(params),
    queryFn: async () => {
      const { data } = await getGraph(params)
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
