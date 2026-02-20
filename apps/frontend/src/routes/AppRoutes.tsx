import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Produccion from '../pages/Produccion';
import TamboEngine from '../pages/TamboEngine';
import Perfil from '../pages/Perfil';

export function AppRoutes() {
const loading = false;

  if (loading) return null;

  return (
    <Routes>
      <Route element={<PublicRoute><Outlet /></PublicRoute>}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <Layout>
              <Outlet />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produccion" element={<Produccion />} />
        <Route path="/alertas" element={<TamboEngine />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}