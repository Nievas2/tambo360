import { verifyEmail } from '@/src/utils/api/auth.api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useVerifyEmail() {
  return useMutation<
    { token: string },
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: async (token: string) => {
      const { data } = await verifyEmail(token)
      return data
    },
  })
}
