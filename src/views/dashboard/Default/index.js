import React from 'react';
import { useEffect } from 'react';
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
import { GrowthApi, TendingApi, chatsApi } from 'store/charts/chartsAction';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment/moment';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const dispatch = useDispatch();
  function getCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
    return currentMonth;
  }
  const chartsData = useSelector((state) => state.ChartsReducer.chartsData);
  const isLoadingCharts = useSelector((state) => state.ChartsReducer.isLoadingCharts);
  const chartGrowthData = useSelector((state) => state.ChartsReducer.chartGrowthData);
  const chartstartData = useSelector((state) => state.ChartsReducer.chartstartData);
  const isLoadingChartGrowth = useSelector((state) => state.ChartsReducer.isLoadingChartGrowth);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const [paidAmount, setpaidAmount] = React.useState(null);
  const [newDate, setDate] = React.useState(null);
  const [DateTopChart, setDateTopChart] = React.useState(null);

  const [newDateMonth, setDateMonth] = React.useState(getCurrentMonth());

  function getMonthStartAndEndDate(month) {
    const year = new Date().getFullYear();
    const startDate = new Date(year, month - 1, 1).getTime();
    const endDate = new Date(year, month, 0).getTime();

    return {
      startDate,
      endDate
    };
  }
  function getMonthStartAndEndDateYear(monthYear) {
    const [year, month] = monthYear.split('-').map(Number);
    const startDateTopChart = new Date(year, month - 1, 1).getTime();
    const endDateTopChart = new Date(year, month, 0).getTime();

    return {
      startDateTopChart,
      endDateTopChart
    };
  }
  const { startDate, endDate } = getMonthStartAndEndDate(newDateMonth);
  const { startDateTopChart, endDateTopChart } = getMonthStartAndEndDateYear(
    DateTopChart !== null ? DateTopChart : `${new Date().getFullYear()}-${new Date().getMonth()}`
  );

  useEffect(() => {
    dispatch(chatsApi(startDateTopChart, endDateTopChart, Userdata?.clientToken));
  }, [DateTopChart]);

  useEffect(() => {
    if (newDate !== null) {
      dispatch(GrowthApi(newDate, Userdata?.clientToken));
    } else {
      dispatch(GrowthApi(new Date().getFullYear(), Userdata?.clientToken));
    }
  }, [newDate]);

  useEffect(() => {
    if (chartsData?.length > 0) {
      let find = chartsData?.filter((x) => x?.isPaid == true);
      setpaidAmount(find);
    } else {
      setpaidAmount([]);
    }
  }, [chartsData]);

  useEffect(() => {
    if (newDateMonth !== null) {
      dispatch(TendingApi(startDate, endDate, Userdata?.clientToken));
    } else {
      dispatch(TendingApi(startDate, endDate, Userdata?.clientToken));
    }
  }, [newDateMonth]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'flex-end' }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker type="date" name="year" views={['year', 'month']} onChange={(e) => setDateTopChart(moment(e).format('YYYY-MM'))} />
          </LocalizationProvider>
        </div>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <EarningCard paidAmount={paidAmount} isLoading={isLoadingCharts} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard paidAmount={paidAmount} isLoading={isLoadingCharts} />
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
            <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'flex-end' }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker type="date" name="year" views={['year']} onChange={(e) => setDate(moment(e).format('YYYY'))} />
              </LocalizationProvider>
            </div>
            <TotalGrowthBarChart chartGrowthData={chartGrowthData} isLoading={isLoadingChartGrowth} />
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'flex-end' }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker type="date" name="expiry" views={['month']} onChange={(e) => setDateMonth(moment(e).format('MM'))} />
              </LocalizationProvider>
            </div>
            <PopularCard chartstartData={chartstartData} isLoading={isLoadingCharts} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
