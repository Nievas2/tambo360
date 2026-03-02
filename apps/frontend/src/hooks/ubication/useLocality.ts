import { getLocalities } from '@/src/utils/api/ubication.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

interface LocalityProp {
  id?: string
  search: string
}
export function useLocality({ id, search }: LocalityProp) {
  return useQuery({
    queryKey: queryKeys.locality.search(id, search),
    queryFn: async () => {
      const { data } = await getLocalities(id, search)
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
