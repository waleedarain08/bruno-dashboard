import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Login from 'views/login/login';
import Terms from 'views/login/terms';
import Agreement from 'views/login/agreement';
import Privacy from 'views/login/privacy';

// login option 3 routing
// const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '*',
      element: <Login />
    },
    {
      path: '/register',
      element: <AuthRegister3 />
    },
    {
      path: '/terms&conditions',
      element: <Terms />
    },
    {
      path: '/privacy-policy',
      element: <Privacy />
    },
    {
      path: '/user-agreement',
      element: <Agreement />
    }
  ]
};

export default AuthenticationRoutes;
