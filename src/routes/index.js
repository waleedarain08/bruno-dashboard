import { useRoutes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { user } = useContext(UserContext);
  console.log(user, 'user');
  return useRoutes(user !== '' ? [MainRoutes] : [AuthenticationRoutes]);
}
