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
import { DeleteIngredient, GetAllIngredient, SaveIngredient, EditIngredient } from 'store/ingredients/ingredientsAction';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// const grey = {
//   50: '#f6f8fa',
//   100: '#eaeef2',
//   200: '#d0d7de',
//   300: '#afb8c1',
//   400: '#8c959f',
//   500: '#6e7781',
//   600: '#57606a',
//   700: '#424a53',
//   800: '#32383f',
//   900: '#24292f'
// };
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
// const StyledTextarea = styled(TextareaAutosize)(
//   ({ theme }) => `
//     width: 320px;
//     font-family: IBM Plex Sans, sans-serif;
//     font-size: 0.875rem;
//     font-weight: 400;
//     line-height: 1.5;
//     padding: 12px;
//     border-radius: 12px 12px 0 12px;
//     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 2px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
//     &:hover {
//       border-color: #D78809};
//     }

//     &:focus {
//       border-color: #D78809;
//     }
//     // firefox
//     &:focus-visible {
//       outline: 0;
//     }
//   `
// );

const Ingredients = () => {
  //   const navigate = useNavigate();
  const [Name, setName] = React.useState("");
  const [Quantity, setQuantity] = React.useState(0);
  const [Remaing, setRemaing] = React.useState(0);
  const [Consmption, setConsmption] = React.useState(0);
  const [Description, setDescription] = React.useState("");
  const [IngredientReference, setIngredientReference] = React.useState("");
  const [Fector, setFector] = React.useState("");

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
      setQuantity(0);
      setRemaing(0);
      setConsmption(0);
      setDescription("");
      setIngredientReference("");
      setFector("");
    }
  };

  const handleCloseDelete = () => setOpenDelete(!openDelete);
  const handleClose = () => setOpen(false);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const allData = useSelector((state) => state.IngredientsReducer.data);
  const rows = allData?.filter((i) => i?.isGuest !== true);

  const isLoading = useSelector((state) => state.IngredientsReducer.isLoading);
  const isLoadingDelete = useSelector((state) => state.IngredientsReducer.isLoadingDelete);
  const isLoadingSave = useSelector((state) => state.IngredientsReducer.isLoadingSave);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllIngredient(Userdata?.clientToken));
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
    dispatch(DeleteIngredient(Userdata?.clientToken, Delete_Id, onSuccess));
  }
  const onSuccess = () => {
    dispatch(GetAllIngredient(Userdata?.clientToken));
    setOpenDelete(false);
    setOpen(false);
  }
  const onSave = () => {
    if (Name !== "" && Description !== "") {
      setError("")
      let data = {
        name: Name,
        description: Description,
        totalConsmption: Consmption,
        remaingQuantity: Remaing,
        lastAddedQuantity: Quantity,
        ingredientReference: IngredientReference,
        CookingContingencyFector: Fector
      }
      if (IsAdd === "Add") {
        dispatch(SaveIngredient(data, Userdata?.clientToken, onSuccess));
      }
      else {
        console.log(data, Delete_Id, "data")
        dispatch(EditIngredient(Delete_Id, data, Userdata?.clientToken, onSuccess));
      }
    } else {
      setError("All Feilds Required")
    }
  }
  const onEditClick = (data) => {
    setDelete_Id(data?.userId);
    setName(data?.name);
    setQuantity(data?.lastAddedQuantity);
    setRemaing(data?.remaingQuantity);
    setConsmption(data?.totalConsmption);
    setDescription(data?.description);
    setIngredientReference(data?.ingredientReference);
    setFector(data?.CookingContingencyFactor);
    handleOpen("Edit");
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <div style={{ border: "1px solid #D78809", width: 30, display: "flex", justifyContent: "center", borderRadius: 50, margin: 5, padding: 2 }}>
          <ArrowBackIcon onClick={() => navigate(-1)} style={{ color: "#D78809" }} />
        </div>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography style={{ textAlign: 'center', paddingBottom: 20 }} variant="h4" component="h2">
              {IsAdd} Ingredient
            </Typography>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7, paddingBottom: 6 }} sx={{ width: '100%' }}>
              <TextField value={Name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" />
              <TextField value={IngredientReference} onChange={(e) => setIngredientReference(e.target.value)} id="outlined-basic" label="Ingredient Reference" variant="outlined" />
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7, paddingBottom: 6 }} sx={{ width: '100%' }}>
              <TextField value={Fector} onChange={(e) => setFector(e.target.value)} id="outlined-basic" label="Cooking Contingency Fector" variant="outlined" />
              <TextField type={"number"} value={Quantity} onChange={(e) => setQuantity(e.target.value)} id="outlined-basic" label="Last Added Quantity" variant="outlined" />
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: 7 }} sx={{ width: '100%' }}>
              <TextField type={"number"} value={Remaing} onChange={(e) => setRemaing(e.target.value)} id="outlined-basic" label="Remaing Quantity" variant="outlined" />
              <TextField type={"number"} value={Consmption} onChange={(e) => setConsmption(e.target.value)} id="outlined-basic" label="Total Consmption" variant="outlined" />
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', margin: 7 }} sx={{ width: '100%' }}>
              {/* <StyledTextarea value={Description} onChange={(e) => setDescription(e.target.value)} maxRows={5} aria-label="maximum height" placeholder="Description" defaultValue="" /> */}
              <TextField sx={{ width: '100%' }} value={Description} onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="Description" variant="outlined" />
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
              Are you sure you want to delete this Ingredient
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
                  Add Ingredients
                </Button>
              </AnimateButton>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Ingredient Reference</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Stock Level</TableCell>
                    <TableCell align="left">Total Consmption</TableCell>
                    {/* <TableCell align="left">Last Added Quantity</TableCell> */}
                    <TableCell align="left">Ingredient Cooking Method</TableCell>
                    <TableCell align="left">Cooking Contingency Factor</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left">{row?.ingredientReference}</TableCell>
                      <TableCell component="th" scope="row">
                        {row?.name}
                      </TableCell>
                      <TableCell align="left">{row?.remaingQuantity}</TableCell>
                      <TableCell align="left">{row?.totalConsmption} </TableCell>
                      {/* <TableCell align="left">{row?.lastAddedQuantity}</TableCell> */}
                      <TableCell align="left">{row?.description}</TableCell>
                      <TableCell align="left">{row?.CookingContingencyFactor}</TableCell>

                      <TableCell>
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

export default Ingredients;
