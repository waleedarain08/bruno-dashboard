import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeOrder, GetAllOrder } from 'store/orders/ordersAction';
import { InfinitySpin } from 'react-loader-spinner';


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const Userdata = useSelector((state) => state.AuthReducer.data);
    const isLoadingOrderChange = useSelector((state) => state.OrderReducer.isLoadingOrderChange);
    const orderDataChange = useSelector((state) => state.OrderReducer.orderDataChange);
    console.log(isLoadingOrderChange, orderDataChange)
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

    return (
        <React.Fragment>
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
                    {row.totalAmount}$
                </TableCell>
                <TableCell align="right">{row.deliveryDate}</TableCell>
                <TableCell align="center">----</TableCell>
                <TableCell align="right">
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <AnimateButton>
                            <Button
                                onClick={() => OrderCooked(row?._id, "isCooked")}
                                disabled={row?.isCooked}
                                style={{ margin: '12px' }}
                                variant="contained"
                                color="primary"
                                sx={{ boxShadow: 'none' }}
                            >
                                {isLoadingOrderChange ? <div style={{ marginRight: 25, marginTop: 5 }}><InfinitySpin width="30" color="#D78809" /></div> : !row?.isCooked ? "Order Cooked" : "Order Dispatch"}

                            </Button>
                        </AnimateButton>
                        <AnimateButton>
                            <Button
                                onClick={() => OrderCooked(row?._id, "isCompleted")}
                                disabled={row.isCompleted}
                                style={{ margin: '12px' }}
                                variant="contained"
                                color="primary"
                                sx={{ boxShadow: 'none' }}
                            >
                                {isLoadingOrderChange ? <div style={{ marginRight: 25, marginTop: 5 }}><InfinitySpin width="30" color="#D78809" /></div> : " Mark as Delivered"}

                            </Button>
                        </AnimateButton>
                    </div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                Order
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.orderItems.map((historyRow, index) => (
                                        <>
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.planType}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {historyRow.planTotal}$
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="h4" gutterBottom component="div">
                                                                Details
                                                            </Typography>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Category</TableCell>
                                                                        <TableCell align="center">Name</TableCell>
                                                                        <TableCell align="center">Quantity</TableCell>
                                                                        <TableCell align="right">Price ($)</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {historyRow?.recipes?.map((item, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell component="th" scope="row">
                                                                                {item.category}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {item.name}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {item.quantity}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {item.finalPrice}$
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </>

                                    ))}
                                </TableBody>

                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
}



export default function OrderList() {
    const dispatch = useDispatch();
    const Userdata = useSelector((state) => state.AuthReducer.data);
    const isLoading = useSelector((state) => state.OrderReducer.isLoadingOrder);
    const dataOrders = useSelector((state) => state.OrderReducer.orderData);
    console.log(dataOrders, "dataOrders")

    React.useEffect(() => {
        dispatch(GetAllOrder(Userdata?.clientToken));
    }, []);
    return (
        <TableContainer component={Paper}>
            {isLoading ? <Paper sx={{ width: '100%', mb: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <InfinitySpin width="200" color="#D78809" />
                </div>
            </Paper> : <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow style={{ backgroundColor: "#D78809" }}>
                        <TableCell />
                        <TableCell style={{ color: "#fff" }}>Order #</TableCell>
                        <TableCell style={{ color: "#fff" }} align="right">Total Amount</TableCell>
                        <TableCell style={{ color: "#fff" }} align="right" >Delivery Address</TableCell>
                        <TableCell style={{ color: "#fff" }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataOrders?.map((row, index) => (
                        <Row key={index} row={row} />
                    ))}
                </TableBody>
            </Table>}

        </TableContainer>
    );
}