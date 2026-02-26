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
} as const

// Export all keys for easy access
export const queryKeys = {
  auth: authKeys,
  batch: batchKeys,
} as const
