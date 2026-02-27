import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import AppRoutes from './src/routes/AppRoutes'
import Loading from '@/src/components/layout/Loading'

const queryClient = new QueryClient()

// Componente para manejar el estado de carga inicial
const AppContent: React.FC = () => {
  const { loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
