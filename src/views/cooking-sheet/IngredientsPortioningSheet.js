import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { InfinitySpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
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



const IngredientsPortioningSheet = () => {
    const navigate = useNavigate();
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
            <Box sx={{ width: '100%' }}>
                <div style={{ border: "1px solid #D78809", width: 30, display: "flex", justifyContent: "center", borderRadius: 50, margin: 5, padding: 2 }}>
                    <ArrowBackIcon onClick={() => navigate(-1)} style={{ color: "#D78809" }} />
                </div>
            </Box>
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
                                    <TableCell style={{ color: "#fff" }} align="center">Ingredient Ref.</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="center">Ingredient Name</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="center">Total Order Amount per ingredient (in GRAMS)</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="center">Cookinng continngency fector</TableCell>
                                    <TableCell style={{ color: "#fff" }} align="center">Min Inngredient Amount Needed</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) =>
                                    <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell component="th" align="center" scope="row">
                                            Meat-001
                                        </StyledTableCell>
                                        <StyledTableCell style={{}} align="center">Chiecken Breast</StyledTableCell>
                                        <StyledTableCell style={{}} align="center">12.2345.00 </StyledTableCell>
                                        <StyledTableCell style={{}} align="center">-12.00%</StyledTableCell>
                                        <StyledTableCell style={{}} align="center">
                                            20,081.25
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

export default IngredientsPortioningSheet;
