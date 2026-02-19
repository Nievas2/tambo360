import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerUser } from '@/src/utils/api/auth.api'
import { queryKeys } from '@/src/utils/queryKeys'

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) => registerUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser })
    },
  })
}
