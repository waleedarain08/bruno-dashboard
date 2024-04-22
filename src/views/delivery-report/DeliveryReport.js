import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { InfinitySpin } from 'react-loader-spinner';
import Tooltip from '@mui/material/Tooltip';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import {
    Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetDeliveryReport } from 'store/cookingSheet/cookingSheetAction';
import { ViewOrderLocation } from 'store/orders/ordersAction';
import LocationModal from 'components/LocationModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




const DeliveryReport = () => {
    // const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [modalOpen, setModalOpen] = React.useState(false);
    const Userdata = useSelector((state) => state.AuthReducer.data);
    const allData = useSelector((state) => state.CookingSheetReducer.DeliveryReportData);
    const isLoading = useSelector((state) => state.CookingSheetReducer.isLoadingDeliveryReport);
    const LocationDataChange = useSelector((state) => state.OrderReducer.LocationDataChange);
    console.log(allData, "allData");


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetDeliveryReport(Userdata?.clientToken));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const ViewLocation = (id) => {
        console.log(id, "")
        dispatch(ViewOrderLocation(id, Userdata?.clientToken));
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Function to truncate string to a specified number of words
    function truncateString(str, maxWords) {
        const words = str.split('');

        if (words.length > maxWords) {
            const truncatedWords = words.slice(0, maxWords);
            return truncatedWords.join('') + '...';
        } else {
            return str;
        }
    }
    return (
        <>
            <Box sx={{ width: '100%' }}>
                {isLoading ? (
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <InfinitySpin width="200" color="#D78809" />
                        </div>
                    </Paper>
                ) : (
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <LocationModal open={modalOpen}
                            onClose={handleCloseModal}
                            location={LocationDataChange} />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "#D78809" }}>

                                        <TableCell style={{ color: "#fff" }} align="center">Order No.</TableCell>
                                        <TableCell style={{ color: "#fff" }} align="center">Customer Name</TableCell>

                                        <TableCell style={{ color: "#fff" }} align="center">Address</TableCell>
                                        <TableCell style={{ color: "#fff" }} align="center">Contact No.</TableCell>
                                        <TableCell style={{ color: "#fff" }} align="center">Total Weight</TableCell>
                                        <TableCell style={{ color: "#fff" }} align="center">Packaging Details</TableCell>
                                        <TableCell style={{ color: "#fff" }} align="center">Special Delivery Instructions</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) =>
                                        <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                            <StyledTableCell component="th" align="center" scope="row">
                                                {row?._id?.substr(row?._id?.length - 5)}
                                            </StyledTableCell>
                                            <StyledTableCell component="th" align="center" scope="row">
                                                {row?.user?.fullName}
                                            </StyledTableCell>

                                            <StyledTableCell align="center">
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
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row?.user?.phoneNumber}</StyledTableCell>
                                            <StyledTableCell align="center">{row?.orderWeight}</StyledTableCell>
                                            <StyledTableCell style={{ cursor: "pointer" }} align="center">
                                                {row?.orderItems?.recipes?.map((i) => {
                                                    let newpouchesDetail = row?.orderItems?.pouchesDetail && row?.orderItems?.pouchesDetail;
                                                    const content = row?.orderItems?.pouchesDetail && newpouchesDetail?.slice(2, -2);
                                                    const resultArray = row?.orderItems?.pouchesDetail && content?.split(/\\n|\|/);
                                                    console.log(i, "resultArray")
                                                    return <>
                                                        {resultArray?.map((t, l) => <Tooltip key={l} title={row?.orderItems?.pouchesDetail}>
                                                            <div><p >{truncateString(t, 20)}<br></br></p> </div>
                                                        </Tooltip>)}
                                                    </>
                                                })}
                                            </StyledTableCell>

                                            <StyledTableCell style={{ cursor: "pointer" }} align="center">
                                                {row?.orderItems?.recipes?.map((i, j) =>
                                                    <>
                                                        <Tooltip key={j} title={i?.instructions}><div><p>{truncateString(i?.instructions, 25)}<br></br></p></div></Tooltip>
                                                    </>
                                                )}
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={allData?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                )}
            </Box>
        </>

    );
};

export default DeliveryReport;
