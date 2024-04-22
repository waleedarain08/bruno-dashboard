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
// import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
// import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { GetAllCategories, DeleteCategories, SaveCategories, EditCategories } from 'store/categories/categoriesAction';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  border: '2px solid #D78809',
  boxShadow: 24,
  p: 4
};

const Categories = () => {
  //   const navigate = useNavigate();
  const [Name, setName] = React.useState("");
  const [Error, setError] = React.useState("");
  const [IsAdd, setIsAdd] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [Delete_Id, setDelete_Id] = React.useState(null);
  const navigate = useNavigate();
  const handleOpen = (Name) => {
    setOpen(true);
    setError("");
    setIsAdd(Name);
    if (Name === "Add") {
      setDelete_Id(null);
      setName("");
    }
  };

  const handleCloseDelete = () => setOpenDelete(!openDelete);
  const handleClose = () => setOpen(false);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.CategoryReducer.data);
  // CategoryReducer
  const rows = allData?.filter((i) => i?.isGuest !== true);

  const isLoading = useSelector((state) => state.CategoryReducer.isLoading);
  const isLoadingDelete = useSelector((state) => state.CategoryReducer.isLoadingDelete);
  const isLoadingSave = useSelector((state) => state.CategoryReducer.isLoadingSave);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllCategories(Userdata?.clientToken));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onDeleteClick = (id) => {
    setOpenDelete(true)
    setDelete_Id(id);
  }
  const onDelete = () => {
    dispatch(DeleteCategories(Userdata?.clientToken, Delete_Id, onSuccess));
  }
  const onSuccess = () => {
    dispatch(GetAllCategories(Userdata?.clientToken));
    setOpenDelete(false);
    setOpen(false);
  }
  const onSave = () => {
    if (Name !== "") {
      setError("")
      let data = {
        name: Name,
      }
      if (IsAdd === "Add") {
        dispatch(SaveCategories(data, Userdata?.clientToken, onSuccess));
      }
      else {
        dispatch(EditCategories(Delete_Id, data, Userdata?.clientToken, onSuccess));
      }
    } else {
      setError("All Feilds Required")
    }
  }

  const onEditClick = (data) => {
    setDelete_Id(data?._id);
    setName(data?.name);
    handleOpen("Edit");
  }

  return (
    <>

      <Box sx={{ width: '100%' }}>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography style={{ textAlign: 'center', paddingBottom: 20 }} variant="h4" component="h2">
              {IsAdd} Category
            </Typography>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7, paddingBottom: 6 }} sx={{ width: '100%' }}>
              <TextField value={Name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" />
            </Box>
            {Error !== "" && <Typography style={{ color: "red", textAlign: "center" }} id="modal-modal-title" variant="h6" component="h2">
              {Error}
            </Typography>}
            <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
              <AnimateButton>
                <Button
                  style={{ margin: 4 }}
                  disableElevation
                  size="large"
                  type="submit"
                  disabled={isLoadingSave}
                  variant="contained"
                  color="secondary"
                  onClick={() => onSave()}
                >
                  {isLoadingSave ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}>
                    <InfinitySpin width="50" height="20" color="#fff" />
                  </div> : "Save"}
                </Button>
              </AnimateButton>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
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
              Are you sure you want to delete this Category
            </Typography>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 1
            }}>
              <AnimateButton>
                <Button
                  onClick={handleCloseDelete}
                  style={{ margin: 4 }}
                  disableElevation
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </Button>
              </AnimateButton>
              <AnimateButton>
                <Button
                  style={{ margin: 4 }}
                  disableElevation
                  size="large"
                  type="submit"
                  disabled={isLoadingDelete}
                  variant="contained"
                  color="secondary"
                  onClick={() => onDelete()}
                >
                  {isLoadingDelete ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}>
                    <InfinitySpin width="50" height="20" color="#fff" />
                  </div> : "Delete"}
                </Button>
              </AnimateButton>
            </Box>

          </Box>
        </Modal>
        {isLoading ? (
          <Paper sx={{ width: '100%', mb: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <InfinitySpin width="200" color="#D78809" />
            </div>
          </Paper>
        ) : (
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} sx={{ width: '100%' }}>
              <AnimateButton>
                <Button onClick={() => handleOpen("Add")} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                  Add Category
                </Button>
              </AnimateButton>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate('/product-categories', { state: row?.name })} component="th" scope="row">
                        {row?.name}
                      </TableCell>
                      <TableCell align="right">
                        <BorderColorIcon onClick={() => onEditClick(row)} style={{ marginRight: 2, cursor: 'pointer' }} />
                        <DeleteIcon onClick={() => onDeleteClick(row?._id)} style={{ marginLeft: 2, cursor: 'pointer' }} />
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
    </>

  );
};

export default Categories;
