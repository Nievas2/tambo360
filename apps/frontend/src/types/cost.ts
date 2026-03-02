import { Batch } from '@/src/types/batch'
import z from 'zod'

export const CreateCostSchema = z.object({
  loteId: z.uuid('loteId inválido'),
  concepto: z
    .string()
    .min(1, 'Concepto requerido')
    .max(255, 'Concepto demasiado largo'),
  monto: z.coerce.number().positive('El monto debe ser mayor a cero'),
  observaciones: z.string().max(500, 'Observacion demasiado larga').optional(),
})

export const UpdateCostSchema = z.object({
  concepto: z
    .string()
    .min(1, 'Concepto requerido')
    .max(255, 'Concepto demasiado largo')
    .optional(),
  monto: z.number().positive().optional(),
  observaciones: z.string().max(500).optional(),
})

export type CreateCostData = z.infer<typeof CreateCostSchema>
export type UpdateCostData = z.infer<typeof UpdateCostSchema>

export interface Cost {
  idCostoDirecto: string
  concepto: string
  monto: number
  moneda: string
  fechaCreacion: string
  idLote: string
  lote: Batch
}
