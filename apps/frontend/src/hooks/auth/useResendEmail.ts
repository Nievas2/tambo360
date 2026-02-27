import { resendVerificationEmail } from '@/src/utils/api/auth.api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useResendEmail() {
  return useMutation<
    { correo: string },
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: async (correo: string) => {
      const { data } = await resendVerificationEmail(correo)
      return data
    },
  })
}
