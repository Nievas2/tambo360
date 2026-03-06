import { logOut } from '@/src/utils/api/auth.api'
import { queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const { data } = await logOut()
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser })
    },
  })
}
