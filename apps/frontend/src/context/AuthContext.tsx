import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthState, User } from '../types'
import Cookies from 'js-cookie'
import { api } from '@/src/services/api'

interface AuthContextType extends AuthState {
  setToken: (token: string | null) => void
  login: ({ user, token }: { user: User; token: string }) => void
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

  const isAuthenticated = !!user

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await api.get('/auth/me')
        if (res?.data.data) {
          setUser(res.data.data)
        } else {
          setUser(null)
          setToken(null)
        }
      } catch (err) {
        setUser(null)
        setToken(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  const login = ({ user, token }: { user: User; token: string }) => {
    setUser(user)
    setToken(token)
    setError(null)
  }

  const logout = () => {
    Cookies.remove('user')
    Cookies.remove('token')
    setUser(null)
    setToken(null)
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
