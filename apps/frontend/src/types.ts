export interface Establecimiento {
  idEstablecimiento: string
  nombre: string
  localidad: string
  provincia: string
  fechaCreacion: string
  idUsuario: string
}

export interface User {
  idUsuario: string
  correo: string
  contrasena: string
  nombre: string
  fechaCreacion: string
  establecimientos: string | Establecimiento[] 
  token?: string 
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export enum AuthView {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
}