import { BatchData, BatchDto } from '@/src/types/batch'
import { updateBatch } from '@/src/utils/api/batch.api'
import { baseKeys, queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useUpdateBatch() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<{ batch: BatchDto }>,
    AxiosError<{ message: string }>,
    { values: BatchData; id: string }
  >({
    mutationFn: async ({ values, id }: { values: BatchData; id: string }) => {
      const { data } = await updateBatch(values, id)
      return data
    },

    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.batch, 'filters'],
      })

      queryClient.invalidateQueries({ queryKey: queryKeys.batch.day() })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.current() })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.dashboard, 'graph'],
      })
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.batch, 'filters'],
      })

      queryClient.invalidateQueries({
        queryKey: queryKeys.batch.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.current() })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.dashboard, 'graph'],
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.batch, 'filters'],
      })

      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.current() })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.dashboard, 'graph'],
      })
    },
  })
}
