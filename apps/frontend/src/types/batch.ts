import { Cost } from '@/src/types/cost'
import { Decrease } from '@/src/types/decrease'
import { Product } from '@/src/types/product'
import z from 'zod'

export const BatchSchema = z.object({
  idProducto: z.uuidv4().min(1, 'Debe seleccionar un producto válido'),

  cantidad: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined
      const parsed = Number(val)
      return isNaN(parsed) ? undefined : parsed
    },
    z
      .number()
      .refine((v) => v !== undefined, {
        message: 'La cantidad es obligatoria',
      })
      .positive('La cantidad debe ser mayor a 0')
  ),

  fechaProduccion: z
    .string()
    .min(1, 'La fecha de producción es obligatoria')
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Fecha inválida',
    })
    .refine(
      (val) => {
        const fechaIngresada = new Date(val + 'T00:00:00')

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        const haceUnaSemana = new Date(hoy)
        haceUnaSemana.setDate(hoy.getDate() - 7)

        return fechaIngresada >= haceUnaSemana
      },
      {
        message: 'La fecha no puede ser de hace más de una semana',
      }
    )
    .refine(
      (val) => {
        const fechaIngresada = new Date(val + 'T00:00:00')

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        return fechaIngresada <= hoy
      },
      {
        message: 'La fecha no puede ser futura',
      }
    ),

  unidad: z.enum(['kg', 'litros'], {
    message: 'Unidad inválida',
  }),
})

export type BatchData = z.infer<typeof BatchSchema>

export type BatchDto = BatchData & { id: string }

export interface Batch {
  idLote: string
  fechaProduccion: string
  idProducto: string
  cantidad: string
  unidad: string
  idEstablecimiento: string
  estado: boolean
  producto: Product
  mermas: Decrease[]
  costosDirectos: Cost[]
  numeroLote: number
}
