import { getProvinces } from '@/src/utils/api/ubication.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useProvince({ name }: { name: string }) {
  return useQuery({
    queryKey: queryKeys.province.search(name),
    queryFn: async () => {
      const { data } = await getProvinces(name)
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
