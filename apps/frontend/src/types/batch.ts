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
    }),
})

export type BatchData = z.infer<typeof BatchSchema>

export type BatchDto = BatchData & { id: string }
