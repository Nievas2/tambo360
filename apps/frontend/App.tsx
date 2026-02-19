import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AppRoutes } from './src/routes/AppRoutes';

const queryClient = new QueryClient();

// Componente interno para manejar la lógica de carga después de los Providers
const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    // Aquí puedes usar el LoadingSpinner de develop si existe, o un div simple
    return <div className="flex items-center justify-center h-screen">Cargando aplicación...</div>;
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;