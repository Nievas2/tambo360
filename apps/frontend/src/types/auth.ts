import * as z from 'zod'

export const resetSchema = z
  .object({
    contraseña: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe tener una mayúscula')
      .regex(/[a-z]/, 'Debe tener una minúscula')
      .regex(/\d/, 'Debe tener un número')
      .regex(/[@$!%*?&]/, 'Debe tener un carácter especial'),
    confirm: z.string(),
  })
  .refine((data) => data.contraseña === data.confirm, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm'],
  })

export type ResetFormData = z.infer<typeof resetSchema>
