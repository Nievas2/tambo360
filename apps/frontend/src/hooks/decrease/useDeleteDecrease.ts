import { deleteDecrease } from '@/src/utils/api/decrease.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface DeleteDecreaseProps {
  idLote: string
}
export function useDeleteDecrease({ idLote }: DeleteDecreaseProps) {
  const queryClient = useQueryClient()
  return useMutation<AxiosResponse, AxiosError<{ message: string }>, string>({
    mutationFn: async (id: string) => {
      const { data } = await deleteDecrease(id)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.decrease.lists() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.batch.detail(idLote),
      })
    },
  })
}
