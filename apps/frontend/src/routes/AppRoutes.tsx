import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Produccion from '../pages/Produccion'; 
import TamboEngine from '../pages/TamboEngine';
import Perfil from '../pages/Perfil';

import { ROUTES } from '../constants/routes';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import Layout from '../components/layout/Layout';

export const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <Routes>
      {/* RUTAS PÚBLICAS: Envolvemos el Outlet con PublicRoute para satisfacer el requerimiento de children */}
      <Route element={<PublicRoute><Outlet /></PublicRoute>}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Route>

      {/* RUTAS PROTEGIDAS: Envolvemos el Layout con ProtectedRoute */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path="/produccion" element={<Produccion />} />
        <Route path="/alertas" element={<TamboEngine />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      {/* Catch-all para errores */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};