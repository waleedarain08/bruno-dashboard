import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment/moment';

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


import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetPromos } from 'store/promos/promosAction';
import { InfinitySpin } from 'react-loader-spinner';

 


// assets

// import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const PromoLoality = ({ ...others }) => {

  const location = useLocation();
 // const [page, setPage] = React.useState(0);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const data = useSelector((state) => state.PromosReducer.data);
  const rows = data?.filter((i) => i?.user?._id === location?.state?._id);
  const isLoading = useSelector((state) => state.PromosReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPromos(Userdata?.clientToken));
  }, []);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };


  //const data = useSelector((state) => state.AuthReducer.data);
  // const { setUser } = useContext(UserContext);
  const theme = useTheme();
  console.log(data, 'data');
  const scriptedRef = useScriptRef();
  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }

  // const rows = [
  //   createData('Frozen ', 40 , '23/10/2023','Delete'),
  //   createData('sandwich', 43, '23/10/2023', 'Delete'),
  //   createData('Eclair', 60, '23/10/2023', 'Delete'),
  //   createData('Cupcake', 43, '23/10/2023', 'Delete'),
  //   createData('Gingerbread', 39, '23/10/2023', 'Delete')
  // ];

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
                      setStatus({ success: true });
                      setSubmitting(false);
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
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                  try {
                    if (scriptedRef.current) {
                      setStatus({ success: true });
                      setSubmitting(false);
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
                        <DatePicker
                         />
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
                  <TableCell align="right"> <a href="javascript:;"> Delete </a> </TableCell>

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
