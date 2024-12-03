import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/auth/pages/LoginPage';
import { ProtectedRoute } from '@/auth/guards/protectedRoute';
import { PublicRoute } from '@/auth/guards/publicRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth' element={<PublicRoute />}>
          <Route path='login' element={<LoginPage />} />
          <Route path="*" element={<Navigate to='/auth/login' replace />} />
        </Route>

        <Route path='dashboard' element={<ProtectedRoute />}>
          <Route index element={<h1>Dashboard</h1>} />
        </Route>

        <Route path="*" element={<Navigate to='/auth/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

