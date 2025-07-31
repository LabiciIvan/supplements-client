import {
  createBrowserRouter,
  RouterProvider,
}                                     from 'react-router';
import {
  loadProducts,
  loadInvoice,
  loadCategories,
  loadAdminOrdersShippingMethodsAndOrderStatus,
  loadInvoices,
  loadShippingMethods,
  loadDashboard
}                                     from '../utilities/loaders';

import Dashboard                      from '../pages/admin/dashboard';
import AdminUsers                     from '../pages/admin/users';
import AdminOrders                    from '../pages/admin/orders';
import AdminCategories                from '../pages/admin/categories';
import AdminShipping                  from '../pages/admin/shipping';
import AdminInvoices                  from '../pages/admin/invoices';
import AdminProducts                  from '../pages/admin/products';

import Login                          from '../pages/auth/login';
import Register                       from '../pages/auth/register';
import PasswordReset                  from '../pages/auth/passwordReset';


import AdminLayout                    from '../pages/layouts/adminLayout';
import AuthLayout                     from '../pages/layouts/authLayout';
import BaseLayout                     from '../pages/layouts/baseLayout';

import AccountOrders                  from '../pages/user/accountOrders';
import Invoices                       from '../pages/user/invoice';
import Profile                        from '../pages/user/profile';
import Settings                       from '../pages/user/settings';

import Cart                           from '../pages/cart';
import Checkout                       from '../pages/checkout';
import Home                           from '../pages/home';
import Products                       from '../pages/products';

import AuthenticatedRoutes            from '../middlewares/authenticatedRoutes';
import RoleRoute                      from '../middlewares/roleRoute';




const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Home />
      }
    ]
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={false}>
            <Login />
          </AuthenticatedRoutes>
      },
      {
        path: 'register',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={false}>
            <Register />
          </AuthenticatedRoutes>
      },
      {
        path: 'password-reset/:token',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={false}>
            <PasswordReset />
          </AuthenticatedRoutes>
      }
    ]
  },
  {
    path: 'products',
    element: <BaseLayout />,
    children: [
      {
        path: ':category',
        element: <Products />,
        loader: loadProducts
      }
    ]
  },
  {
    path: 'cart',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Cart />,
      }
    ]
  },
  {
    path: 'checkout',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Checkout />,
      }
    ]
  },
  {
    path: 'invoices',
    element: <BaseLayout />,
    children: [
      {
        path: ':invoiceId',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <Invoices />
          </AuthenticatedRoutes>,
        loader: loadInvoice,
      }
    ]
  },
  {
    path: 'account',
    element: <BaseLayout />,
    children: [
      {
        path: 'orders',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <AccountOrders />
          </AuthenticatedRoutes>
      },
      {
        path: 'profile',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <Profile />
          </AuthenticatedRoutes>
      },
      {
        path: 'settings',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <Settings />
          </AuthenticatedRoutes>
      }
    ]
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <RoleRoute allowedRole='admin'>
              <Dashboard />
            </RoleRoute>
          </AuthenticatedRoutes>,
        loader: loadDashboard
      },
      {
        path: 'users',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <RoleRoute allowedRole='admin'>
              <AdminUsers />
            </RoleRoute>
          </AuthenticatedRoutes>,
      },
      {
        path: 'orders',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <RoleRoute allowedRole='admin'>
              <AdminOrders />
            </RoleRoute>
          </AuthenticatedRoutes>,
        loader: loadAdminOrdersShippingMethodsAndOrderStatus
      },
      {
        path: 'categories',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <RoleRoute allowedRole='admin'>
              <AdminCategories />
            </RoleRoute>
          </AuthenticatedRoutes>,
        loader: loadCategories
      },
      {
        path: 'shipping',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <RoleRoute allowedRole='admin'>
              <AdminShipping />
            </RoleRoute>
          </AuthenticatedRoutes>,
          loader: loadShippingMethods
      },
      {
        path: 'invoices',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <RoleRoute allowedRole='admin'>
              <AdminInvoices />
            </RoleRoute>
          </AuthenticatedRoutes>,
          loader: loadInvoices
      },
      {
        path: 'products',
        element:
          <AuthenticatedRoutes mustBeAuthenticated={true}>
            <RoleRoute allowedRole='admin'>
              <AdminProducts />
            </RoleRoute>
          </AuthenticatedRoutes>,
        loader: loadCategories
      }
    ]
  }
]);


const Router = () => {
  return <RouterProvider router={router} />
};


export default Router;