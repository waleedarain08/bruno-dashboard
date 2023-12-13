import React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { InputAdornment, OutlinedInput, } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import Box from '@mui/material/Box';
// IconAdjustmentsHorizontal,
// ButtonBase 

// import Avatar from '@mui/material/Avatar';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Button from '@mui/material/Button';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 304,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));
// const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
//     ...theme.typography.commonAvatar,
//     ...theme.typography.mediumAvatar,
//     background: theme.palette.secondary.light,
//     color: theme.palette.secondary.dark,
//     '&:hover': {
//         background: theme.palette.secondary.dark,
//         color: theme.palette.secondary.light
//     }
// }));

const SearchFeild = ({ setValue, value }) => {
    const theme = useTheme();
    // const [open, setOpen] = React.useState(false);

    // const handleToggle = () => {
    //     setOpen(!open);
    // };

    // const handleApplyFilters = () => {
    //     // Add your logic to apply filters to your data
    //     setOpen(false);
    // };

    return (
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <OutlineInputStyle
                id="input-search-header"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search"
                style={{ height: 45 }}
                startAdornment={
                    <InputAdornment position="start">
                        <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                    </InputAdornment>
                }
                // endAdornment={
                //     <InputAdornment position="end">
                //         <ButtonBase sx={{ borderRadius: '12px' }}>
                //             <HeaderAvatarStyle variant="rounded">
                //                 <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                //             </HeaderAvatarStyle>
                //         </ButtonBase>
                //     </InputAdornment>
                // }
                aria-describedby="search-helper-text"
                inputProps={{ 'aria-label': 'weight' }}
            />
            {/* <Dialog open={open} onClose={handleToggle}>
                <DialogTitle>Filter Options</DialogTitle>
                <DialogContent>
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Delivered"
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Cooked"
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Option 3"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToggle} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleApplyFilters} color="primary">
                        Apply Filters
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Box>
    );
}

export default SearchFeild;
