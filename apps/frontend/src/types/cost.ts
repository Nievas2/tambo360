import { Batch } from '@/src/types/batch'
import z from 'zod'

export enum Concept {
  insumos_basicos = 'insumos_basicos',
  leche_cruda = 'leche_cruda',
  cuajo_y_fermentos = 'cuajo_y_fermentos',
  refrigeracion = 'refrigeracion',
}

export const CONCEPTO_LABELS = {
  insumos_basicos: 'Insumos',
  leche_cruda: 'Leche Cruda',
  cuajo_y_fermentos: 'Cuajo y Fermentos',
  refrigeracion: 'Refrigeración',
}

export const UpdateCostSchema = z.object({
  concepto: z
    .enum(Object.values(Concept))
    .refine((value) => value !== undefined, 'Concepto requerido')
    .default(Concept.insumos_basicos),
  monto: z
    .string()
    .min(1, 'Monto requerido')
    .refine((value) => !isNaN(Number(value)), 'Monto no valido')
    .transform((value) => Number(value)),
  observaciones: z
    .string()
    .max(100, 'Observaciones demasiado largas')
    .optional()
    .refine((val) => !val || val.trim().length > 0, {
      message: 'Observaciones no puede contener solo espacios',
    }),
})

export type UpdateCostData = z.infer<typeof UpdateCostSchema>

export interface Cost {
  idCostoDirecto: string
  concepto: string
  monto: string
  moneda: string
  observaciones: string
  fechaCreacion: string
  idLote: string
  lote: Batch
}
