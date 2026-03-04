import { Batch } from '@/src/types/batch'
import z from 'zod'

export const UpdateCostSchema = z.object({
  concepto: z
    .string()
    .min(1, 'Concepto requerido')
    .max(255, 'Concepto demasiado largo'),
  monto: z
    .string()
    .min(1, 'Monto requerido')
    .refine((value) => !isNaN(Number(value)), 'Monto no valido')
    .transform((value) => Number(value)),
})

export type UpdateCostData = z.infer<typeof UpdateCostSchema>

export interface Cost {
  idCostoDirecto: string
  concepto: string
  monto: string
  moneda: string
  fechaCreacion: string
  idLote: string
  lote: Batch
}
