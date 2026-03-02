import { CreateCostData } from '@/src/types/cost'
import { createCost } from '@/src/utils/api/cost.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateCost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (values: CreateCostData) => {
      const { data } = await createCost(values)
      return data
    },

    onError: (error, _, context: { previous: unknown } | undefined) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.cost.lists(), context.previous)
      }
      throw error
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cost.lists() })
    },
  })
}
