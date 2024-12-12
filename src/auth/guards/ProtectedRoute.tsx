import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContex';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && isAuthenticated) return <Outlet />
  return <Navigate to="/auth/login" />;
  
};
