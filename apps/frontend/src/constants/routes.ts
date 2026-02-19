export const ROUTES = {
  // Rutas Públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Rutas Privadas (Dashboard y Operaciones)
  DASHBOARD: '/dashboard',
  PRODUCCION: '/produccion', // Registro de producción por lotes (HU1)
  MERMAS: '/mermas',         // Registro de mermas (HU2)
  COSTOS: '/costos',         // Registro de costos directos
  REPORTES: '/reportes',     // Indicadores operativos básicos
  ALERTAS: '/alertas',       // Alertas de TamboEngine (HU4)
} as const;

export const API_ENDPOINTS = {
  BASE: 'http://localhost:3000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  HEALTH: '/health',
} as const;

export const STORAGE_KEYS = {
  USER: 'tambo_user_data',
  TOKEN: 'tambo_auth_token',
} as const;