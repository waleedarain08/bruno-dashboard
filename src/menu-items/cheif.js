
import BallotIcon from '@mui/icons-material/Ballot';


const cheif = {
    id: 'chef',
    title: 'Chef',
    type: 'group',
    children: [
        {
            id: 'order-list',
            title: 'Orders',
            type: 'item',
            url: '/order-list',
            icon: BallotIcon,
            breadcrumbs: false
        },
        {
            id: 'cooking-sheet',
            title: 'Cooking-sheet',
            type: 'item',
            url: '/cooking-sheet',
            icon: BallotIcon,
            breadcrumbs: false
        }
    ]
};

export default cheif;
