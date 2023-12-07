import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
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
import { updateToBatch } from 'store/batch/batchTypeAction';
import { useLocation, useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Row(props) {
  const { row, setId, state } = props;
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const Userdata = useSelector((state) => state.AuthReducer.data);
  // const isLoadingOrderChange = useSelector((state) => state.OrderReducer.isLoadingOrderChange);
  const LocationDataChange = useSelector((state) => state.OrderReducer.LocationDataChange);
  // moveToBatch(row?._id)

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
    dispatch(GetAllOrder(Userdata?.clientToken));
  };
  const ViewLocation = (id) => {
    dispatch(ViewOrderLocation(id, Userdata?.clientToken));
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
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
        <TableCell align="center">{moment(row?.updatedOnDate).format('DD MMM YYYY, h:mm a')}</TableCell>
        <TableCell align="center">{row?.user?.fullName}</TableCell>
        <TableCell align="center">{row?.totalAmount}-AED</TableCell>
        <TableCell align="center">{row?.deliveryDate}</TableCell>
        <TableCell align="center">
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
        </TableCell>
        <TableCell align="center">{row?.isCooked ? 'Yes' : 'No'}</TableCell>
        <TableCell align="center">{row?.batchNumber}</TableCell>
        <TableCell align="center">
          <Switch onChange={() => OrderCooked(row?._id, 'isCompleted', row.isCompleted)} checked={row.isCompleted} />
        </TableCell>
        <TableCell align="right">
          <Checkbox defaultChecked={state?.batchNumber === row?.batchNumber ? true : false} onChange={() => setId(row?._id)} />
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
                  newpouchesDetail && typeofPouch === 'string' ? content?.split(/\\n|\|/) : historyRow?.pouchesDetail[0]?.split('|');
                return (
                  <>
                    <Typography variant="h4" gutterBottom component="div">
                      Order
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell align="right">Total price (AED)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {historyRow?.planType}
                          </TableCell>
                          <TableCell align="right">{historyRow?.planTotal}-AED</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Typography variant="h4" gutterBottom component="div">
                                  Details
                                </Typography>
                                {historyRow?.pet && (
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="left">Pet Name</TableCell>
                                        <TableCell align="center">Breed</TableCell>
                                        <TableCell align="center">Media</TableCell>
                                        <TableCell align="center">Feeding Routine</TableCell>
                                        <TableCell align="center">Current Weight</TableCell>
                                        <TableCell align="right">Actual Weight</TableCell>
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
                                        <TableCell align="center">{historyRow?.pet?.feedingRoutine}</TableCell>

                                        <TableCell align="center">{historyRow?.pet?.currentWeight}</TableCell>
                                        <TableCell align="right">{historyRow?.pet?.actualWeight}</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                )}

                                <Table size="small" aria-label="purchases">
                                  {historyRow?.recipes?.map((item, index) => (
                                    <>
                                      <TableHead key={index}>
                                        <TableRow>
                                          <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                                          <TableCell style={{ fontWeight: 'bold' }} align="center">
                                            Name
                                          </TableCell>
                                          <TableCell style={{ fontWeight: 'bold' }} align="center">
                                            Quantity
                                          </TableCell>
                                          <TableCell style={{ fontWeight: 'bold' }} align="right">
                                            Price (AED)
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
                                          <TableCell component="th" scope="row">
                                            {item?.category !== '' ? item?.category : '---'}
                                          </TableCell>
                                          <TableCell align="center">{item?.name}</TableCell>
                                          <TableCell align="center">{item?.quantity}</TableCell>
                                          <TableCell align="right">{item?.finalPrice}-AED</TableCell>
                                          {item?.selectedItemSize && (
                                            <TableCell align="right">
                                              {item?.selectedItemSize?.price}-AED <br></br>
                                              {item?.selectedItemSize?.name}
                                            </TableCell>
                                          )}
                                        </TableRow>
                                      </TableBody>
                                    </>
                                  ))}
                                </Table>
                                {resultArray?.length > 0 && (
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
                                )}
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

export default function EditBatch() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log(state, 'IncomingData');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [OrderIds, setOrderIds] = React.useState([]);

  const [FiltredDAta, setFiltredDAta] = React.useState([]);
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

  React.useEffect(() => {
    let findData = dataOrders?.filter(
      (i) => i?.batchNumber === state?.batchNumber || i?.batchNumber === undefined || i?.batchNumber === null || i?.batchNumber === ''
    );
    let findingInitalId = dataOrders?.filter((i) => i?.batchNumber === state?.batchNumber);
    let IdMap = findingInitalId?.map((w) => w?._id);
    setOrderIds([...IdMap]);
    setFiltredDAta(findData);
  }, [dataOrders]);

  // console.log(dataOrders, 'dataOrders');

  React.useEffect(() => {
    dispatch(GetAllOrder(Userdata?.clientToken));
  }, []);
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

  const updateBatch = () => {
    let allData = {
      add: OrderIds
    };
    if (OrderIds?.length > 0) {
      dispatch(updateToBatch(state?.batch_id, allData, Userdata?.clientToken, onSuccessBatch));
    }
  };
  const onSuccessBatch = () => {
    dispatch(GetAllOrder(Userdata?.clientToken));
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
            <div
              style={{
                border: '1px solid #D78809',
                width: 30,
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 50,
                margin: 5,
                padding: 2
              }}
            >
              <ArrowBackIcon onClick={() => navigate(-1)} style={{ color: '#D78809' }} />
            </div>
            <div>
              <h3>Batch Number : {state?.batchNumber}</h3>
            </div>
            <AnimateButton>
              <Button
                onClick={() => updateBatch()}
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
                  'Update Cooking Batch'
                )}
              </Button>
            </AnimateButton>
          </div>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ backgroundColor: '#D78809' }}>
                <TableCell />
                <TableCell style={{ color: '#fff' }}>Order No.</TableCell>
                <TableCell style={{ color: '#fff' }}>Order Date / Time</TableCell>
                <TableCell style={{ color: '#fff' }}>User Name</TableCell>
                <TableCell style={{ color: '#fff' }} align="right">
                  Order Total (AED)
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="right">
                  Delivery Date
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="center">
                  Delivery Location
                </TableCell>
                {/* <TableCell style={{ color: "#fff" }} align="center">Actions</TableCell> */}
                <TableCell style={{ color: '#fff' }} align="center">
                  Cooked
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="center">
                  Batch No.
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="center">
                  Delivered
                </TableCell>
                <TableCell style={{ color: '#fff' }} align="right">
                  Add to Cooking Batch
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FiltredDAta?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                <Row key={index} row={row} setId={setId} state={state} />
              ))}
            </TableBody>
          </Table>
        </>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={FiltredDAta?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
