// assets
// import { IconDashboard } from '@tabler/icons';
import GroupIcon from '@mui/icons-material/Group';
// import PetsIcon from '@mui/icons-material/Pets';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import InventoryIcon from '@mui/icons-material/Inventory';
//import FeedbackIcon from '@mui/icons-material/Feedback';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import BallotIcon from '@mui/icons-material/Ballot';
import PercentIcon from '@mui/icons-material/Percent';
import FactCheckIcon from '@mui/icons-material/FactCheck';
// import SummarizeIcon from '@mui/icons-material/Summarize';

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
      url: '/',
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
    // {
    //   id: 'pet-profile',
    //   title: 'Pets-Profile',
    //   type: 'item',
    //   url: '/pet-profile',
    //   icon: PetsIcon,
    //   breadcrumbs: false
    // },
    {
      id: 'food-recipes',
      title: 'Food-Recipes',
      type: 'item',
      url: '/food-recipes',
      icon: LocalDiningIcon,
      breadcrumbs: false
    },
    {
      id: 'categories',
      title: 'Categories',
      type: 'item',
      url: '/categories',
      icon: InventoryIcon,
      breadcrumbs: false
    },

    {
      id: 'promo-code&loyality-points',
      title: 'Promo Codes,Loyalty Points & Delivery Charges',
      type: 'item',
      url: '/promo-code&loyality-points',
      icon: PercentIcon,
      breadcrumbs: false
    },
    // {
    //   id: 'users-feedback',
    //   title: 'Users-Feedback',
    //   type: 'item',
    //   url: '/users-feedback',
    //   icon: FeedbackIcon,
    //   breadcrumbs: false
    // },
    {
      id: 'blog-&-FAQ',
      title: 'News, FAQ, Blog, Banner, Greeting, Feedback, Terms, Privacy & Agreement',
      type: 'item',
      url: '/blog-&-FAQ',
      icon: NoteAltIcon,
      breadcrumbs: false
    },
    {
      id: 'order-list',
      title: 'Orders',
      type: 'item',
      url: '/order-list',
      icon: FactCheckIcon,
      breadcrumbs: false
    },
    {
      id: 'cooking-sheet',
      title: 'Cooking-sheet',
      type: 'item',
      url: '/cooking-sheet',
      icon: BallotIcon,
      breadcrumbs: false
    },
    // {
    //   id: 'delivery-report',
    //   title: 'Delivery-Report',
    //   type: 'item',
    //   url: '/delivery-report',
    //   icon: SummarizeIcon,
    //   breadcrumbs: false
    // },
  ]
};

export default dashboard;
