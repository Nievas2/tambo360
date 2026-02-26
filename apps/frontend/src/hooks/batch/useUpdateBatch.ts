import { BatchData, BatchDto } from '@/src/types/batch'
import { updateBatch } from '@/src/utils/api/batch.api'
import { queryKeys } from '@/src/utils/queryKeys'
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

    onMutate: ({ values, id }: { values: BatchData; id: string }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.lists() })

      const previous = queryClient.getQueryData(queryKeys.batch.lists())

      queryClient.setQueryData<BatchDto[]>(
        queryKeys.batch.lists(),
        (old = []) => {
          return old.map((batch) =>
            batch.id === id ? { ...batch, ...values } : batch
          )
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

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.lists() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.batch.detail(variables.id),
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.lists() })
    },
  })
}
