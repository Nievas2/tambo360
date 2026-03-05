import { UpdateCostData } from '@/src/types/cost'
import { createCost } from '@/src/utils/api/cost.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useCreateCost() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse,
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
      const { data } = await createCost(values, id)
      return data
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cost.lists() })
      const previous = queryClient.getQueryData(queryKeys.cost.lists())
      queryClient.setQueryData(queryKeys.cost.lists(), () => previous)
      return { previous }
    },

    onError: (error, _, context: { previous: unknown } | undefined) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.cost.lists(), context.previous)
      }
      throw error
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cost.lists() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.batch.detail(variables.id),
      })
    },
  })
}
