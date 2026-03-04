import { Batch } from '@/src/types/batch'
import z from 'zod'

export enum TipoMerma {
  Natural = 'Natural',
  Tecnica = 'Tecnica',
  Administrativa = 'Administrativa',
  Danio = 'Danio',
}
export const DecreaseSchema = z.object({
  tipo: z
    .enum([
      TipoMerma.Natural,
      TipoMerma.Tecnica,
      TipoMerma.Administrativa,
      TipoMerma.Danio,
    ])
    .default(TipoMerma.Natural),
  observacion: z
    .string()
    .max(100, 'La observación no puede tener mas de 100 caracteres')
    .optional(),
  cantidad: z
    .string()
    .min(1, 'Cantidad es requerido')
    .refine((value) => !isNaN(Number(value)), 'Cantidad no valida')
    .transform((value) => Number(value)),
})

export type DecreaseData = z.infer<typeof DecreaseSchema>

export type DecreaseWithLote = DecreaseData & {
  idLote: string
}

export interface Decrease {
  idMerma: string
  cantidad: string
  descripcion: string
  observacion: string
  tipo: TipoMerma
  unidad: string
  idLote: string
  lote: Batch
  fechaCreacion: string
}
