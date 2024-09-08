import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Collapse from '@mui/material/Collapse';
// import Paper from '@mui/material/Paper';
import moment from 'moment/moment';
import Divider from '@mui/material/Divider';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { SET_MENU } from 'store/actions';
import { useLocation } from 'react-router-dom';

const Invoice = () => {
    const isLoadingLocation = useSelector((state) => state.OrderReducer.isLoadingLocation);
    const location = useSelector((state) => state.OrderReducer.LocationDataChange);
    const dispatch = useDispatch();
    const locations = useLocation();
    let SelectRow = locations?.state?.data;
   // console.log(SelectRow, "SelectRow")

    const downloadPDF = () => {
        dispatch({ type: SET_MENU, opened: false });
        setTimeout(() => {
            window.print();
        }, 200);
    };

    return (
        <Box className="modalContent">
            {isLoadingLocation ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <InfinitySpin width="120" color="#D78809" />
                </div>
            ) : (
                <div className="reportView" style={{width: '40%',marginLeft: '30%'}}>
                    <div className="print" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            onClick={() => downloadPDF()}
                            style={{ margin: '12px' }}
                            variant="contained"
                            color="primary"
                            sx={{ boxShadow: 'none' }}
                        >
                            Print
                        </Button>
                    </div>
                    <div className="innderView" style={{border:'0.2px solid #000'}}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: "column" }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', height:'15px' }}>
                                <h6>Order No : </h6> <h6 style={{ marginLeft: 10 }}> {SelectRow?._id.substr(SelectRow?._id?.length - 5)}</h6>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', height:'54px' }}>
                                <h6>Batch No : </h6> <h6 style={{ marginLeft: 10 }}> {SelectRow?.batchNumber}</h6>
                            </div>
                        </div>
                        {/* <Divider>Order Details</Divider> */}
                        <div>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold', fontSize:'8px',lineHeight:'12px', padding:'3px' }}>Customer Name</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', fontSize:'8px',lineHeight:'12px', padding:'3px' }} align="center">
                                            Order Total
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold', fontSize:'8px',lineHeight:'12px', padding:'3px' }} align="center">
                                            Discount Applied
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold', fontSize:'8px',lineHeight:'12px', padding:'3px' }} align="center">
                                            VAT
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold', fontSize:'8px',lineHeight:'12px', padding:'3px' }} align="center">
                                            Order Payable Total
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold', fontSize:'8px',lineHeight:'12px', padding:'3px' }} align="center">
                                            Order Date
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold', fontSize:'8px',lineHeight:'12px', padding:'3px' }} align="center">
                                            Delivery Date
                                        </TableCell>
                                        {/* <Table Cell align="center">Location</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell style={{fontSize:'9px',padding:'5px'}} component="th" scope="row">
                                            {SelectRow?.user?.fullName}
                                        </TableCell>
                                        <TableCell style={{fontSize:'9px',padding:'5px'}} align="center">{(parseFloat(SelectRow?.cartTotal)+parseFloat(SelectRow?.shippingFees)).toFixed(2)} AED</TableCell>
                                        <TableCell style={{fontSize:'9px',padding:'5px'}} align="center">{SelectRow?.discount.toFixed(2)} AED</TableCell>
                                        <TableCell style={{fontSize:'9px',padding:'5px'}} align="center">{SelectRow?.vat.toFixed(2)} AED</TableCell>
                                        <TableCell style={{fontSize:'9px',padding:'5px'}} align="center">{SelectRow?.totalAmount.toFixed(2)} AED</TableCell>
                                        <TableCell style={{fontSize:'9px',padding:'5px'}}align="center">{moment(SelectRow?.createdOnDate).format('DD MMM YYYY, h:mm a')}</TableCell>
                                        <TableCell style={{fontSize:'9px',padding:'5px'}} align="center">{SelectRow?.deliveryDate}</TableCell>
                                        {/* <TableCell align="center">{row.location[0]?.address}</TableCell> */}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <Divider style={{fontSize:'11px'}}>Order Items, Total Items: {SelectRow?.orderItems?.length}</Divider>
                        <div>
                            <Box sx={{ margin: 1 }}>
                                {SelectRow?.orderItems.map((historyRow, index) => {
                                    let typeofPouch = typeof historyRow?.pouchesDetail;
                                    let newpouchesDetail = historyRow?.pouchesDetail && historyRow?.pouchesDetail;
                                    const content = newpouchesDetail && typeofPouch === 'string' && newpouchesDetail?.slice(2, -2);
                                    const resultArray =
                                    historyRow?.pouchesDetail?.length > 1
                                    ? historyRow?.pouchesDetail
                                    : newpouchesDetail && typeofPouch === 'string'
                                      ? content?.split(/\\n|\|/)
                                      : historyRow?.pouchesDetail[0]?.split('|');                                    return (
                                        <>
                                            <Typography variant="h2" style={{ paddingBottom: 2, paddingTop: 2, fontSize:'12px', fontWeight:600}} gutterBottom component="div">
                                                Item : {index + 1}
                                            </Typography>
                                            <Table  aria-label="purchases">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }}>Type</TableCell>
                                                        {/* <TableCell>Special Instructions(If Any)</TableCell> */}
                                                        <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'2px', lineHeight:'1rem' }}>Total Price</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow key={index}>
                                                        <TableCell component="th" scope="row" style={{ fontWeight: 'bold',fontSize:'10px',padding:'4px' }}>
                                                            {historyRow?.planType} Order
                                                        </TableCell>
                                                        {/* <TableCell component="th" scope="row">
                                                            {SelectRow?.specialInstructions}
                                                        </TableCell> */}
                                                        <TableCell align="left" style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }}>{historyRow?.planTotal.toFixed(2)} AED</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        {historyRow?.pet && (
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell align="left" style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }}>Pet</TableCell>
                                                                        <TableCell align="center" style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }}>Pet Name</TableCell>
                                                                        <TableCell align="center" style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }}>Breed</TableCell>
                                                                        <TableCell align="center" style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }}>Feeding Routine</TableCell>
                                                                        {/* <TableCell align="center">Current Weight</TableCell>
                                                                        <TableCell align="right">Actual Weight</TableCell> */}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                    <TableCell align="left" style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }}>
                                                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                                <AvatarGroup max={2}>
                                                                                    <Avatar key={index} alt="Remy Sharp" src={historyRow?.pet?.media} />
                                                                                </AvatarGroup>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }} align="center">{historyRow?.pet?.name}</TableCell>
                                                                        <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }} align="center">{historyRow?.pet?.breed}</TableCell>
                                                                       
                                                                        <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }} align="center">{historyRow?.pet?.feedingRoutine}</TableCell>
                                                                        {/* 
                                                                        <TableCell align="center">{historyRow?.pet?.currentWeight}</TableCell>
                                                                        <TableCell align="right">{historyRow?.pet?.actualWeight}</TableCell> */}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        )}

                                                        <Table size="small" aria-label="purchases">
                                                            {historyRow?.recipes?.map((item, index) => (
                                                                <>
                                                                    <TableHead key={index}>
                                                                        <TableRow>
                                                                            <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'3px' }}>Category</TableCell>
                                                                            <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'3px',lineHeight:'1rem' }} align="center">
                                                                                Product Description
                                                                            </TableCell>
                                                                            <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'3px',lineHeight:'1rem' }} align="center">
                                                                                Product ID
                                                                            </TableCell>
                                                                            <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'3px' }} align="center">
                                                                                Quantity
                                                                            </TableCell>
                                                                            <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'3px', lineHeight:'1rem' }} align="center">
                                                                                Unit Price
                                                                            </TableCell>
                                                                            <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px', lineHeight:'1rem' }} align="center">
                                                                                Total Price
                                                                            </TableCell>
                                                                            {item?.selectedItemSize && (
                                                                                <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'3px', lineHeight:'1rem' }} align="center">
                                                                                    Selected Size
                                                                                </TableCell>
                                                                            )}
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row" style={{ fontSize:'10px',padding:'3px' }}>
                                                                                {item?.category !== '' ? item?.category : historyRow?.planType}
                                                                            </TableCell>
                                                                            <TableCell style={{ fontSize:'10px',padding:'3px' }} align="center">{item?.name}</TableCell>
                                                                            <TableCell style={{ fontSize:'10px',padding:'3px' }} align="center">{item?._id.substr(item?._id?.length - 5)}</TableCell>
                                                                            <TableCell style={{ fontSize:'10px',padding:'3px' }} align="center">{historyRow?.planType==="Monthly"?item?.totalDays:historyRow?.planType==="Transitional"?historyRow?.pet?.feedingRoutine*10:item?.quantity}</TableCell>
                                                                            <TableCell style={{ fontSize:'10px',padding:'3px' }} align="center">{historyRow?.planType==="Product"?`${item?.finalPrice/item?.quantity} AED`:"-"}</TableCell>
                                                                            <TableCell style={{ fontSize:'10px',padding:'3px' }} align="center">{item?.finalPrice.toFixed(2)} AED</TableCell>
                                                                            {item?.selectedItemSize && (
                                                                                <TableCell align="center" style={{ fontSize:'10px',padding:'3px' }}>
                                                                                    {item?.selectedItemSize?.price} AED <br></br>
                                                                                    {item?.selectedItemSize?.name}
                                                                                </TableCell>
                                                                            )}
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </>
                                                            ))}
                                                        </Table>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }}>Serving</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                    {resultArray?.length > 0 ? (

                                                                        <TableCell component="th" scope="row" style={{ fontSize:'10px',padding:'0px' }}>
                                                                            {
                                                                            historyRow?.planType=="Monthly"?
                                                                            historyRow?.recipes?.map((item, i) => (
                                                                            resultArray?.length > 1 ? (
                                                                                <p key={i}>{`${item.name} : ${resultArray[i]}`}</p>
                                                                              ) : (
                                                                                resultArray?.map((x, index) => <p key={index}>{x}</p>)
                                                                              )
                                                                            )) :
                                                                            resultArray?.map((x, index) => (
                                                                                <p key={index}>{x}</p>
                                                                            ))}
                                                                        </TableCell>
                                                                         ) : 
                                                                         (
                                                                            <TableCell component="th" scope="row" style={{ fontSize:'10px',padding:'0px' }}>
                                                                               {historyRow?.recipes?.map((item, i) => (
                                                                                 <p key={i}>{item.category=="Standard Recipes"?`${item.quantity} Servings x ${item.weight} grams`:'-'}</p>

                                                                               ))}
                                                                            </TableCell>    


                                                                         )
                                                                         }
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                       
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </>
                                    );
                                })}
                            </Box>
                        </div>
                        <Divider style={{fontSize:'11px'}}>Address</Divider>
                        <div>
                            <Table  aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold',fontSize:'8px',padding:'0px' }}>Area</TableCell>
                                        <TableCell style={{ fontWeight: 'bold',fontSize:'8px',padding:'0px' }}>Street</TableCell>
                                        <TableCell style={{ fontWeight: 'bold',fontSize:'8px',padding:'0px' }} align="center">
                                            Building
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold',fontSize:'8px',paddingLeft:'5px' }} align="center">
                                            Floor
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold',fontSize:'8px',padding:'0px' }} align="center">
                                            Address
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold',fontSize:'8px',padding:'0px' }} align="center">
                                            Contact Person
                                        </TableCell>
                                        <TableCell style={{ fontWeight: 'bold',fontSize:'8px',padding:'0px' }} align="center">
                                            Contact Number
                                        </TableCell>
                                        {/* <Table Cell align="center">Location</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell  style={{ fontSize:'10px',padding:'0px' }}>
                                            {location?.area}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize:'8px',padding:'0px' }}>{location?.street}</TableCell>
                                        <TableCell align="center"  style={{ fontSize:'8px',padding:'0px' }}>{location?.flatHouseNumber} </TableCell>
                                        <TableCell align="center"  style={{ fontSize:'8px',padding:'0px' }}>{location?.floor}</TableCell>

                                        <TableCell align="center"  style={{ fontSize:'8px',padding:'0px' }}>{location?.address}</TableCell>
                                        <TableCell align="center"  style={{ fontSize:'8px',padding:'0px' }}>{location?.contactName}</TableCell>
                                        <TableCell align="center"  style={{ fontSize:'8px',padding:'0px' }}>{location?.contactNumber}</TableCell>


                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell style={{ fontWeight: 'bold',fontSize:'10px',padding:'0px' }} >
                                    Special Instructions
                                        </TableCell>
                                    <TableCell  style={{fontSize:'8px',padding:'0px' }}>{location?.deliveryInstruction}</TableCell>
                                        </TableRow>

                                </TableBody>
                            </Table>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                                <h5>{`THANK YOU for being part of Bruno's family where every tail wag tells a story of love, care, and culinary excellence.`}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Box>
    );
};

export default Invoice;
