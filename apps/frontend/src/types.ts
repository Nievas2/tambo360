export interface User {
  idUsuario: string;
  correo: string;
  contrasena: string;
  nombre: string;
  fechaCreacion: string;
  establecimientos: string;
  city?: string;
  province?: string;
  location?: {
    city?: string;
    province?: string;
  };
  token?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export enum AuthView {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
}