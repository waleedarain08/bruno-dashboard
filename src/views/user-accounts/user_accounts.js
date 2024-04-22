import React from 'react';
// material-ui
import { Typography } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InfinitySpin } from 'react-loader-spinner';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetUsers } from 'store/users/usersAction';
import SearchFeild from 'components/searchFeild';
import ExportUsers from './exportUsers';
// import { SET_MENU } from 'store/actions';


const UserAccounts = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [value, setValue] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setrows] = React.useState([]);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.UsersReducer.data);
  const newRows = allData?.filter((i) => i?.isGuest !== true);

  const isLoading = useSelector((state) => state.UsersReducer.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsers(Userdata?.clientToken));
  }, []);

  console.log(rows, "rows,rows")
  React.useEffect(() => {
    if (value !== "") {
      const filteredData = newRows?.filter(item => {
        return item?.fullName?.toLowerCase()?.includes(value?.toLowerCase());
      });
      setrows(filteredData);
    }
    else {
      setrows(newRows);
    }
  }, [allData, value]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const moveToPets = (e, row) => {
    e.preventDefault();
    navigate('/user-auccounts/pet-profile', { state: row });
  };

  // const onExport = () => {
  //   dispatch({ type: SET_MENU, opened: false });
  //   setTimeout(() => {
  //     window.print();
  //   }, 200);
  // }
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
          <div style={{ padding: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <SearchFeild setValue={setValue} value={value} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
              <AnimateButton>
                <ExportUsers data={rows} filename={"UserList"} />
                {/* <Button onClick={() => onExport()} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                  Export
                </Button> */}
              </AnimateButton>
              <AnimateButton>
                <Button onClick={() => window.print()} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                  Print
                </Button>
              </AnimateButton>

            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Pets</TableCell>
                  <TableCell align="center">Last Order</TableCell>
                  <TableCell align="center">Loyalty Points</TableCell>
                  <TableCell align="right">Block</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row?.fullName}
                    </TableCell>
                    <TableCell align="left">{row?.email}</TableCell>
                    <TableCell align="left">{row?.phoneNumber} </TableCell>
                    <TableCell align="left">{row?.email === "chef@brunokitchen.com" || row?.email === "admin@brunokitchen.com" ? "Admin" : "User"}</TableCell>
                    <TableCell align="left">
                      <Button onClick={(e) => moveToPets(e, row)} size="small" variant="contained" color="secondary">
                        View Pets
                      </Button>
                    </TableCell>
                    <TableCell align="center">{row?.lastOrderDate ? row?.lastOrderDate : "N/A"}</TableCell>
                    <TableCell align="center">{Math?.trunc(row?.availablePoints)}</TableCell>
                    <TableCell align="right">
                      <Switch value={row?.isBlock} color="warning" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={rows?.length}
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

export default UserAccounts;
