export interface User {
  idUsuario: string
  correo: string
  contrasena: string
  nombre: string
  fechaCreacion: string
  establecimientos: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export enum AuthView {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
}
