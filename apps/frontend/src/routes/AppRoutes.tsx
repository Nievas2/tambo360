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
import ResetPassword from '../pages/ResetPassword'
import { ROUTES } from '../constants/routes'
import LoadingSpinner from '../components/layout/LoadingSpinner'
import Layout from '../components/layout/Layout'
import VerifyUser from '@/src/pages/VerifyUser'
import BatchDetails from '@/src/pages/BatchDetails'
import Establishment from '@/src/pages/Establishment'
import CheckEstablishment from '@/src/routes/CheckEstablishment'

export const AppRoutes = () => {
  const { loading } = useAuth()

  if (loading) return <LoadingSpinner />

  return (
    <Routes>
      <Route
        element={
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        }
      >
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path={'/auth/verify'} element={<VerifyUser />} />

      <Route path={'/establecimiento'} element={<Establishment />} />

      <Route
        element={
          <ProtectedRoute>
            <CheckEstablishment>
              <Layout />
            </CheckEstablishment>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />

        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path="/produccion" element={<Produccion />} />
        <Route path="/produccion/lote/:loteId" element={<BatchDetails />} />
        <Route path="/tambo-engine" element={<TamboEngine />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
