import LoadingSpinner from '@/src/components/layout/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

interface CheckEstablishmentProps {
  children: React.ReactNode
}

const CheckEstablishment = ({ children }: CheckEstablishmentProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (user.establecimientos.length == 0) {
    return <Navigate to="/establecimiento" replace />
  }

  return <>{children}</>
}

export default CheckEstablishment
