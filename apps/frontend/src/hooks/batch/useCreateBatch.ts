import { BatchData } from '@/src/types/batch'
import { createBatch } from '@/src/utils/api/batch.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useCreateBatch() {
  const queryClient = useQueryClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, AxiosError<{ message: string }>, BatchData>({
    mutationFn: async (values: BatchData) => {
      const { data } = await createBatch(values)
      return data.data
    },

    onError: (error, _, context: { previous: unknown } | undefined) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.batch.lists(), context.previous)
      }
      throw error
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.lists() })
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.lists() })
    },
  })
}
