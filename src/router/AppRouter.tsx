import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/auth/pages/LoginPage';
import { ProtectedRoute } from '@/auth/guards/ProtectedRoute';
import { PublicRoute } from '@/auth/guards/PublicRoute';

import { DashboardLayout } from '@/dashboard/layouts/DashboardLayout';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='auth' element={<PublicRoute />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to='/auth/login' replace />} />
      </Route>

      <Route path='dashboard' element={<ProtectedRoute />}>
        <Route path='*' element={<DashboardLayout />}>    
        </Route>
      </Route>

      <Route path='*' element={<Navigate to='/auth/login' replace />} />
    </Routes>
  );
};

