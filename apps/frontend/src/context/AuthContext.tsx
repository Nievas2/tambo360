import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthState, User } from '../types'
import Cookies from 'js-cookie'

interface AuthContextType extends AuthState {
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
    const savedUser = Cookies.get('user')
      ? JSON.parse(Cookies.get('user') as string)
      : null
    const savedToken = Cookies.get('token')
    if (savedUser) {
      setUser(savedUser)
      setToken(savedToken || null)
    }
    setLoading(false)
  }, [])

  const login = ({ user, token }: { user: User; token: string }) => {
    Cookies.set('user', JSON.stringify(user))
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
