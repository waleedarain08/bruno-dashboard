import { useRoutes } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContext } from '../context/userContext';
// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useSelector } from 'react-redux';
import SpecialRoute from './SpecialRoute';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const data = useSelector((state) => state.AuthReducer.data);
  return useRoutes(
    data !== null && data?.email === 'chef@brunokitchen.com' ? [SpecialRoute] : data !== null ? [MainRoutes] : [AuthenticationRoutes]
  );
}
