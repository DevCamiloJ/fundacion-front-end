import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/auth/pages/LoginPage';
import { ProtectedRoute } from '@/auth/guards/ProtectedRoute';
import { PublicRoute } from '@/auth/guards/PublicRoute';

import { DashboardLayout } from '@/dashboard/layouts/DashboardLayout';

import { MembersPage } from '@/members/pages/MembersPage';
import { AddMemberPage } from '@/members/pages/AddMemberPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='auth' element={<PublicRoute />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to='/auth/login' replace />} />
      </Route>

      <Route path='dashboard' element={<ProtectedRoute />}>
        <Route path='' element={<DashboardLayout />}>
          <Route path='miembros'>
            <Route path='' element={<MembersPage />} />
            <Route path='agregar' element={<AddMemberPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/dashboard/miembros' replace />} />
        </Route>
        <Route path='*' element={<Navigate to='/dashboard/miembros' replace />} />
      </Route>

      <Route path='*' element={<Navigate to='/auth/login' replace />} />
    </Routes>
  );
};

