import { completeBatch } from '@/src/utils/api/batch.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useCompleteBatch() {
  const queryClient = useQueryClient()
  return useMutation<AxiosResponse, AxiosError<{ message: string }>, string>({
    mutationFn: async (id: string) => {
      const { data } = await completeBatch(id)
      return data
    },

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.batch.detail(id) })
      const previous = queryClient.getQueryData(queryKeys.batch.detail(id))
      queryClient.setQueryData(queryKeys.batch.detail(id), () => previous)
      return { previous }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.lists() })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.lists() })
    },
  })
}
