import { DecreaseData } from '@/src/types/decrease'
import { updateDecrease } from '@/src/utils/api/decrease.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface UpdateDecreaseProps {
  idLote: string
}
export function useUpdateDecrease({ idLote }: UpdateDecreaseProps) {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<{ decrease: DecreaseData }>,
    AxiosError<{ message: string }>,
    { values: DecreaseData; id: string }
  >({
    mutationFn: async ({
      values,
      id,
    }: {
      values: DecreaseData
      id: string
    }) => {
      const { data } = await updateDecrease(values, id)
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
