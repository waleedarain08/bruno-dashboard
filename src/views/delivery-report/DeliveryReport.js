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
// import { useNavigate } from 'react-router-dom';
import {
    Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetAllCookingSheet } from 'store/cookingSheet/cookingSheetAction';

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
    const Userdata = useSelector((state) => state.AuthReducer.data);
    const allData = useSelector((state) => state.CookingSheetReducer.cookingSheetData);
    const isLoading = useSelector((state) => state.CookingSheetReducer.isLoadingcookingSheet);
    console.log(allData, "allData");


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllCookingSheet(Userdata?.clientToken));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {isLoading ? (
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <InfinitySpin width="200" color="#D78809" />
                    </div>
                </Paper>
            ) : (
                <Paper sx={{ width: '100%', mb: 2 }}>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: "#D78809" }}>
                                    <TableCell style={{ color: "#fff" }} align="center">Batch Ref.</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="center">Order No.</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="center">Customer Name</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="center">City</TableCell>
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
                                            {row._id.substr(row._id.length - 5)}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">N/A</StyledTableCell>
                                        <StyledTableCell align="center">11:02 AM </StyledTableCell>
                                        <StyledTableCell align="center">23485</StyledTableCell>
                                        <StyledTableCell align="center">
                                            Ahmed Mushtaq
                                        </StyledTableCell>
                                        <StyledTableCell align="center">Milio</StyledTableCell>
                                        <StyledTableCell align="center">
                                            1
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            Mighty Chicken
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row?.totalAmount}
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
    );
};

export default DeliveryReport;
