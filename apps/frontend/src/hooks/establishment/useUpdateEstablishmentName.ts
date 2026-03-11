import { updateEstablishmentName } from '@/src/utils/api/establishment.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useUpdateEstablishmentName() {
  const queryClient = useQueryClient()
  return useMutation<AxiosResponse, AxiosError<{ message: string }>, string>({
    mutationFn: async (name: string) => {
      const { data } = await updateEstablishmentName({ nombre: name })
      return data
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.auth.currentUser })
      const previous = queryClient.getQueryData(queryKeys.auth.currentUser)
      queryClient.setQueryData(queryKeys.auth.currentUser, () => previous)
      return { previous }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser })
    },
  })
}
