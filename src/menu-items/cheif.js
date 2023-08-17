
import BallotIcon from '@mui/icons-material/Ballot';


const cheif = {
    id: 'chef',
    title: 'Chef',
    type: 'group',
    children: [
        {
            id: 'cooking-sheet',
            title: 'Cooking-sheet',
            type: 'item',
            url: '/cooking-sheet',
            icon: BallotIcon,
            breadcrumbs: false
        },
    ]
};

export default cheif;
