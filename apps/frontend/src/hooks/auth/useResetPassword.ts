import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '../../utils/api/auth.api'
import { toast } from 'sonner'

export const useResetPassword = () => {
  return useMutation({
    // Cambiamos para que reciba un objeto con password y token
    mutationFn: ({ password, token }: { password: string; token: string }) =>
      resetPassword(password, token),
    onSuccess: () => {
      toast.success('Contraseña restablecida con éxito')
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Error al restablecer la contraseña'
      toast.error(message)
    },
  })
}
