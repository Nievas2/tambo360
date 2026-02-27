import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface PublicRouteProps {
  children: React.ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default PublicRoute
