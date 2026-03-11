import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthState, User } from '../types'
import Cookies from 'js-cookie'
import { api } from '@/src/services/api'
import { useLogout } from '@/src/hooks/auth/useLogout'

interface AuthContextType extends AuthState {
  setToken: (token: string | null) => void
  login: ({ user, token }: { user: User; token: string }) => void
  setUser: (user: User | null) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync } = useLogout()

  const isAuthenticated = !!user

  const fetchSession = async () => {
    setLoading(true)
    try {
      const res = await api.get('/auth/me')
      if (res?.data.data) {
        setUser(res.data.data)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSession()
  }, [])

  const login = async ({ user, token }: { user: User; token: string }) => {
    setUser(user)
    setToken(token)
    setError(null)
  }

  const logout = async () => {
    try {
      setUser(null)
      setToken(null)
      setError(null)
      await mutateAsync()
      Cookies.remove('token')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        setLoading,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
