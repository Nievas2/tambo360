/**
 * Centralized Query Keys for TanStack Query
 *
 * Benefits:
 * - Type-safe query key management
 * - Easy invalidation patterns
 * - Consistent naming across the app
 */

// Base keys for each feature
export const baseKeys = {
  auth: ['auth'] as const,
  batch: ['batch'] as const,
  product: ['product'] as const,
  province: ['province'] as const,
  locality: ['locality'] as const,
} as const

// Auth related keys
export const authKeys = {
  all: baseKeys.auth,
  login: [...baseKeys.auth, 'login'] as const,
  currentUser: [...baseKeys.auth, 'currentUser'] as const,
  logout: [...baseKeys.auth, 'logout'] as const,
  changePassword: [...baseKeys.auth, 'changePassword'] as const,
} as const

// Batch related keys
export const batchKeys = {
  all: baseKeys.batch,
  lists: () => [...baseKeys.batch, 'list'] as const,
  detail: (id: string) => [...baseKeys.batch, id] as const,
  day: () => [...baseKeys.batch, 'today'] as const,
} as const

export const productKeys = {
  all: baseKeys.product,
  lists: () => [...baseKeys.product, 'list'] as const,
  detail: (id: string) => [...baseKeys.product, id] as const,
}

export const costKeys = {
  all: baseKeys.product,
  lists: () => [...baseKeys.product, 'list'] as const,
  detail: (id: string) => [...baseKeys.product, id] as const,
}

export const provinceKeys = {
  all: baseKeys.province,
  lists: () => [...baseKeys.province, 'list'] as const,
  search: (nombre: string) => [...baseKeys.province, 'search', nombre] as const,
  detail: (id: string) => [...baseKeys.province, id] as const,
}

export const localityKeys = {
  all: baseKeys.locality,
  lists: () => [...baseKeys.locality, 'list'] as const,
  search: (id: string, search: string) =>
    [...baseKeys.locality, 'search', id, search] as const,
  detail: (id: string) => [...baseKeys.locality, id] as const,
}

// Export all keys for easy access
export const queryKeys = {
  auth: authKeys,
  batch: batchKeys,
  product: productKeys,
  cost: costKeys,
  province: provinceKeys,
  locality: localityKeys,
} as const
