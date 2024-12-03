import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContex';

export const ProtectedRoute = () => {
  console.log('ProtectedRoute');
  const { isAuthenticated, isLoading } = useAuth();

  console.log({ isAuthenticated, isLoading });
  if (isLoading) return <h1>Cargando...</h1>
  if (!isLoading && isAuthenticated) return <Outlet />
  return <Navigate to="/auth/login" />;
  
};
