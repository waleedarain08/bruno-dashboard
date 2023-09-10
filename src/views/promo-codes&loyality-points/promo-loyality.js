import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment/moment';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  // Checkbox,
  // Divider,
  FormControl,
  // FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography
  // useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';


import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AddPromos, DeletePromo, GetPromos } from 'store/promos/promosAction';
import { InfinitySpin } from 'react-loader-spinner';

const PromoLoality = ({ ...others }) => {
  const [open, setOpen] = React.useState(false);
  const [PromoId, setPromoId] = React.useState(null);
  const handleOpen = (id) => {
    setOpen(true)
    setPromoId(id)
  };
  const handleClose = () => {
    setOpen(false)
    setPromoId(null)
  }
  const location = useLocation();
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const data = useSelector((state) => state.PromosReducer.data);
  const rows = data?.filter((i) => i?.user?._id === location?.state?._id);
  const isLoading = useSelector((state) => state.PromosReducer.isLoading);
  const addLoading = useSelector((state) => state.PromosReducer.addLoading);
  const deleteLoading = useSelector((state) => state.PromosReducer.deleteLoading);
  const [newDate, setDate] = React.useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetPromos(Userdata?.clientToken));
  }, []);

  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const onSuccess = () => {
    dispatch(GetPromos(Userdata?.clientToken));
    setOpen(false)
  }
  const onDelete = () => {
    dispatch(DeletePromo(PromoId, Userdata?.clientToken, onSuccess));
  }
  console.log(PromoId, "PromoId")

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                  <Box sx={{ mb: 2, mt: 2 }}>
                    <Typography variant="subtitle1">Set Loyalty Points Percentage Below</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Formik
                initialValues={{
                  Percentage: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  Percentage: Yup.string().required('Percentage is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                  try {
                    if (scriptedRef.current) {
                      alert("Percentage is set")
                      setStatus({ success: true });
                      setSubmitting(true);
                    }
                  } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.Percentage && errors.Percentage)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-email-login">Enter % below that you want to apply.</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="text"
                        value={values.Percentage}
                        name="Percentage"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Enter Discount %"
                        inputProps={{}}
                      />
                      {touched.Percentage && errors.Percentage && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.Percentage}
                        </FormHelperText>
                      )}
                    </FormControl>

                    {errors.submit && (
                      <Box sx={{ mt: 3 }}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          Save
                        </Button>
                      </AnimateButton>
                    </Box>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                  <Box sx={{ mb: 2, mt: 2 }}>
                    <Typography variant="subtitle1">Enter Promo Code Detail Below</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Formik
                initialValues={{
                  Percentage: '',
                  Code: '',
                  expiry: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  Code: Yup.string().max(255).required('InputFeild is required'),
                  Percentage: Yup.string().max(255).required('Percentage is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                  try {
                    if (scriptedRef.current) {
                      if (newDate !== null) {
                        let data = {
                          name: values?.Code,
                          discount: values.Percentage,
                          expireOnDate: newDate
                        }

                        dispatch(AddPromos(data, Userdata?.clientToken, onSuccess, resetForm))
                      }
                      else {
                        setErrors({ expiry: "Expiry feild is required" });
                      }

                    }
                  } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.Code && errors.Code)} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-email-login">Enter Promo Code</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="Code"
                        value={values.Code}
                        name="Code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Code Address / Username"
                        inputProps={{}}
                      />
                      {touched.Code && errors.Code && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.Code}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl
                      fullWidth
                      error={Boolean(touched.Percentage && errors.Percentage)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password-login">Enter % of discount</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-login"
                        type={'text'}
                        value={values.Percentage}
                        name="Percentage"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Percentage"
                        inputProps={{}}
                      />
                      {touched.Percentage && errors.Percentage && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.Percentage}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(touched.expiry && errors.expiry)} sx={{ ...theme.typography.customInput }}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker disablePast={true} type="date" name="expiry" onChange={(e) => setDate(moment(e).format('MM/DD/YYYY'))} />
                      </LocalizationProvider>
                      {touched.expiry && errors.expiry && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.expiry}
                        </FormHelperText>
                      )}
                    </FormControl>

                    {errors.submit && (
                      <Box sx={{ mt: 3 }}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting || addLoading}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          {addLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}>
                            <InfinitySpin width="50" height="20" color="#fff" />
                          </div> : "Save"}
                        </Button>
                      </AnimateButton>
                    </Box>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Grid sx={{ mt: 5 }} container spacing={2}>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item xs={12} container alignItems="center" justifyContent="center">
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1">List of all Promo Codes</Typography>
            </Box>
          </Grid>
        </Grid>
        {isLoading ? (
          <Paper sx={{ width: '100%', mb: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <InfinitySpin width="200" color="#D78809" />
            </div>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
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
                  Are you sure you want to delete this promocode
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
                      onClick={handleClose}
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
                      disabled={deleteLoading}
                      variant="contained"
                      color="secondary"
                      onClick={() => onDelete()}
                    >
                      {deleteLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}>
                        <InfinitySpin width="50" height="20" color="#fff" />
                      </div> : "Delete"}
                    </Button>
                  </AnimateButton>
                </Box>

              </Box>
            </Modal>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> Promo Code </TableCell>
                  <TableCell align="left">Percentage</TableCell>
                  <TableCell align="left">Expiry Date</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row?.discount} %</TableCell>
                    <TableCell align="left"> {moment(row?.expireOnDate).format('MMM Do YY')}</TableCell>
                    <TableCell align="right"><Chip label="Delete" variant="outlined" onClick={() => handleOpen(row?._id)} /> </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </>
  );
};

export default PromoLoality;
