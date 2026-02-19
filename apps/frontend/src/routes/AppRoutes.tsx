// apps/frontend/src/routes/AppRoutes.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from "../constants/routes";
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

// Placeholder para vistas pendientes de implementación de UX
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white p-6">
    <div className="text-center border-2 border-dashed border-slate-800 rounded-lg p-12">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-slate-400 italic">Vista en desarrollo - Optimizado para Tablet</p>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Rutas Protegidas (Aislamiento por establecimiento) */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* HU1: Registro de producción */}
      <Route
        path={ROUTES.PRODUCCION}
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Registro de Producción por Lotes" />
          </ProtectedRoute>
        }
      />

      {/* HU2: Registro de mermas */}
      <Route
        path={ROUTES.MERMAS}
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Registro de Mermas de Producción" />
          </ProtectedRoute>
        }
      />

      {/* Registro de costos directos */}
      <Route
        path={ROUTES.COSTOS}
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Registro de Costos Operativos" />
          </ProtectedRoute>
        }
      />

      {/* Visualización de indicadores operativos */}
      <Route
        path={ROUTES.REPORTES}
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Indicadores Operativos Básicos" />
          </ProtectedRoute>
        }
      />

      {/* HU4: Alertas y explicaciones de IA */}
      <Route
        path={ROUTES.ALERTAS}
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Alertas TamboEngine (IA)" />
          </ProtectedRoute>
        }
      />

      {/* Navegación y Fallback */}
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};

export default AppRoutes;