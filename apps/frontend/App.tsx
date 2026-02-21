import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AppRoutes from '../frontend/src/routes/AppRoutes';

const queryClient = new QueryClient();

// Componente para manejar el estado de carga inicial
const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen font-inter">
        Cargando Tambo360...
      </div>
    );
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