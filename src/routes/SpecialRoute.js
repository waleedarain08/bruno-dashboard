import { lazy } from 'react';
// import { useSelector } from 'react-redux';
// const data = useSelector((state) => state.AuthReducer.data);

// project imports
//import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const Cookingsheet = Loadable(lazy(() => import('views/oldShookingSheet/cooking-sheet-old')));
const OrderList = Loadable(lazy(() => import('views/order-list/OrderList')));


// ==============================|| MAIN ROUTING ||============================== //

const SpecialRoute = {
  path: '/',
  element: <OrderList />,
  children: [
    {
      path: '/',
      element: <OrderList />
    },
    {
      path: '*',
      element: <OrderList />
    },
    {
      path: '/order-list',
      children: [
        {
          path: '/order-list',
          element: <OrderList />
        }
      ]
    },
    {
      path: '/order-list',
      children: [
        {
          path: '/order-list',
          element: <OrderList />
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
