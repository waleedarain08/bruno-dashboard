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
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetAllCookingSheet } from 'store/cookingSheet/cookingSheetAction';
import TablePagination from '@mui/material/TablePagination';
// import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DeleteBatch, updateToBatch } from 'store/batch/batchTypeAction';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SearchFeild from 'components/searchFeild';

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
  const [Cooked, setCooked] = React.useState(null);
  const [snackOpen, setsnackOpen] = React.useState(false);
  const navigate = useNavigate();
  const [FiltredData, setFiltredData] = React.useState([]);
  const { state } = useLocation();
  const [value, setValue] = React.useState('');
  console.log(FiltredData, "FiltredData")


  useEffect(() => {
    if (state?.data) {
      setsnackOpen(true);
    }
  }, [state]);

  React.useEffect(() => {
    if (value !== "") {
      const filteredData = allData?.data?.filter(item => {

        return item?.batchNumber?.toLowerCase()?.includes(value?.toLowerCase()) ||
          item?.orderCount?.toString()?.toLowerCase()?.includes(value?.toLowerCase()) ||
          item?.totalAmountSum.toString()?.toLowerCase()?.includes(value?.toLowerCase()) ||
          moment(item?.createdOnDate).format('DD MMM YYYY, h:mm a')?.toLowerCase()?.includes(value?.toLowerCase())
      });
      setFiltredData(filteredData);
    }
    else {
      setFiltredData(allData?.data);
    }
  }, [allData,value]);


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

  const handleChange = (id, event) => {
    let data = {
      isCooked: event.target.value
    };
    dispatch(updateToBatch(id, data, Userdata?.clientToken));
    setCooked(event.target.value);
  };

  const handleClosee = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackOpen} autoHideDuration={6000} onClose={handleClosee}>
        <Alert onClose={handleClosee} severity="success" sx={{ width: '100%' }}>
          Successfully updated the value.
        </Alert>
      </Snackbar>
      {isLoading ? (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <InfinitySpin width="200" color="#D78809" />
          </div>
        </Paper>
      ) : (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer component={Paper}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: "5px 0px 5px 0px" }}>
              <SearchFeild setValue={setValue} value={value} />
            </div>
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
                {FiltredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => {
                  const givenDate = moment(row?.createdOnDate);
                  const futureDate = givenDate.add(30, 'days');
                  const formattedFutureDate = futureDate.format('DD MMM YYYY');
                  return (
                    <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <StyledTableCell component="th" align="center" scope="row">
                        {row?.batchNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">{moment(row?.createdOnDate).format('DD MMM YYYY')}</StyledTableCell>
                      <StyledTableCell align="center">{formattedFutureDate}</StyledTableCell>
                      <StyledTableCell align="center">{row?.orderCount}</StyledTableCell>
                      <StyledTableCell align="center">{row?.totalAmountSum}-AED</StyledTableCell>
                      <StyledTableCell align="center">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <InputLabel id="demo-select-small-label">Status</InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={Cooked === null ? row?.isCooked : Cooked}
                            label="Status"
                            onChange={(e) => handleChange(row?._id, e)}
                          >
                            <MenuItem value={false}>Process</MenuItem>
                            <MenuItem value={true}>Completed </MenuItem>
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">
                        <AnimateButton>
                          <Button
                            onClick={() =>
                              navigate('/cooking-sheet-template', {
                                state: row
                              })
                            }
                            style={{ margin: '12px' }}
                            variant="contained"
                            color="primary"
                            sx={{ boxShadow: 'none' }}
                          >
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
                          <Button onClick={() =>
                            navigate("/cooking-sheet/batch-lable", {
                              state: row
                            })
                          } style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
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
              count={FiltredData?.length}
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
