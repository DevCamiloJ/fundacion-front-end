import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContex';

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && isAuthenticated) return <Navigate to="/dashboard" />;
  return <Outlet />
};
