import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser } from '@/src/utils/api/auth.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { AxiosError, AxiosResponse } from 'axios'
import { User } from '@/src/types'
import { LoginData } from '@/src/types/login'

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<{ user: User; token: string }>,
    AxiosError<{ message: string }>,
    LoginData
  >({
    mutationFn: async (values: any) => {
      const { data } = await loginUser(values)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser })
    },
  })
}
