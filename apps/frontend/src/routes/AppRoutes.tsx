import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Produccion from '../pages/Produccion'
import TamboEngine from '../pages/TamboEngine'
import Perfil from '../pages/Perfil'

import { ROUTES } from '../constants/routes'
import LoadingSpinner from '../components/layout/LoadingSpinner'
import Layout from '../components/layout/Layout'
import VerifyUser from '@/src/pages/VerifyUser'
import BatchDetails from '@/src/pages/BatchDetails'

export const AppRoutes = () => {
  const { loading } = useAuth()

  if (loading) return <LoadingSpinner />

  return (
    <Routes>
      {/* RUTAS PÚBLICAS: Envolvemos el Outlet con PublicRoute */}
      <Route
        element={
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        }
      >
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Route>

      <Route path={'/auth/verify'} element={<VerifyUser />} />

      {/* RUTAS PROTEGIDAS: Envolvemos el Layout con ProtectedRoute */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* El path "/" solo debe servir para redireccionar, sin capturar subrutas */}
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />

        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path="/produccion" element={<Produccion />} />
        <Route path="/produccion/lote/:loteId" element={<BatchDetails />} />
        <Route path="/tambo-engine" element={<TamboEngine />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      {/* Catch-all para redirigir cualquier ruta no encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
