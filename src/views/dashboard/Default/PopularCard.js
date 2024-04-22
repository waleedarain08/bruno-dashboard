import PropTypes from 'prop-types';
// import { useState } from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
//import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
// import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
//import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
//import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading, chartstartData }) => {
  console.log(chartstartData, 'chartstartData');
  // const theme = useTheme();

  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const firstElement = chartstartData?.slice(0, 1); // Extract the first element
  const restElements = chartstartData?.slice(1);
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Popular Recipes</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard firstElement={firstElement} />
              </Grid>
              <Grid item xs={12}>
                {restElements?.map((x, index) => {
                  return (
                    <>
                      <Grid key={index} container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {x?.name}
                              </Typography>
                            </Grid>
                            <Grid item></Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          {/* <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                      10% Profit
                    </Typography> */}
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
