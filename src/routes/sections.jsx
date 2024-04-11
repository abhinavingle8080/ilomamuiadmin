import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const Employee = lazy(() => import('src/pages/app-users/admin/employee/Employee'));
export const EmployeeOperation = lazy(() => import('src/pages/app-users/admin/employee/EmployeeOperation'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const Holiday = lazy(() => import('src/pages/app-users/admin/holiday/Holiday'));
export const HolidayOperation = lazy(() => import('src/pages/app-users/admin/holiday/HolidayOperation'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'employees', children: [
          { path: '', element: <Employee /> },
          { path: ':id/view', element: <EmployeeOperation /> },
          { path: ':id/edit', element: <EmployeeOperation /> },
          { path: 'add', element: <EmployeeOperation /> },
        ]},
        { path: 'holidays', children: [
          { path: '', element: <Holiday /> },
          { path: ':id/view', element: <HolidayOperation /> },
          { path: ':id/edit', element: <HolidayOperation /> },
          { path: 'add', element: <HolidayOperation /> },
        ]},

        { path: 'leaves', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
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
