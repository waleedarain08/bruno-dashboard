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


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const Userdata = useSelector((state) => state.AuthReducer.data);
    const isLoadingOrderChange = useSelector((state) => state.OrderReducer.isLoadingOrderChange);
    const LocationDataChange = useSelector((state) => state.OrderReducer.LocationDataChange);


    const dispatch = useDispatch();
    const OrderCooked = (id, name) => {
        if (name === "isCooked") {
            let data = {
                isCooked: true
            }
            dispatch(ChangeOrder(id, data, Userdata?.clientToken, onSuccess))
        }
        else {
            let data = {
                isCompleted: true
            }
            dispatch(ChangeOrder(id, data, Userdata?.clientToken, onSuccess))
        }
    }

    const onSuccess = () => {
        dispatch(GetAllOrder(Userdata?.clientToken));
    }
    const ViewLocation = (id) => {
        dispatch(ViewOrderLocation(id, Userdata?.clientToken));
        setModalOpen(true);
    }
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <React.Fragment>
            <LocationModal open={modalOpen}
                onClose={handleCloseModal}
                location={LocationDataChange} />
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
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
                    </AnimateButton></TableCell>
                <TableCell align="center">
                    {row?.isCooked ? "Yes" : "No"}
                    {/* <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}> */}
                    {/* <AnimateButton>
                        <Button
                            onClick={() => OrderCooked(row?._id, "isCooked")}
                            disabled={row?.isCooked}
                            style={{ margin: '12px' }}
                            variant="contained"
                            color="primary"
                            sx={{ boxShadow: 'none' }}
                        >
                            {isLoadingOrderChange ? <div style={{ marginRight: 25, marginTop: 5 }}><InfinitySpin width="30" color="#D78809" /></div> : !row?.isCooked ? "Order Cooked" : "Order Dispatched"}

                        </Button>
                    </AnimateButton> */}
                    {/* </div> */}
                </TableCell>
                <TableCell align="center">--</TableCell>
                <TableCell align="center">
                    <AnimateButton>
                        <Button
                            onClick={() => OrderCooked(row?._id, "isCompleted")}
                            disabled={row.isCompleted}
                            style={{ margin: '12px' }}
                            variant="contained"
                            color="primary"
                            sx={{ boxShadow: 'none' }}
                        >
                            {isLoadingOrderChange ? <div style={{ marginRight: 25, marginTop: 5 }}><InfinitySpin width="30" color="#D78809" />Yes</div> : " No"}

                        </Button>
                    </AnimateButton></TableCell>
                <TableCell align="right"><Checkbox /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {row.orderItems.map((historyRow, index) => {
                                let typeofPouch = typeof historyRow?.pouchesDetail;
                                let newpouchesDetail = historyRow?.pouchesDetail && historyRow?.pouchesDetail;
                                const content = newpouchesDetail && typeofPouch === "string" && newpouchesDetail?.slice(2, -2);
                                const resultArray = newpouchesDetail && typeofPouch === "string" ? content?.split(/\\n|\|/) : historyRow?.pouchesDetail[0]?.split('|');
                                return <>
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
                                                <TableCell align="right">
                                                    {historyRow?.planTotal}-AED
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="h4" gutterBottom component="div">
                                                                Details
                                                            </Typography>
                                                            {historyRow?.pet && <Table size="small" aria-label="purchases">
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
                                                                        <TableCell align="left">
                                                                            {historyRow?.pet?.name}
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {historyRow?.pet?.breed}
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                <AvatarGroup max={2}>
                                                                                    <Avatar key={index} alt="Remy Sharp" src={historyRow?.pet?.media} />
                                                                                </AvatarGroup>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {historyRow?.pet?.feedingRoutine}
                                                                        </TableCell>

                                                                        <TableCell align="center">
                                                                            {historyRow?.pet?.currentWeight}
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            {historyRow?.pet?.actualWeight}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>}

                                                            <Table size="small" aria-label="purchases">

                                                                {historyRow?.recipes?.map((item, index) => (
                                                                    <>
                                                                        <TableHead key={index}>
                                                                            <TableRow>
                                                                                <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
                                                                                <TableCell style={{ fontWeight: "bold" }} align="center">Name</TableCell>
                                                                                <TableCell style={{ fontWeight: "bold" }} align="center">Quantity</TableCell>
                                                                                <TableCell style={{ fontWeight: "bold" }} align="right">Price (AED)</TableCell>
                                                                                {item?.selectedItemSize && <TableCell style={{ fontWeight: "bold" }} align="right">Selected Size</TableCell>}
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            <TableRow >
                                                                                <TableCell component="th" scope="row">
                                                                                    {item?.category !== "" ? item?.category : "---"}
                                                                                </TableCell>
                                                                                <TableCell align="center">
                                                                                    {item?.name}
                                                                                </TableCell>
                                                                                <TableCell align="center">
                                                                                    {item?.quantity}
                                                                                </TableCell>
                                                                                <TableCell align="right">
                                                                                    {item?.finalPrice}-AED
                                                                                </TableCell>
                                                                                {item?.selectedItemSize && <TableCell align="right">
                                                                                    {item?.selectedItemSize?.price}-AED <br></br>
                                                                                    {item?.selectedItemSize?.name}
                                                                                </TableCell>}
                                                                            </TableRow>
                                                                        </TableBody>
                                                                    </>
                                                                ))}

                                                            </Table>
                                                            {resultArray?.length > 0 && <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell style={{ fontWeight: "bold" }}>Pouches Detail</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">
                                                                            {resultArray?.map((x, index) => <p key={index}>{x}</p>)}
                                                                        </TableCell>

                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>}
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </>
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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
    React.useEffect(() => {
        dispatch(GetAllOrder(Userdata?.clientToken));
    }, []);
    return (
        <TableContainer component={Paper}>
            {isLoading ? <Paper sx={{ width: '100%', mb: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <InfinitySpin width="200" color="#D78809" />
                </div>
            </Paper>
                :
                <>
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                        <AnimateButton>
                            <Button
                                style={{ margin: '12px' }}
                                variant="contained"
                                color="primary"
                                sx={{ boxShadow: 'none' }}
                            >
                                Export
                            </Button>
                        </AnimateButton>
                        <AnimateButton>
                            <Button
                                style={{ margin: '12px' }}
                                variant="contained"
                                color="primary"
                                sx={{ boxShadow: 'none' }}
                            >
                                Print
                            </Button>
                        </AnimateButton>
                        <AnimateButton>
                            <Button
                                style={{ margin: '12px' }}
                                variant="contained"
                                color="primary"
                                sx={{ boxShadow: 'none' }}
                            >
                                Generate Cooking Batch
                            </Button>
                        </AnimateButton>
                    </div>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#D78809" }}>
                                <TableCell />
                                <TableCell style={{ color: "#fff" }}>Order No.</TableCell>
                                <TableCell style={{ color: "#fff" }}>Order Date / Time</TableCell>
                                <TableCell style={{ color: "#fff" }}>User Name</TableCell>
                                <TableCell style={{ color: "#fff" }} align="right">Order Total (AED)</TableCell>
                                <TableCell style={{ color: "#fff" }} align="right">Delivery Date</TableCell>
                                <TableCell style={{ color: "#fff" }} align="center" >Delivery Location</TableCell>
                                {/* <TableCell style={{ color: "#fff" }} align="center">Actions</TableCell> */}
                                <TableCell style={{ color: "#fff" }} align="center">Cooked</TableCell>
                                <TableCell style={{ color: "#fff" }} align="center">Batch No.</TableCell>
                                <TableCell style={{ color: "#fff" }} align="center">Delivered</TableCell>
                                <TableCell style={{ color: "#fff" }} align="right">Add to Cooking Batch</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataOrders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                                <Row key={index} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </>
            }
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={dataOrders?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </TableContainer>
    );
}