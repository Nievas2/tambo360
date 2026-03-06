import { changeViewedAlert } from '@/src/utils/api/alerts.api'
import { baseKeys, queryKeys } from '@/src/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useViewedAlert() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await changeViewedAlert(id)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.alert, 'filters'],
      })

      queryClient.invalidateQueries({ queryKey: queryKeys.alert.lasts() })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.alert, 'filters'],
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.alert.noViewed() })
    },
  })
}
