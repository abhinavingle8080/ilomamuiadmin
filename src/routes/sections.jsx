import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// guards
import AuthGuard from '../guards/AuthGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
import GuestGuard from '../guards/GuestGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const Dashboard = lazy(() => import('src/pages/app-users/admin/dashboard/Dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const Employee = lazy(() => import('src/pages/app-users/admin/employee/Employee'));
export const EmployeeOperation = lazy(() =>
  import('src/pages/app-users/admin/employee/EmployeeOperation')
);
export const Holiday = lazy(() => import('src/pages/app-users/admin/holidays/Holiday'));
export const HolidayOperation = lazy(() =>
  import('src/pages/app-users/admin/holidays/HolidayOperation')
);
export const Leave = lazy(() => import('src/pages/app-users/admin/leaves/Leave'));
export const LeaveOperation = lazy(() => import('src/pages/app-users/admin/leaves/LeaveOperation'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const UserAccount = lazy(() => import('src/pages/app-users/admin/profile/UserAccount'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        // { path: 'register-unprotected', element: <Register /> },
        // { path: 'reset-password', element: <ResetPassword /> },
        // { path: 'verify', element: <VerifyCode /> },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: '/dashboard', element: <Dashboard />, index: true },
        {
          path: 'profile',
          children: [{ path: 'edit-profile', element: <UserAccount /> }],
        },
        {
          path: 'employees',
          children: [
            { path: '', element: <Employee /> },
            { path: ':id/view', element: <EmployeeOperation /> },
            { path: ':id/edit', element: <EmployeeOperation /> },
            { path: 'add', element: <EmployeeOperation /> },
          ],
        },
        {
          path: 'holidays',
          children: [
            { path: '', element: <Holiday /> },
            { path: ':id/view', element: <HolidayOperation /> },
            { path: ':id/edit', element: <HolidayOperation /> },
            { path: 'add', element: <HolidayOperation /> },
          ],
        },
        {
          path: 'leaves',
          children: [
            { path: '', element: <Leave /> },
            { path: ':id/view', element: <LeaveOperation /> },
            { path: ':id/edit', element: <LeaveOperation /> },
            { path: 'add', element: <LeaveOperation /> },
          ],
        },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
