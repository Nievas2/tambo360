import { deleteBatch } from '@/src/utils/api/batch.api'
import { baseKeys, queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useDeleteBatch() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    { id: string }
  >({
    mutationFn: async ({ id }: { id: string }) => {
      const { data } = await deleteBatch(id)
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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.batch, 'filters'],
      })

      queryClient.invalidateQueries({ queryKey: queryKeys.batch.day() })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.current() })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.dashboard, 'graph'],
      })
    },
  })
}
