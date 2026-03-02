import { EstablishmentData } from '@/src/types/establishment'
import { createEstablishment } from '@/src/utils/api/establishment.api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useCreateEstablishment() {
  return useMutation<
    AxiosResponse<{ establishment: EstablishmentData }>,
    AxiosError<{ message: string }>,
    EstablishmentData
  >({
    mutationFn: async (values: EstablishmentData) => {
      const { data } = await createEstablishment(values)
      return data
    },
  })
}
