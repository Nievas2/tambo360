import { UpdateCostData } from '@/src/types/cost'
import { updateCost } from '@/src/utils/api/cost.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useUpdateCost() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<{ cost: UpdateCostData }>,
    AxiosError<{ message: string }>,
    { values: UpdateCostData; id: string }
  >({
    mutationFn: async ({
      values,
      id,
    }: {
      values: UpdateCostData
      id: string
    }) => {
      const { data } = await updateCost(values, id)
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
