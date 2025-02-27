import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeOrder, GetAllOrder, ViewOrderLocation } from 'store/orders/ordersAction';
import { InfinitySpin } from 'react-loader-spinner';
import LocationModal from 'components/LocationModal';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment';
import { ADDToBatch } from 'store/batch/batchTypeAction';
import SearchFeild from 'components/searchFeild';
import { SET_MENU } from 'store/actions';
import ExportUsers from 'views/user-accounts/exportUsers';
// import ReportModal from 'components/ReportModal';
import { useNavigate } from 'react-router';
// material-ui

function Row(props) {
  const { row, setId } = props;
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  // const [modalReportOpen, setModalReportOpen] = React.useState(false);
  // const [SelectRow, setSelectRow] = React.useState(null);
  const navigate = useNavigate();

  const Userdata = useSelector((state) => state.AuthReducer.data);
  const LocationDataChange = useSelector((state) => state.OrderReducer.LocationDataChange);


  const dispatch = useDispatch();
  const OrderCooked = (id, name, check) => {
    if (name === 'isCooked') {
      let data = {
        isCooked: true
      };
      dispatch(ChangeOrder(id, data, Userdata?.clientToken, onSuccess));
    } else {
      let data = {
        isCompleted: !check
      };
      dispatch(ChangeOrder(id, data, Userdata?.clientToken, onSuccess));
    }
  };

  const onSuccess = () => {
    dispatch(GetAllOrder(Userdata?.clientToken,));
  };
  // const ViewLocation = (id) => {
  //   dispatch(ViewOrderLocation(id, Userdata?.clientToken));
  //   setModalOpen(true);
  // };

  const ViewReport = (data) => {
    navigate('/order-list/invoice', { state: { data: data } });
    dispatch(ViewOrderLocation(data?.locationId, Userdata?.clientToken));
    // setSelectRow(data);
    // setModalReportOpen(true);
  };
  ViewReport;
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  // const handleCloseReportModal = () => {
  //   setModalReportOpen(false);
  // };

  return (
    <React.Fragment>
      {/* <ReportModal open={modalReportOpen} onClose={handleCloseReportModal} location={LocationDataChange} SelectRow={SelectRow} /> */}
      <LocationModal open={modalOpen} onClose={handleCloseModal} location={LocationDataChange} />
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row?._id.substr(row?._id?.length - 5)}
        </TableCell>
        <TableCell align="center">{moment(row?.createdOnDate).format('DD MMM YYYY, h:mm a')}</TableCell>
        <TableCell align="center">{row?.user?.fullName}</TableCell>
        <TableCell align="center">{row?.totalAmount.toFixed(2)} AED</TableCell>
        <TableCell align="center">{row?.deliveryDate}</TableCell>
        <TableCell align="center">
          <AnimateButton>
            <Button
              onClick={() => ViewReport(row)}
              style={{ margin: '12px' }}
              variant="contained"
              color="primary"
              sx={{ boxShadow: 'none' }}
            >
              Invoice
            </Button>
          </AnimateButton>
        </TableCell>
        {/* <TableCell align="center">
          <AnimateButton>
            <Button
              onClick={() => ViewLocation(row?.locationId)}
              style={{ margin: '12px' }}
              variant="contained"
              color="primary"
              sx={{ boxShadow: 'none' }}
            >
              View Location
            </Button>
          </AnimateButton>
        </TableCell> */}
        <TableCell align="center">{row?.isCooked ? 'Yes' : 'No'}</TableCell>
        <TableCell align="center">{row?.batchNumber}</TableCell>
        <TableCell align="center">
          <Switch onChange={() => OrderCooked(row?._id, 'isCompleted', row.isCompleted)} checked={row.isCompleted} />
        </TableCell>
        <TableCell align="right">
          <Checkbox onChange={() => setId(row?._id)} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.orderItems.map((historyRow, index) => {
                let typeofPouch = typeof historyRow?.pouchesDetail;
                let newpouchesDetail = historyRow?.pouchesDetail && historyRow?.pouchesDetail;
                const content = newpouchesDetail && typeofPouch === 'string' && newpouchesDetail?.slice(2, -2);
                const resultArray =
                  historyRow?.pouchesDetail?.length > 1
                    ? historyRow?.pouchesDetail
                    : newpouchesDetail && typeofPouch === 'string'
                      ? content?.split(/\\n|\|/)
                      : historyRow?.pouchesDetail[0]?.split('|');

                let tArry = [3, 3, 3, 1];
                return (
                  <>
                    <Table size="small" aria-label="purchases">
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                {historyRow?.pet && (
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">
                                          Pet Name
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">
                                          Breed
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">
                                          Image
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">
                                          Feeding Routine
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell align="left">{historyRow?.pet?.name}</TableCell>
                                        <TableCell align="center">{historyRow?.pet?.breed}</TableCell>
                                        <TableCell align="center">
                                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <AvatarGroup max={2}>
                                              <Avatar key={index} alt="Remy Sharp" src={historyRow?.pet?.media} />
                                            </AvatarGroup>
                                          </div>
                                        </TableCell>
                                        <TableCell align="center">
                                          {historyRow?.pet?.feedingRoutine} {historyRow?.pet?.feedingRoutine > 1 ? 'times' : 'time'}
                                        </TableCell>

                                        {/* <TableCell align="center">{historyRow?.pet?.currentWeight}</TableCell>
                                        <TableCell align="right">{historyRow?.pet?.actualWeight}</TableCell> */}
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                )}
                                {historyRow?.planType === 'Transitional' ? (
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}></TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">
                                          Product No
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">
                                          Product ID
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">
                                          Product Description
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">
                                          Quantity
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">
                                          Serving
                                        </TableCell>
                                        {/* {item?.selectedItemSize && (
                                          <TableCell style={{ fontWeight: 'bold' }} align="right">
                                            Selected Size
                                          </TableCell>
                                        )} */}
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {/* {resultArray?.map((item, index) => ( */}
                                      <>
                                        <TableRow>
                                          <TableCell align="center"></TableCell>
                                          <TableCell rowSpan={resultArray?.length} align="center">{index + 1}</TableCell>
                                          <TableCell rowSpan={resultArray?.length} align="center">{historyRow?.recipes?.[0]?._id.substr(historyRow?.recipes?.[0]?._id?.length - 5)}</TableCell>
                                          <TableCell rowSpan={resultArray?.length} component="th" scope="row">
                                            {historyRow?.planType}
                                          </TableCell>
                                          <TableCell align="center">
                                            {resultArray?.map((x, index) =>
                                              <TableRow key={index}>
                                                <TableCell align="center">{historyRow?.recipes?.[0]?.name}</TableCell>
                                              </TableRow>
                                            )}
                                          </TableCell>
                                          <TableCell align="center">
                                            {resultArray?.map((x, index) =>
                                              <TableRow key={index}>
                                                <TableCell align="center">{tArry?.[index]}</TableCell>
                                              </TableRow>
                                            )}
                                          </TableCell>
                                          <TableCell align="left" >
                                            {resultArray?.map((y, index) => <TableRow key={index}>
                                              <TableCell align="left">{y}</TableCell>
                                            </TableRow>)}
                                          </TableCell>
                                        </TableRow>
                                      </>
                                      {/* ))} */}
                                    </TableBody>
                                  </Table>
                                ) : historyRow?.planType === "Monthly" ? (
                                  <Table size="small" aria-label="purchases">
                                    {historyRow?.recipes?.map((item, i) => (
                                      <>
                                        <TableHead key={i}>
                                          <TableRow>
                                            <TableCell style={{ fontWeight: 'bold' }}></TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Product No
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Product ID
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Product Description
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Quantity
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Serving
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          <TableRow>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">{i + 1}</TableCell>
                                            <TableCell align="center">{item?._id.substr(item?._id?.length - 5)}</TableCell>
                                            <TableCell component="th" scope="row">
                                              {historyRow?.planType}
                                            </TableCell>
                                            <TableCell align="center">{item?.name}</TableCell>
                                            <TableCell align="center">
                                              {item?.totalDays}
                                            </TableCell>
                                            <TableCell align="center" component="th" scope="row">
                                              {resultArray?.length > 1 ? (
                                                <p>{resultArray[i]}</p>
                                              ) : (
                                                resultArray?.map((x, index) => <p key={index}>{x}</p>)
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </>
                                    ))}
                                  </Table>) : (
                                  <Table size="small" aria-label="purchases">
                                    {historyRow?.recipes?.map((item, i) => (
                                      <>
                                        <TableHead key={i}>
                                          <TableRow>
                                            <TableCell style={{ fontWeight: 'bold' }}></TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Product No
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Product ID
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Product Description
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Quantity
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Serving
                                            </TableCell>
                                            {item?.selectedItemSize && (
                                              <TableCell style={{ fontWeight: 'bold' }} align="right">
                                                Selected Size
                                              </TableCell>
                                            )}
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          <TableRow>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{item?._id.substr(item?._id?.length - 5)}</TableCell>
                                            <TableCell component="th" scope="row">
                                              {historyRow?.planType}
                                            </TableCell>
                                            <TableCell align="center">{item?.name}</TableCell>
                                            <TableCell align="center">
                                              {item?.quantity}
                                            </TableCell>
                                            <TableCell align="center" component="th" scope="row">
                                              -
                                            </TableCell>
                                            {item?.selectedItemSize && (
                                              <TableCell align="right">
                                                {item?.selectedItemSize?.price} AED <br></br>
                                                {item?.selectedItemSize?.name}
                                              </TableCell>
                                            )}
                                          </TableRow>
                                        </TableBody>
                                      </>
                                    ))}
                                  </Table>
                                )}


                                {/* {resultArray?.length > 0 && (
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Pouches Detail</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell component="th" scope="row">
                                          {resultArray?.map((x, index) => (
                                            <p key={index}>{x}</p>
                                          ))}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                )} */}
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </>
                );
              })}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function OrderList() {
  const [page, setPage] = React.useState(0);
  const [value, setValue] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [OrderIds, setOrderIds] = React.useState([]);
  const [FiltredData, setFiltredData] = React.useState([]);
  const [IsDelevred, setIsDelevred] = React.useState(false);
  const [Id, setId] = React.useState(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dispatch = useDispatch();
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const isLoading = useSelector((state) => state.OrderReducer.isLoadingOrder);
  const dataOrders = useSelector((state) => state.OrderReducer.orderData);
  const isLoadingAddBatch = useSelector((state) => state.BatchReducer.isLoadingAddBatch);
  const [typeforView, settypeforView] = React.useState('Newest');

  React.useEffect(() => {
    dispatch(GetAllOrder(Userdata?.clientToken,typeforView));
  }, [typeforView]);
  React.useEffect(() => {
    if (Id !== null) {
      let ifMatch = OrderIds.indexOf(Id);
      if (ifMatch === -1) {
        if (OrderIds?.length > 0) {
          setOrderIds((oldArray) => [Id, ...oldArray]);
        } else {
          setOrderIds([Id]);
        }
      } else {
        let newData = [...OrderIds];
        let index = newData.findIndex((i) => i === Id);
        if (index !== -1) {
          newData.splice(index, 1);
          setOrderIds(newData);
        }
      }
      setId(null);
    }
  }, [Id]);

  const onPrint = () => {
    dispatch({ type: SET_MENU, opened: false });
    setTimeout(() => {
      window.print();
    }, 200);
  };
  React.useEffect(() => {
    if (value !== '') {
      const filteredData = dataOrders?.filter((item) => {
        return (
          item?.batchNumber?.toLowerCase()?.includes(value?.toLowerCase()) ||
          item?._id
            .substr(item?._id?.length - 5)
            ?.toLowerCase()
            ?.includes(value?.toLowerCase()) ||
          item?.user?.fullName?.toLowerCase()?.includes(value?.toLowerCase()) ||
          item?.totalAmount.toString()?.toLowerCase()?.includes(value?.toLowerCase()) ||
          moment(item?.updatedOnDate).format('DD MMM YYYY, h:mm a')?.toLowerCase()?.includes(value?.toLowerCase()) ||
          moment(item?.deliveryDate).format('DD MMM YYYY, h:mm a')?.toLowerCase()?.includes(value?.toLowerCase())
        );
      });
      setFiltredData(filteredData);
    } else {
      setFiltredData(dataOrders);
    }
  }, [dataOrders, value]);

  React.useEffect(() => {
    if (IsDelevred) {
      let findData = dataOrders?.filter((item) => item?.isCompleted === true);
      setFiltredData(findData);
    } else {
      setFiltredData(dataOrders);
    }
  }, [IsDelevred]);

  const GenerateBatch = () => {
    let allData = {
      orderIds: OrderIds
    };
    if (OrderIds?.length > 0) {
      dispatch(ADDToBatch(allData, Userdata?.clientToken, onSuccessBatch));
    }
  };
  const onSuccessBatch = () => {
    dispatch(GetAllOrder(Userdata?.clientToken,typeforView));
  };
  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <InfinitySpin width="200" color="#D78809" />
          </div>
        </Paper>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <SearchFeild setValue={setValue} value={value} />
            <FormControl style={{ marginTop: 13, width: 190, marginLeft: 10, height:70 }}>
              <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeforView}
                label="Filter"
                onChange={(e) => settypeforView(e.target.value)}
              >
                <MenuItem value={'Newest'}>Newest</MenuItem>
                <MenuItem value={'Cooked'}>Cooked</MenuItem>
                <MenuItem value={'Delivered'}>Delivered</MenuItem> 
              </Select>
            </FormControl>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
              <AnimateButton>
                <ExportUsers data={FiltredData} filename={'OrderList'} />
                {/* <Button onClick={() => window.print()} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                  Export
                </Button> */}
              </AnimateButton>
              <AnimateButton>
                <Button onClick={() => onPrint()} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                  Print
                </Button>
              </AnimateButton>
              <AnimateButton>
                <Button
                  onClick={() => GenerateBatch()}
                  style={{ margin: '12px' }}
                  variant="contained"
                  color="primary"
                  sx={{ boxShadow: 'none' }}
                >
                  {isLoadingAddBatch ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: 120,
                        height: 25,
                        marginLeft: 10
                      }}
                    >
                      <InfinitySpin color="#fff" />
                    </div>
                  ) : (
                    'Generate Cooking Batch'
                  )}
                </Button>
              </AnimateButton>
            </div>
          </div>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ backgroundColor: '#D78809' }}>
                <TableCell />
                <TableCell style={{ color: '#fff' }}>Order No.</TableCell>
                <TableCell style={{ color: '#fff' }}>Order Date / Time</TableCell>
                <TableCell style={{ color: '#fff' }}>Customer Name</TableCell>
                <TableCell style={{ color: '#fff' }} align="center">
                  Order Total (AED)
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="right">
                  Delivery Date (on or before)
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="center">
                  Print Invoice
                </TableCell>
                {/* <TableCell style={{ color: '#fff' }} align="center">
                  Delivery Location
                </TableCell> */}
                {/* <TableCell style={{ color: "#fff" }} align="center">Actions</TableCell> */}
                <TableCell style={{ color: '#fff' }} align="center">
                  Cooked
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="center">
                  Batch No.
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="center">
                  Delivered{' '}
                  <Checkbox style={{ backgroundColor: '#fff' }} checked={IsDelevred} onChange={() => setIsDelevred(!IsDelevred)} />
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="right">
                  Add to Cooking Batch
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FiltredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                <Row key={index} row={row} setId={setId} />
              ))}
            </TableBody>
          </Table>
        </>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={FiltredData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
