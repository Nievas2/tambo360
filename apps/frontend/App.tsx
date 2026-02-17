import React from 'react'
import { Layout } from './src/components/layout/Layout'
import { LoadingSpinner } from './src/components/layout/LoadingSpinner'
import { AppRoutes } from './src/routes/AppRoutes'
import { useAuth } from './src/hooks/useAuth'
import Providers from '@/src/utils/Providers'

const AppContent: React.FC = () => {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingSpinner message="Initializing Example App..." />
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export const App: React.FC = () => {
  return (
    <Providers>
      <AppContent />
    </Providers>
  )
}

export default App
