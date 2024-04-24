import React from 'react';
import { Modal, Box, Button } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { InfinitySpin } from 'react-loader-spinner';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AnimateButton from 'ui-component/extended/AnimateButton';
import moment from 'moment/moment';
import { ReportDownLoad } from 'store/charts/chartsAction';
import { useDispatch, useSelector } from 'react-redux';

const DateSelector = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const isLoadingreport = useSelector((state) => state.ChartsReducer.isLoadingreport);
  const reportData = useSelector((state) => state.ChartsReducer.reportData);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const [startDate, setstartDate] = React.useState(null);
  const [endDate, setendDate] = React.useState(null);
  console.log(reportData, startDate, isLoadingreport);

  const onSubmit = () => {
    if (startDate !== null && endDate !== null) {
      const timestampstart = Date.parse(startDate);
      const timestampend = Date.parse(endDate);
      dispatch(ReportDownLoad(timestampstart, timestampend, Userdata?.clientToken));
    }
  };
  return (
    <Modal open={open} onClose={onClose} className="modalContainer">
      <Box className="modalContent">
        <>
          <h2 style={{ textDecoration: 'underline' }}>Download Report</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ margin: 5 }}>
              <p>Starting Data</p>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  type="date"
                  name="year"
                  views={['year', 'month', 'day']}
                  onChange={(e) => setstartDate(moment(e).format('YYYY-MM-DD'))}
                />
              </LocalizationProvider>
            </div>
            <div style={{ margin: 5 }}>
              <p>Ending Data</p>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  type="date"
                  name="year"
                  views={['year', 'month', 'day']}
                  onChange={(e) => setendDate(moment(e).format('YYYY-MM-DD'))}
                />
              </LocalizationProvider>
            </div>
          </div>
          <AnimateButton>
            <Button
              disabled={isLoadingreport}
              onClick={() => onSubmit()}
              style={{ margin: '12px' }}
              variant="contained"
              color="primary"
              sx={{ boxShadow: 'none' }}
            >
              Download
            </Button>
          </AnimateButton>
        </>
      </Box>
    </Modal>
  );
};

export default DateSelector;
