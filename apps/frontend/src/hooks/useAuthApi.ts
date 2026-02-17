import { useCallback } from 'react'
import { api } from '../services/api'

export const useAuthApi = () => {
  const registerApi = useCallback(() => {
    throw new Error('useAuthApi.register requires user data')
  }, [])

  const loginApi = useCallback(() => {
    throw new Error('useAuthApi.login requires credentials')
  }, [])

  const register = useCallback(
    async (userData: { name: string; email: string; password: string }) => {
      return api.register(userData)
    },
    []
  )

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      return api.login(credentials)
    },
    []
  )

  const checkHealth = useCallback(() => {
    return api.checkHealth()
  }, [])

  return {
    registerApi,
    loginApi,
    register,
    login,
    checkHealth,
  }
}
