import { RegisterData } from '@/src/types/register'
import { LoginData } from '@/src/types/login'
import { api } from '@/src/services/api'

export const registerUser = (dto: RegisterData) =>
  api.post('/auth/crear-cuenta', dto)

export const loginUser = (dto: LoginData) =>
  api.post('/auth/iniciar-sesion', dto)

export const resendVerificationEmail = (correo: string) =>
  api.post('/auth/reenviar-verificacion', { correo })

export const verifyEmail = (token: string) =>
  api.post(`/auth/verificar-email`, { token })
