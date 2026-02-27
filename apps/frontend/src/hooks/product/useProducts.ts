import { getProducts } from '@/src/utils/api/products.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.product.lists(),
    queryFn: async () => {
      const { data } = await getProducts()
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
