import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Layout from '../components/layout/Layout' // Importamos el Layout nuevo

// Placeholder para vistas pendientes
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center min-h-[80vh] text-white p-6">
    <div className="text-center border-2 border-dashed border-slate-800 rounded-lg p-12 w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-slate-400 italic">
        Vista en desarrollo - Optimizado para Tablet
      </p>
    </div>
  </div>
)

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS (Sin Sidebar) */}
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

      {/* RUTAS PROTEGIDAS (Todas dentro del Layout con Sidebar) */}
      <Route
        element={
          <ProtectedRoute>
            <Layout>
              <Outlet /> {/* Aquí se renderizarán las páginas hijas */}
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        
        {/* HU1: Registro de producción */}
        <Route path={ROUTES.PRODUCCION} element={<PlaceholderPage title="Registro de Producción por Lotes" />} />

        {/* HU2: Registro de mermas */}
        <Route path={ROUTES.MERMAS} element={<PlaceholderPage title="Registro de Mermas de Producción" />} />

        {/* Registro de costos directos */}
        <Route path={ROUTES.COSTOS} element={<PlaceholderPage title="Registro de Costos Operativos" />} />

        {/* Visualización de indicadores operativos */}
        <Route path={ROUTES.REPORTES} element={<PlaceholderPage title="Indicadores Operativos Básicos" />} />

        {/* HU4: Alertas y explicaciones de IA */}
        <Route path={ROUTES.ALERTAS} element={<PlaceholderPage title="Alertas TamboEngine (IA)" />} />
      </Route>

      {/* Navegación y Fallback */}
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}

export default AppRoutes