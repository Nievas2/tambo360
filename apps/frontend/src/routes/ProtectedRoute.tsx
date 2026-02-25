import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '@/src/components/layout/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    logout()
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
