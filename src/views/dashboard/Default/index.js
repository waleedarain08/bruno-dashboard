import { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
//import TotalIncomeDarkCard from './TotalIncomeDarkCard';
//import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { chatsApi } from 'store/charts/chartsAction';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const dispatch = useDispatch();
  const chartsData = useSelector((state) => state.ChartsReducer.chartsData);
  const isLoadingCharts = useSelector((state) => state.ChartsReducer.isLoadingCharts);
  const Userdata = useSelector((state) => state.AuthReducer.data);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(chatsApi(Userdata?.clientToken))
    setLoading(false);
  }, []);
  console.log(chartsData,isLoading, "chartsData")

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoadingCharts} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoadingCharts} />
          </Grid>
          {/* <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoadingCharts} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoadingCharts} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
