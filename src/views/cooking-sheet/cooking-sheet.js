import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';
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



const Cookingsheet = () => {
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
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} sx={{ width: '100%' }}>
        <AnimateButton>
          <Button
            onClick={() => navigate('/cooking-sheet/ingredients-portioning-sheet')}
            style={{ margin: '12px' }}
            variant="contained"
            color="primary"
            sx={{ boxShadow: 'none' }}
          >
            Ingredients Portioning Sheet
          </Button>
        </AnimateButton>
        <AnimateButton>
          <Button
            onClick={() => navigate('/cooking-sheet/ingredients-quantity-sheet')}
            style={{ margin: '12px' }}
            variant="contained"
            color="primary"
            sx={{ boxShadow: 'none' }}
          >
            Ingredients Quantity Sheet
          </Button>
        </AnimateButton>
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
                  <TableCell style={{ color: "#fff" }} align="center">Order Ref.</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Order Date</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Order Time</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">User Profile No.</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">User Name</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Pet Profile</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Recipe No.</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Recipe Name</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Total Delivery Amount (in Garms)</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Quantity (in days)</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Feeding Routine</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Packaging</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Delivery Date</TableCell>
                  <TableCell style={{ color: "#fff" }} align="center">Special Instructons</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) =>
                  <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell style={{ textDecoration: "underline", cursor: "pointer", borderRightWidth: 1, borderRightColor: "#D78809" }} component="th" align="center" scope="row">
                      110
                    </StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">N/A</StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">11:02 AM </StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">23485</StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">
                      Ahmed Mushtaq
                    </StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">Milio</StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">
                      1
                    </StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">
                      Mighty Chicken
                    </StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">
                      {row?.totalAmount}
                    </StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">
                      30
                    </StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">
                      2 times / day
                    </StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">
                      60 pouches x 175g
                    </StyledTableCell>
                    <StyledTableCell style={{ borderRightWidth: 1, borderRightColor: "#D78809" }} align="center">
                      Day 3
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Please call before delivery
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

export default Cookingsheet;
