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
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetAllCookingSheet } from 'store/cookingSheet/cookingSheetAction';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

const Cookingsheet = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.CookingSheetReducer.cookingSheetData);
  const isLoading = useSelector((state) => state.CookingSheetReducer.isLoadingcookingSheet);
  console.log(allData, 'allData');

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
                <TableRow style={{ backgroundColor: '#D78809' }}>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Order Ref.
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Order Date
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Order Time
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    User Profile No.
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    User Name
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Pet Profile
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Recipe No.
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Recipe Name
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Total Delivery Amount (in Garms)
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Quantity (in days)
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Feeding Routine
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Packaging
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Delivery Date
                  </TableCell>
                  <TableCell style={{ color: '#fff' }} align="center">
                    Special Instructons
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                  <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell component="th" align="center" scope="row">
                      {row?._id.substr(row?._id?.length - 5)}
                    </StyledTableCell>
                    <StyledTableCell align="center">{moment(row?.updatedOnDate).format('DD MMM YYYY')}</StyledTableCell>
                    <StyledTableCell align="center">{moment(row?.updatedOnDate).format('hh:mm a')}</StyledTableCell>
                    <StyledTableCell align="center">{row?.user?._id.substr(row?._id?.length - 5)}</StyledTableCell>
                    <StyledTableCell align="center">{row?.user?.fullName}</StyledTableCell>

                    <StyledTableCell align="center">
                      {row?.orderItems?.map((i, index) => (
                        <p key={index}>{i?.pet?.name}</p>
                      ))}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row?.orderItems?.map((i) => (
                        <>{i?.recipes?.map((u) => u?.recipeNo)}</>
                      ))}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row?.orderItems?.map((i) => (
                        <>
                          {i?.recipes?.map((u, x) => (
                            <p key={x}>
                              {u?.name}
                              <br></br>
                            </p>
                          ))}
                        </>
                      ))}
                    </StyledTableCell>

                    <StyledTableCell align="center">{row?.totalAmount}</StyledTableCell>

                    <StyledTableCell align="center">
                      {row?.orderItems?.map((i) => {
                        return (
                          <>
                            {i?.recipes?.map((u, index) => (
                              <p key={index}>{u?.totalDays}</p>
                            ))}
                          </>
                        );
                      })}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row?.orderItems?.map((i, index) => (
                        <p key={index}>{i?.pet?.feedingRoutine} times / day</p>
                      ))}
                    </StyledTableCell>

                    <StyledTableCell style={{ cursor: 'pointer' }} align="center">
                      {row?.orderItems?.map((i) => {
                        let newpouchesDetail = i?.pouchesDetail && i?.pouchesDetail;
                        const content = i?.pouchesDetail && newpouchesDetail?.slice(2, -2);
                        const resultArray = i?.pouchesDetail && content?.split(/\\n|\|/);
                        return (
                          <>
                            {resultArray?.map((t, l) => (
                              <Tooltip key={l} title={t}>
                                <div>
                                  <p>
                                    {truncateString(t, 20)}
                                    <br></br>
                                  </p>
                                </div>
                              </Tooltip>
                            ))}
                          </>
                        );
                      })}
                    </StyledTableCell>

                    <StyledTableCell align="center">{row?.deliveryDate}</StyledTableCell>

                    <StyledTableCell style={{ cursor: 'pointer' }} align="center">
                      {row?.orderItems?.map((i) => (
                        <>
                          {i?.recipes?.map((u, j) => (
                            <Tooltip key={j} title={u?.instructions}>
                              <div>
                                <p>
                                  {truncateString(u?.instructions, 25)}
                                  <br></br>
                                </p>
                              </div>
                            </Tooltip>
                          ))}
                        </>
                      ))}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
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
