import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { loginUser } from '@/src/utils/api/auth.api'
import { queryKeys } from '@/src/utils/queryKeys'

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => loginUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser })
    },
  })
}
