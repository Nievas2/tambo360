import { z } from 'zod'
export const LoginSchema = z.object({
  correo: z
    .email('Correo electrónico no válido')
    .max(50, 'El correo electrónico no puede tener más de 50 caracteres'),
  contraseña: z
    .string()
    .nonempty('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'La contraseña no puede tener más de 50 caracteres')
    .refine((value) => /^(?=.*[a-z])/.test(value), {
      message: 'La contraseña debe tener al menos una letra minúscula',
    })
    .refine((value) => /^(?=.*[A-Z])/.test(value), {
      message: 'La contraseña debe tener al menos una letra mayúscula',
    })
    .refine((value) => /^(?=.*[0-9])/.test(value), {
      message: 'La contraseña debe tener al menos un número',
    }),
})

export type LoginData = z.infer<typeof LoginSchema>
