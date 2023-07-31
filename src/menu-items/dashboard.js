// assets
// import { IconDashboard } from '@tabler/icons';
import GroupIcon from '@mui/icons-material/Group';
import PetsIcon from '@mui/icons-material/Pets';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import InventoryIcon from '@mui/icons-material/Inventory';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

// constant
// const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: GridViewIcon,
      breadcrumbs: false
    },
    {
      id: 'userAccounts',
      title: 'User-Accounts',
      type: 'item',
      url: '/user-auccounts',
      icon: GroupIcon,
      breadcrumbs: false
    },
    {
      id: 'pet-profile',
      title: 'Pets-Profile',
      type: 'item',
      url: '/pet-profile',
      icon: PetsIcon,
      breadcrumbs: false
    },
    {
      id: 'food-recipes',
      title: 'Food-Recipes',
      type: 'item',
      url: '/food-recipes',
      icon: LocalDiningIcon,
      breadcrumbs: false
    },
    {
      id: 'product-categories',
      title: 'Product-Categories',
      type: 'item',
      url: '/product-categories',
      icon: InventoryIcon,
      breadcrumbs: false
    },
    {
      id: 'users-feedback',
      title: 'Users-Feedback',
      type: 'item',
      url: '/users-feedback',
      icon: FeedbackIcon,
      breadcrumbs: false
    },
    {
      id: 'blog-&-FAQ',
      title: 'Blog & FAQ',
      type: 'item',
      url: '/blog-&-FAQ',
      icon: NoteAltIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
