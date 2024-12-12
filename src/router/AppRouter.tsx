import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/auth/pages/LoginPage';
import { ProtectedRoute } from '@/auth/guards/ProtectedRoute';
import { PublicRoute } from '@/auth/guards/PublicRoute';

import { DashboardLayout } from '@/dashboard/layouts/DashboardLayout';

import { MembersPage } from '@/members/pages/MembersPage';
import { AddMemberPage } from '@/members/pages/AddMemberPage';
import { CountriesPage } from '@/countries/pages/CountriesPage';
import { DepartamentsPage } from '@/departaments/pages/DepartamentsPage';
import { CitiesPage } from '@/cities/pages/CitiesPage';
import { InstitutionPage } from '@/institutions/pages/InstitutionsPage';
import { EpsPage } from '@/eps/pages/EpsPage';
import { InteresTopicPage } from '@/interes-topic/pages/InteresTopicPage';
import { SisbenScoresPage } from '@/sisben-score/pages/SisbenScoresPage';
import { PopulationGroupsPage } from '@/population-group/pages/PopulationGroupPage';
import { EthnicGroupsPage } from '@/ethnic-group/pages/EthnicGroupsPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='auth' element={<PublicRoute />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to='/auth/login' replace />} />
      </Route>

      <Route path='dashboard' element={<ProtectedRoute />}>
        <Route path='' element={<Navigate to='/dashboard/miembros' replace />} />
        <Route path='' element={<DashboardLayout />}>
          <Route path='miembros'>
            <Route index element={<MembersPage />} />
            <Route path='agregar' element={<AddMemberPage />} />
            <Route path='*' element={<Navigate to='/dashboard/miembros' replace />} />
          </Route>
          <Route path='paises'>
            <Route index element={<CountriesPage />} />
            <Route path='*' element={<Navigate to='/dashboard/paises' replace />} />
          </Route>
          <Route path='departamentos'>
            <Route index element={<DepartamentsPage />} />
            <Route path='*' element={<Navigate to='/dashboard/departamentos' replace />} />
          </Route>
          <Route path='ciudades'>
            <Route index element={<CitiesPage />} />
            <Route path='*' element={<Navigate to='/dashboard/ciudades' replace />} />
          </Route>
          <Route path='instituciones'>
            <Route index element={<InstitutionPage />} />
            <Route path='*' element={<Navigate to='/dashboard/instituciones' replace />} />
          </Route>
          <Route path='eps'>
            <Route index element={<EpsPage />} />
            <Route path='*' element={<Navigate to='/dashboard/eps' replace />} />
          </Route>
          <Route path='temas-interes'>
            <Route index element={<InteresTopicPage />} />
            <Route path='*' element={<Navigate to='/dashboard/temas-interes' replace />} />
          </Route>
          <Route path='puntajes-sisben'>
            <Route index element={<SisbenScoresPage />} />
            <Route path='*' element={<Navigate to='/dashboard/puntajes-sisben' replace />} />
          </Route>
          <Route path='grupo-poblacional'>
            <Route index element={<PopulationGroupsPage />} />
            <Route path='*' element={<Navigate to='/dashboard/grupo-poblacional' replace />} />
          </Route>
          <Route path='grupo-etnico'>
            <Route index element={<EthnicGroupsPage />} />
            <Route path='*' element={<Navigate to='/dashboard/grupo-etnico' replace />} />
          </Route>
        </Route>
      </Route>

      <Route path='*' element={<Navigate to='/auth/login' replace />} />
    </Routes>
  );
};

