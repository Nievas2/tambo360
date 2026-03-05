import { deleteCost } from '@/src/utils/api/cost.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface DeleteCostProps {
  idBatch: string
}
export function useDeleteCost({ idBatch }: DeleteCostProps) {
  const queryClient = useQueryClient()
  return useMutation<AxiosResponse, AxiosError<{ message: string }>, string>({
    mutationFn: async (id: string) => {
      const { data } = await deleteCost(id)
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cost.lists() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.batch.detail(idBatch),
      })
    },
  })
}
