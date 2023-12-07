import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetAllCookingSheet } from 'store/cookingSheet/cookingSheetAction';
import TablePagination from '@mui/material/TablePagination';
// import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import { DeleteBatch } from 'store/batch/batchTypeAction';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D78809',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const CookingSheet = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.CookingSheetReducer.cookingSheetData);
  const isLoading = useSelector((state) => state.CookingSheetReducer.isLoadingcookingSheet);
  const isLoadingDeleteBatch = useSelector((state) => state.BatchReducer.isLoadingDeleteBatch);
  const navigate = useNavigate();

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

  const deleteFullBatch = (id) => {
    dispatch(DeleteBatch(id, Userdata?.clientToken, onSuccessBatch));
  };

  const onSuccessBatch = () => {
    dispatch(GetAllCookingSheet(Userdata?.clientToken));
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
            {/* <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} sx={{ width: '100%' }}>
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
                        </Box> */}
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Batch No.</StyledTableCell>
                  <StyledTableCell align="center">Production Date</StyledTableCell>
                  <StyledTableCell align="center">Expiry Date</StyledTableCell>
                  <StyledTableCell align="center">No. of Orders </StyledTableCell>
                  <StyledTableCell align="center">Total amount of Orders</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center">Cooking Sheet</StyledTableCell>
                  <StyledTableCell align="center">Edit</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                  <StyledTableCell align="center">Batch Label</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allData?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => {
                  const givenDate = moment(row?.createdOnDate);
                  const futureDate = givenDate.add(30, 'days');
                  const formattedFutureDate = futureDate.format('DD MMM YYYY');
                  return (
                    <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <StyledTableCell
                        onClick={() => navigate('/cooking-sheet-template')}
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                        component="th"
                        align="center"
                        scope="row"
                      >
                        {row?.batchNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">{moment(row?.createdOnDate).format('DD MMM YYYY')}</StyledTableCell>
                      <StyledTableCell align="center">{formattedFutureDate}</StyledTableCell>
                      <StyledTableCell align="center">{row?.orderCount}</StyledTableCell>
                      <StyledTableCell align="center">{row?.totalAmountSum}-AED</StyledTableCell>
                      <StyledTableCell align="center">{row?.isCooked ? 'Yes' : 'No'}</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">
                        <AnimateButton>
                          <Button style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                            Cooking Sheet
                          </Button>
                        </AnimateButton>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <AnimateButton>
                          <Button
                            onClick={() =>
                              navigate('/cooking-sheet/edit-batch', {
                                state: {
                                  batchNumber: row?.batchNumber,
                                  batch_id: row?._id
                                }
                              })
                            }
                            style={{ margin: '12px' }}
                            variant="contained"
                            color="primary"
                            sx={{ boxShadow: 'none' }}
                          >
                            Edit
                          </Button>
                        </AnimateButton>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <AnimateButton>
                          <Button
                            onClick={() => deleteFullBatch(row?._id)}
                            style={{ margin: '12px' }}
                            variant="contained"
                            color="primary"
                            sx={{ boxShadow: 'none' }}
                          >
                            {isLoadingDeleteBatch ? (
                              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <InfinitySpin width="40" color="#D78809" />
                              </div>
                            ) : (
                              'Delete'
                            )}
                          </Button>
                        </AnimateButton>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <AnimateButton>
                          <Button style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                            Batch Label
                          </Button>
                        </AnimateButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={allData?.data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default CookingSheet;
