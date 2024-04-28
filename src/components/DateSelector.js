import React, { useEffect, useRef, useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { InfinitySpin } from 'react-loader-spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AnimateButton from 'ui-component/extended/AnimateButton';
import moment from 'moment/moment';
import { ReportDownLoad } from 'store/charts/chartsAction';
import { useDispatch, useSelector } from 'react-redux';
import { exportToExcel } from 'react-json-to-excel';
import generatePDF from 'react-to-pdf';
// onEmptyReport,

const DateSelector = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const isLoadingreport = useSelector((state) => state.ChartsReducer.isLoadingreport);
  const reportData = useSelector((state) => state.ChartsReducer.reportData);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const [startDate, setstartDate] = React.useState(null);
  const [endDate, setendDate] = React.useState(null);
  const [newModal, setnewModal] = useState(false);
  console.log(reportData, startDate, isLoadingreport);
  const targetRef = useRef();
  // const { toPDF, targetRef } = usePDF({ filename: `Rerport-${startDate}-to${endDate}.pdf` });

  const onSubmit = () => {
    if (startDate !== null && endDate !== null) {
      const timestampstart = Date.parse(startDate);
      const timestampend = Date.parse(endDate);
      dispatch(ReportDownLoad(timestampstart, timestampend, Userdata?.clientToken));
    }
  };

  const downloadPDF = () => {
    window.print();
  }
  useEffect(() => {
    if (reportData?.length > 0) {
      let newData = reportData?.map((i) => {
        return {
          User: i?.userId,
          Order_No: i?._id.substr(i?._id?.length - 5),
          Order_Total: i?.cartTotal,
          Order_Sub_Total: i?.totalAmount,
          Order_Createdon: moment(i?.createdOnDate).format('DD MMM YYYY, h:mm a'),
          Order_DeliveryDate: i?.deliveryDate,
          Location: i?.locationId
        }
      });
      setnewModal(true);
      exportToExcel(newData, `report-${startDate}-to-${endDate}`);
      generatePDF(targetRef, { filename: `Rerport-${startDate}-to${endDate}.pdf` });

    }
  }, [reportData]);

  const onCloseNewModal = () => {
    setnewModal(false);
    dispatch(onEmptyReport());
    onClose();
  }

  return (
    <>
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
      <Modal open={newModal} onClose={() => onCloseNewModal()} className="modalContainer">
        <Box style={{ width: 1200 }} >
          <TableContainer ref={targetRef} component={Paper}>
          <Button
                onClick={() => downloadPDF()}
                style={{ margin: '12px' }}
                variant="contained"
                color="primary"
                sx={{ boxShadow: 'none' }}
              >
                Download As PDF
              </Button>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell >User</TableCell>
                  <TableCell align="center">Order_No</TableCell>
                  <TableCell align="center">Order_Total</TableCell>
                  <TableCell align="center">Order_Sub_Total</TableCell>
                  <TableCell align="center">Order_Createdon</TableCell>
                  <TableCell align="center">Order_DeliveryDate</TableCell>
                  <TableCell align="center">Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.userId}
                    </TableCell>
                    <TableCell align="center">
                      {row._id.substr(row?._id?.length - 5)}
                    </TableCell>
                    <TableCell align="center">{row.cartTotal}</TableCell>
                    <TableCell align="center">{row.totalAmount}</TableCell>
                    <TableCell align="center">{moment(row?.createdOnDate).format('DD MMM YYYY, h:mm a')}</TableCell>
                    <TableCell align="center">{row.deliveryDate}</TableCell>
                    <TableCell align="center">{row.locationId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>

  );
};

export default DateSelector;
