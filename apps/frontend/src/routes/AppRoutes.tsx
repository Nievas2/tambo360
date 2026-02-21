import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Produccion from '../pages/Produccion';
import TamboEngine from '../pages/TamboEngine';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute'; // Importamos tu protector

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública de Login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas Protegidas */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="produccion" element={<Produccion />} />
        <Route path="tambo-engine" element={<TamboEngine />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;