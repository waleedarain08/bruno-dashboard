import { lazy } from 'react';
// import { useSelector } from 'react-redux';
// const data = useSelector((state) => state.AuthReducer.data);

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Cookingsheet from 'views/cooking-sheet/cooking-sheet';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));


// ==============================|| MAIN ROUTING ||============================== //

const SpecialRoute = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '*',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/cooking-sheet',
      children: [
        {
          path: '/cooking-sheet',
          element: <Cookingsheet />
        }
      ]
    }
  ]
};

export default SpecialRoute;
