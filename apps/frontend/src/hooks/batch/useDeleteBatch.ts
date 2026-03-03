import { deleteBatch } from '@/src/utils/api/batch.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteBatch() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data } = await deleteBatch(id)
      return data
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
  })
}
