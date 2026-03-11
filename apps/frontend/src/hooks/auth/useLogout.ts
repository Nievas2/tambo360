import { logOut } from '@/src/utils/api/auth.api'
import { baseKeys, queryKeys } from '@/src/utils/queryKeys'
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
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.alert, 'filters'],
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.alert.lasts() })
      queryClient.invalidateQueries({ queryKey: queryKeys.alert.noViewed() })
      queryClient.invalidateQueries({ queryKey: queryKeys.alert.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.batch.day() })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.batch, 'filters'],
      })
      queryClient.invalidateQueries({ queryKey: [...baseKeys.batch, 'detail'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.cost.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.decrease.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.current() })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.dashboard, 'graph'],
      })
    },
  })
}
