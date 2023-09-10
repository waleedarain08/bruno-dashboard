import { lazy } from 'react';
// import { useSelector } from 'react-redux';
// const data = useSelector((state) => state.AuthReducer.data);

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import UserAccounts from 'views/user-accounts/user_accounts';
import PetsProfile from 'views/pets-profile/pets-profile';
import FoodRecipes from 'views/food-recipes/food-recipes';
import ProductCategories from 'views/product-categories/product-categories';
import UsersFeedback from 'views/users-feedback/users-feedback';
import BlogFAQ from 'views/blog-&-FAQ/blog-&-FAQ';
import Cookingsheet from 'views/cooking-sheet/cooking-sheet';
import PromoLoyality from 'views/promo-codes&loyality-points/promo-loyality';
import Ingredients from 'views/ingredients/Ingredients';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
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
      path: '/user-auccounts',
      children: [
        {
          path: '/user-auccounts',
          element: <UserAccounts />
        }
      ]
    },
    {
      path: '/user-auccounts/pet-profile',
      children: [
        {
          path: '/user-auccounts/pet-profile',
          element: <PetsProfile />
        }
      ]
    },
    {
      path: '/food-recipes',
      children: [
        {
          path: '/food-recipes',
          element: <FoodRecipes />
        }
      ]
    },
    {
      path: '/ingredients',
      children: [
        {
          path: '/ingredients',
          element: <Ingredients />
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
    },
    {
      path: '/promo-code&loyality-points',
      children: [
        {
          path: '/promo-code&loyality-points',
          element: <PromoLoyality />
        }
      ]
    },
    {
      path: '/product-categories',
      children: [
        {
          path: '/product-categories',
          element: <ProductCategories />
        }
      ]
    },
    {
      path: '/users-feedback',
      children: [
        {
          path: '/users-feedback',
          element: <UsersFeedback />
        }
      ]
    },
    {
      path: '/blog-&-FAQ',
      children: [
        {
          path: '/blog-&-FAQ',
          element: <BlogFAQ />
        }
      ]
    },

    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
