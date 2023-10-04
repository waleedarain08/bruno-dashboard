<<<<<<< HEAD
import React from 'react';
// material-ui
import { Typography } from '@mui/material';
=======
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
>>>>>>> feature/Recipe

// project imports
import MainCard from 'ui-component/cards/MainCard';

const PetsProfile = () => {
<<<<<<< HEAD
  return (
    <MainCard title="Sample Card">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>
    </MainCard>
=======
  const location = useLocation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const data = useSelector((state) => state.PetsReducer.data);
  const rows = data?.filter((i) => i?.user?._id === location?.state?._id);
  const isLoading = useSelector((state) => state.PetsReducer.isLoading);
  const dispatch = useDispatch();
  console.log(rows, 'rows');

  useEffect(() => {
    dispatch(GetPets(Userdata?.clientToken));
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
                <TableRow>
                  <TableCell>Picture</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Breed</TableCell>
                  <TableCell align="left">Born</TableCell>
                  <TableCell align="left">Feeding-Routine</TableCell>
                  <TableCell align="left">Primary</TableCell>
                  <TableCell align="left">Owner</TableCell>
                  <TableCell align="right">Current Weight</TableCell>
                </TableRow>
              </TableHead>
              {rows?.length > 0 ? (
                <TableBody>
                  {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Avatar alt="Remy Sharp" src={row?.media} />
                      </TableCell>
                      <TableCell align="left">{row?.name}</TableCell>
                      <TableCell align="left">{row?.breed}</TableCell>
                      <TableCell align="left">{moment(row?.bornOnDate).format('MMM Do YY')}</TableCell>
                      <TableCell align="left">{row?.feedingRoutine ? row?.feedingRoutine : 1} times per day</TableCell>
                      <TableCell align="left">{row?.isDefault ? <CheckCircleOutlineIcon /> : <CancelIcon />}</TableCell>
                      <TableCell align="left">{row?.user?.fullName}</TableCell>
                      <TableCell align="right">{row?.currentWeight} kg</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell colSpan={6} align="left">
                      No Record Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
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
>>>>>>> feature/Recipe
  );
};

export default PetsProfile;
