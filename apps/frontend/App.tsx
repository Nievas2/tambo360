import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import AppRoutes from './src/routes/AppRoutes'
import Loading from '@/src/components/layout/Loading'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

const AppContent: React.FC = () => {
  const { loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      {/* Colocamos el Toaster aquí para que esté disponible en todas las rutas */}
      <Toaster position="top-center" expand={true} richColors />
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