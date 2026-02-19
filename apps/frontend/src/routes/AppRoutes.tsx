import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import Login from '../pages/Login';

export function AppRoutes() {
  // --- MODO DESARROLLO (CAMBI0 ESTO) ---
  const isAuthenticated = true; // Ponerlo en 'false' para ver el Login
  // -------------------------------------

  return (
    <Routes>
      {/* 1. Ruta de Login (Siempre fuera del Layout) */}
      <Route 
        path="/login" 
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
      />

      {/* 2. Grupo de Rutas Privadas con Layout y Outlet */}
      <Route
        element={
          isAuthenticated ? (
            <Layout>
              <Outlet />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        {/* Aquí van todas las páginas que llevan Sidebar */}
        <Route path="/" element={<div>Dashboard Page</div>} />
        <Route path="/produccion" element={<div>Producción Page</div>} />
        <Route path="/alertas" element={<div>TamboEngine Page</div>} />
        <Route path="/perfil" element={<div>Perfil Page</div>} />
      </Route>

      {/* 3. Redirección por defecto */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
    </Routes>
  );
}