import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment/moment';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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
import { AddPromos, DeletePromo, GetDiscount, GetPromos, UpdateDiscount } from 'store/promos/promosAction';
import { InfinitySpin } from 'react-loader-spinner';

const PromoLoality = ({ ...others }) => {
  const [open, setOpen] = React.useState(false);
  const [PromoId, setPromoId] = React.useState(null);
  const handleOpen = (id) => {
    setOpen(true);
    setPromoId(id);
  };
  const handleClose = () => {
    setOpen(false);
    setPromoId(null);
  };
  const Share = (code,discount) => {
    let message = `Please use promo code "${code}" to avail ${discount} AED discount at Bruno's Kitchen Mobile App. \n   https://brunos.kitchen`;
   // let url = `https://web.whatsapp.com/send`;
   // url += `&text=${encodeURI(message)}&app_absent=0`;
    window.open("https://api.whatsapp.com/send?text="+message);
  }
  const location = useLocation();
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const data = useSelector((state) => state.PromosReducer.data);
  const rows = data?.filter((i) => i?.user?._id === location?.state?._id);
  const isLoading = useSelector((state) => state.PromosReducer.isLoading);
  const addLoading = useSelector((state) => state.PromosReducer.addLoading);
  const deleteLoading = useSelector((state) => state.PromosReducer.deleteLoading);
  const dicountdata = useSelector((state) => state.PromosReducer.discountdata);
  const isDiscountLoading = useSelector((state) => state.PromosReducer.discountLoading);
  const updateDiscountLoading = useSelector((state) => state.PromosReducer.updateDiscountLoading);

  const [newDate, setDate] = React.useState(0);
  const [snackOpen, setsnackOpen] = React.useState(false);
  // const [OnMonth, setOnMonth] = React.useState([]);
  // const [Ratio, setRatio] = React.useState([]);
  // const [Redeem, setRedeem] = React.useState([]);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetPromos(Userdata?.clientToken));
    dispatch(GetDiscount(Userdata?.clientToken))
  }, []);

  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const onSuccess = () => {
    dispatch(GetPromos(Userdata?.clientToken));
    setOpen(false);
  };

  const handleClosee = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackOpen(false);
  };
  // const onSuccessUpated = () => {
  //   dispatch(GetDiscount(Userdata?.clientToken));
  // }
  const onDelete = () => {
    dispatch(DeletePromo(PromoId, Userdata?.clientToken, onSuccess));
  };


  let discountPercentageOn = dicountdata?.filter((i) => i?.name === "discountPercentageOnMonthlyPlan");
  let discountOnPointsRedeem = dicountdata?.filter((i) => i?.name === "discountOnPointsRedeem");
  let pointsToAEDRatio = dicountdata?.filter((i) => i?.name === "pointsToAEDRatio");
  let pointsLimit = dicountdata?.filter((i) => i?.name === "pointsLimit");
  let deliveryFeesInCity = dicountdata?.filter((i) => i?.name === "deliveryFeesInCity");
  let deliveryFeesOutside = dicountdata?.filter((i) => i?.name === "deliveryFeesOutside");




  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackOpen} autoHideDuration={6000} onClose={handleClosee}>
        <Alert onClose={handleClosee} severity="success" sx={{ width: '100%' }}>
          Successfully updated the value.
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        {/* <Grid item xs={4}>
          <Card>
            <CardContent>
              <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Enter % of discount per Loyalty Points</Typography>
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
                      alert('Percentage is set');
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
                      <InputLabel htmlFor="outlined-adornment-email-login">Enter amount in AED </InputLabel>
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
        </Grid> */}
        <Grid item xs={4}>
        <Card>
        {!isDiscountLoading && <CardContent>
              <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Delivery Charges</Typography>
                  </Box>
                </Grid>
                <Formik
                initialValues={{
                  DeliveryFeesInCity: parseFloat(deliveryFeesInCity?.[0]?.aggregate),
                  submit: null
                }}

                onSubmit={async (values, { setStatus, setSubmitting }) => {
                  try {
                    if (scriptedRef.current) {
                      let data = {
                        name: deliveryFeesInCity?.[0]?.name,
                        aggregate: parseFloat(values?.DeliveryFeesInCity),

                      };
                      dispatch(UpdateDiscount(data, Userdata?.clientToken, setsnackOpen));
                    }
                  } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      // setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.DeliveryFeesInCity && errors.DeliveryFeesInCity)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-email-login">Delivery Fees Inside Abu Dhabi</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="text"
                        value={values.DeliveryFeesInCity}
                        name="DeliveryFeesInCity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Delivery Fees Inside Abu Dhabi"
                        inputProps={{}}
                      />
                      {touched.DeliveryFeesInCity && errors.DeliveryFeesInCity && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.DeliveryFeesInCity}
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
                          disabled={updateDiscountLoading}
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
              </Grid>
        </CardContent>}

        {!isDiscountLoading && <CardContent>
              <Grid container direction="column" justifyContent="center" spacing={2}>
                {/* <Grid item xs={12} container alignItems="center" justifyContent="center">
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Delivery Charges</Typography>
                  </Box>
                </Grid> */}
                <Formik
                initialValues={{
                  DeliveryFeesOutside: parseFloat(deliveryFeesOutside?.[0]?.aggregate),
                  submit: null
                }}

                onSubmit={async (values, { setStatus, setSubmitting }) => {
                  try {
                    if (scriptedRef.current) {
                      let data = {
                        name: deliveryFeesOutside?.[0]?.name,
                        aggregate: parseFloat(values?.DeliveryFeesOutside),

                      };
                      dispatch(UpdateDiscount(data, Userdata?.clientToken, setsnackOpen));
                    }
                  } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      // setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.DeliveryFeesOutside && errors.DeliveryFeesOutside)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-email-login">Delivery Fees Outside Abu Dhabi</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="text"
                        value={values.DeliveryFeesOutside}
                        name="DeliveryFeesOutside"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Delivery Fees Outside Abu Dhabi"
                        inputProps={{}}
                      />
                      {touched.DeliveryFeesOutside && errors.DeliveryFeesOutside && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.DeliveryFeesOutside}
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
                          disabled={updateDiscountLoading}
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
              </Grid>
        </CardContent>}
        </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            {!isDiscountLoading && <CardContent>
              <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Discount</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Formik
                initialValues={{
                  DiscountPercentage: parseFloat(discountPercentageOn?.[0]?.aggregate),
                  submit: null
                }}

                onSubmit={async (values, { setStatus, setSubmitting }) => {
                  try {
                    if (scriptedRef.current) {
                      let data = {
                        name: discountPercentageOn?.[0]?.name,
                        aggregate: parseFloat(values?.DiscountPercentage),

                      };
                      dispatch(UpdateDiscount(data, Userdata?.clientToken, setsnackOpen));
                    }
                  } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      // setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {/* {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.DiscountPercentage && errors.DiscountPercentage)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-email-login">Discount Percentage On Monthly Plan</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="text"
                        value={values.DiscountPercentage}
                        name="DiscountPercentage"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Discount Percentage On Monthly Plan"
                        inputProps={{}}
                      />
                      {touched.DiscountPercentage && errors.DiscountPercentage && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.DiscountPercentage}
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
                          disabled={updateDiscountLoading}
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
                )} */}
              </Formik>
              <Formik
                initialValues={{
                  PointsRedeem: parseFloat(discountOnPointsRedeem?.[0]?.aggregate),
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  PointsRedeem: Yup.string().required('Points Redeem is required'),
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                  try {
                    if (scriptedRef.current) {
                      let data = {
                        name: discountOnPointsRedeem?.[0]?.name,
                        aggregate: parseFloat(values?.PointsRedeem),

                      };
                      dispatch(UpdateDiscount(data, Userdata?.clientToken, setsnackOpen));
                    }
                  } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      // setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl

                      fullWidth
                      error={Boolean(touched.PointsRedeem && errors.PointsRedeem)}
                      sx={{ ...theme.typography.customInput, mt: 2 }}
                    >
                      <InputLabel htmlFor="outlined-adornment-email-login">Points Awarded Ratio Per AED Spending</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="text"
                        value={values.PointsRedeem}
                        name="PointsRedeem"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Discount On Points Redeem"
                        inputProps={{}}
                      />
                      {touched.PointsRedeem && errors.PointsRedeem && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.PointsRedeem}
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
                          disabled={updateDiscountLoading}
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
              <Formik
                initialValues={{
                  PointsToAED: parseFloat(pointsToAEDRatio?.[0]?.aggregate),
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  PointsToAED: Yup.string().required('Points To AED is required')
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                  try {
                    if (scriptedRef.current) {
                      let data = {
                        name: pointsToAEDRatio?.[0]?.name,
                        aggregate: parseFloat(values?.PointsToAED),

                      };
                      dispatch(UpdateDiscount(data, Userdata?.clientToken, setsnackOpen));
                    }
                  } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      // setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.PointsToAED && errors.PointsToAED)}
                      sx={{ ...theme.typography.customInput, mt: 2 }}
                    >
                      <InputLabel htmlFor="outlined-adornment-email-login">1 Loyality Point To AED Conversion Ratio</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="text"
                        value={values.PointsToAED}
                        name="PointsToAED"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="1 Loyality Point To AED"
                        inputProps={{}}
                      />
                      {touched.PointsToAED && errors.PointsToAED && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.PointsToAED}
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
                          disabled={updateDiscountLoading}
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



              <Formik
                initialValues={{
                  pointsLimit: parseFloat(pointsLimit?.[0]?.aggregate),
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  pointsLimit: Yup.string().required('Points To AED is required')
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                  try {
                    if (scriptedRef.current) {
                      let data = {
                        name: pointsLimit?.[0]?.name,
                        aggregate: parseFloat(values?.pointsLimit),

                      };
                      dispatch(UpdateDiscount(data, Userdata?.clientToken, setsnackOpen));
                    }
                  } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      // setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.pointsLimit && errors.pointsLimit)}
                      sx={{ ...theme.typography.customInput, mt: 2 }}
                    >
                      <InputLabel htmlFor="outlined-adornment-email-login">Points Limit Percentage Per Order </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="text"
                        value={values.pointsLimit}
                        name="pointsLimit"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="1 Loyality Point To AED"
                        inputProps={{}}
                      />
                      {touched.pointsLimit && errors.pointsLimit && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.pointsLimit}
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
                          disabled={updateDiscountLoading}
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

            </CardContent>}

          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Enter Promo Code Detail Below</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Formik
                initialValues={{
                  Percentage: '',
                  Code: '',
                  expiry: '',
                  limit: 0,
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
                          discount: parseInt(values?.Percentage),
                          redemptionLimit: values?.limit,
                          expireOnDate: newDate
                        };

                        dispatch(AddPromos(data, Userdata?.clientToken, onSuccess, resetForm));
                      } else {
                        setErrors({ expiry: 'Expiry feild is required' });
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
                      <InputLabel htmlFor="outlined-adornment-password-login">Enter AED of discount</InputLabel>
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
                    <FormControl fullWidth error={Boolean(touched.limit && errors.limit)} sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-password-login">Max Usage Limit</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-login"
                        type={'number'}
                        value={values.limit}
                        name="limit"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Limit"
                        inputProps={{}}
                      />
                      {touched.limit && errors.limit && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.limit}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(touched.expiry && errors.expiry)} sx={{ ...theme.typography.customInput }}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          disablePast={true}
                          type="date"
                          name="expiry"
                          onChange={(e) => setDate(parseInt(moment(e).format('x')))}
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
                          disabled={isSubmitting || addLoading}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          {addLoading ? (
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginRight: 30
                              }}
                            >
                              <InfinitySpin width="50" height="20" color="#fff" />
                            </div>
                          ) : (
                            'Save'
                          )}
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
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #D78809',
                  boxShadow: 24,
                  p: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete this promocode
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 1
                  }}
                >
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
                      {deleteLoading ? (
                        <div
                          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginRight: 30 }}
                        >
                          <InfinitySpin width="50" height="20" color="#fff" />
                        </div>
                      ) : (
                        'Delete'
                      )}
                    </Button>
                  </AnimateButton>
                </Box>
              </Box>
            </Modal>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> Promo Code </TableCell>
                  <TableCell align="center">Discount Amount</TableCell>
                  <TableCell align="left">Expiry Date</TableCell>
                  <TableCell align="center">Max Usage Limit</TableCell>
                  <TableCell align="center">Current Usage</TableCell>
                  <TableCell align="left">Share</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row?.name}
                    </TableCell>
                    <TableCell align="center">{row?.discount} AED</TableCell>
                    <TableCell align="left"> {moment(row?.expireOnDate).format('MMM Do YYYY')}</TableCell>
                    <TableCell align="center"> {row?.redemptionLimit}</TableCell>
                    <TableCell align="center"> {row?.usage}</TableCell>
                    <TableCell align="left"><svg onClick={()=> Share(row?.name,row?.discount)} xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24"><path fill="#0cc144" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18c.21-.58.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"></path></svg></TableCell>
                    <TableCell align="right">
                      <Chip label="Delete" variant="outlined" onClick={() => handleOpen(row?._id)} />
                    </TableCell>
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
