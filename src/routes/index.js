import { useRoutes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
<<<<<<< HEAD
=======
import { useSelector } from 'react-redux';
import SpecialRoute from './SpecialRoute';
>>>>>>> feature/Recipe

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
<<<<<<< HEAD
  const { user } = useContext(UserContext);
  console.log(user, 'user');
  return useRoutes(user !== '' ? [MainRoutes] : [AuthenticationRoutes]);
=======
  const data = useSelector((state) => state.AuthReducer.data);
  return useRoutes(
    data !== null ? [MainRoutes] : data !== null && data?.email === 'chef@brunokitchen.com' ? [SpecialRoute] : [AuthenticationRoutes]
  );
>>>>>>> feature/Recipe
}
