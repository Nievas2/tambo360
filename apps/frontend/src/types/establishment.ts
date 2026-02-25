import z from 'zod'

export const EstablishmentSchema = z.object({
  nombre: z
    .string()
    .min(5, 'El nombre del establecimiento debe tener al menos 5 caracteres')
    .max(
      100,
      'El nombre del establecimiento no puede tener más de 100 caracteres'
    ),
  localidad: z
    .string()
    .min(4, 'La localidad debe tener al menos 4 caracteres')
    .max(50, 'La localidad no puede tener más de 50 caracteres'),
  provincia: z
    .string()
    .min(4, 'La provincia debe tener al menos 4 caracteres')
    .max(50, 'La provincia no puede tener más de 50 caracteres'),
})

export type EstablishmentData = z.infer<typeof EstablishmentSchema> & {
  fechaCreacion: string
}
