import React from 'react';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Collapse from '@mui/material/Collapse';
// import Paper from '@mui/material/Paper';
import moment from 'moment/moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import Divider from '@mui/material/Divider';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { onEmptyReport } from 'store/charts/chartsAction';
import { Button } from '@mui/material';
import { SET_MENU } from 'store/actions';

export default function ViewReport() {
  const location = useLocation();
  const navigate = useNavigate();
  let reportData = location?.state?.data;
  const dispatch = useDispatch();
  console.log(reportData, 'reportData');

  const onPressBack = () => {
    dispatch(onEmptyReport());
    navigate(-1);
  };
  const downloadPDF = () => {
    dispatch({ type: SET_MENU, opened: false });
    setTimeout(() => {
      window.print();
    }, 200);
  };
  return (
    <div className="reportView">
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <ArrowBackIcon onClick={() => onPressBack()} style={{ color: '#D78809' }} />
        </div>
        <Button onClick={() => downloadPDF()} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
          Print
        </Button>
      </div>
      {reportData?.map((row, index) => (
        <div key={index} className="innderView">
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4>Order No :</h4> <h4> {row._id.substr(row?._id?.length - 5)}</h4>
          </div>
          <Divider>Order Details</Divider>
          <div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>User</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">
                    Order_Total
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">
                    Order_Sub_Total
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">
                    Order_Createdon
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">
                    Order_DeliveryDate
                  </TableCell>
                  {/* <Table Cell align="center">Location</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.user?.fullName}
                  </TableCell>
                  <TableCell align="center">{row.totalAmount} AED</TableCell>
                  <TableCell align="center">{row.cartTotal} AED</TableCell>
                  <TableCell align="center">{moment(row?.createdOnDate).format('DD MMM YYYY, h:mm a')}</TableCell>
                  <TableCell align="center">{row.deliveryDate}</TableCell>
                  {/* <TableCell align="center">{row.location[0]?.address}</TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Divider>Order Items, Total Items: {row.orderItems?.length}</Divider>
          <div>
            <Box sx={{ margin: 1 }}>
              {row.orderItems.map((historyRow, index) => {
                let typeofPouch = typeof historyRow?.pouchesDetail;
                let newpouchesDetail = historyRow?.pouchesDetail && historyRow?.pouchesDetail;
                const content = newpouchesDetail && typeofPouch === 'string' && newpouchesDetail?.slice(2, -2);
                const resultArray =
                  newpouchesDetail && typeofPouch === 'string' ? content?.split(/\\n|\|/) : historyRow?.pouchesDetail[0]?.split('|');
                return (
                  <>
                    <Typography variant="h4" style={{ paddingBottom: 10, paddingTop: 10 }} gutterBottom component="div">
                      Item : {index + 1}
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell>Special Instructions(If Any)</TableCell>
                          <TableCell align="right">Total price (AED)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {historyRow?.planType}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row?.specialInstructions}
                          </TableCell>
                          <TableCell align="right">{historyRow?.planTotal}-AED</TableCell>
                        </TableRow>
                        <TableRow>
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
                        </TableRow>
                      </TableBody>
                    </Table>
                  </>
                );
              })}
            </Box>
          </div>
          <Divider>Address</Divider>
          <div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Area</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">
                    House/Flat/Building
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">
                    Floor
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="center">
                    Address
                  </TableCell>
                  {/* <Table Cell align="center">Location</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.location[0]?.area}
                  </TableCell>
                  <TableCell align="center">{row.location[0]?.flatHouseNumber} AED</TableCell>
                  <TableCell align="center">{row.location[0]?.floor}</TableCell>

                  <TableCell align="center">{row.location[0]?.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
}
