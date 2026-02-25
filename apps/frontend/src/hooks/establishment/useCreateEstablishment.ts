import { EstablishmentData } from '@/src/types/establishment'
import { createEstablishment } from '@/src/utils/api/establishment.api'
import { useMutation } from '@tanstack/react-query'

export function useCreateEstablishment() {
  return useMutation({
    mutationFn: async (values: EstablishmentData) => {
      const { data } = await createEstablishment(values)
      return data
    },
  })
}
