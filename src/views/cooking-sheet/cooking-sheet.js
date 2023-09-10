import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InfinitySpin } from 'react-loader-spinner';
import {
  Box,

  Typography
  // useMediaQuery
} from '@mui/material';
import Modal from '@mui/material/Modal';



// import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetUsers } from 'store/users/usersAction';



const Cookingsheet = () => {
  // const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  // const allData = useSelector((state) => state.UsersReducer.data);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #D78809',
              boxShadow: 24,
              p: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Discription
              </Typography>
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                padding: 1
              }}>
              </Box>

            </Box>
          </Modal>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Monday</TableCell>
                  <TableCell align="center">Tuesday</TableCell>
                  <TableCell align="center">Wednesday</TableCell>
                  <TableCell align="center">Thursday</TableCell>
                  <TableCell align="center">Friday</TableCell>
                  <TableCell align="center">Saturday</TableCell>
                  <TableCell align="center">Sunday</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell onClick={handleOpen} style={{ textDecoration: "underline", cursor: "pointer" }} component="th" align="center" scope="row">
                    Food
                  </TableCell>
                  <TableCell onClick={handleOpen} style={{ textDecoration: "underline", cursor: "pointer" }} align="center">Food</TableCell>
                  <TableCell onClick={handleOpen} style={{ textDecoration: "underline", cursor: "pointer" }} align="center">Food </TableCell>
                  <TableCell onClick={handleOpen} style={{ textDecoration: "underline", cursor: "pointer" }} align="center">Food</TableCell>
                  <TableCell onClick={handleOpen} style={{ textDecoration: "underline", cursor: "pointer" }} align="center">
                    Food
                  </TableCell>
                  <TableCell onClick={handleOpen} style={{ textDecoration: "underline", cursor: "pointer" }} align="center">Food</TableCell>
                  <TableCell onClick={handleOpen} style={{ textDecoration: "underline", cursor: "pointer" }} align="center">
                    Food
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={0}
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
