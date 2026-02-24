import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerUser } from '@/src/utils/api/auth.api'
import { RegisterData } from '@/src/types/register'
import { queryKeys } from '@/src/utils/queryKeys'
import { AxiosError, AxiosResponse } from 'axios'
import { User } from '@/src/types'

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<{ user: User }>,
    AxiosError<{ message: string }>,
    RegisterData
  >({
    mutationFn: async (values: RegisterData) => {
      const { data } = await registerUser(values)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser })
    },
  })
}
