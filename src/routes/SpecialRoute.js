import { lazy } from 'react';
// import { useSelector } from 'react-redux';
// const data = useSelector((state) => state.AuthReducer.data);

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const Cookingsheet = Loadable(lazy(() => import('views/oldShookingSheet/cooking-sheet-old')));


// ==============================|| MAIN ROUTING ||============================== //

const SpecialRoute = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Cookingsheet />
    },
    {
      path: '*',
      element: <Cookingsheet />
    },
    {
      path: '/dashboard',
      children: [
        {
          path: 'dashboard',
          element: <Cookingsheet />
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
