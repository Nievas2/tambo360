import { BatchData, BatchDto } from '@/src/types/batch'
import { createBatch } from '@/src/utils/api/batch.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useCreateBatch() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<{ batch: BatchDto }>,
    AxiosError<{ message: string }>,
    BatchData
  >({
    mutationFn: async (values: BatchData) => {
      const { data } = await createBatch(values)
      return data
    },

    onMutate: (values: BatchData) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.lists() })

      const previous = queryClient.getQueryData(queryKeys.batch.lists())

      queryClient.setQueryData<BatchData[]>(
        queryKeys.batch.lists(),
        (old = []) => {
          return [...old, values]
        }
      )

      return { previous }
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
