<<<<<<< HEAD
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
=======
import React from 'react';
// material-ui
import { Typography } from '@mui/material';
>>>>>>> 941ab75 (Revert "chnages")

// project imports
import MainCard from 'ui-component/cards/MainCard';

const UserAccounts = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.UsersReducer.data);
  const rows = allData?.filter((i) => i?.isGuest !== true)

  const isLoading = useSelector((state) => state.UsersReducer.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsers(Userdata?.clientToken));
  }, []);

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
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Pets</TableCell>
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
                    <TableCell align="left">{row?.role}</TableCell>
                    <TableCell align="left">
                      <Button onClick={(e) => moveToPets(e, row)} size="small" variant="contained" color="secondary">
                        View Pets
                      </Button>
                    </TableCell>
                    <TableCell align="center">{row?.availablePoints}</TableCell>
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
=======
  return (
    <MainCard title="Sample Card">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>
    </MainCard>
>>>>>>> 941ab75 (Revert "chnages")
  );
};

export default UserAccounts;
