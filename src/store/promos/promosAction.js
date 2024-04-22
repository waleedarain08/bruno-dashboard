// action - state management
import * as actionTypes from './promosType';
import { Get, Post, Delete } from '../../helpers/apicalls/apicalls';

export const GetPromos = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading });
    Get(`promo-code/?page=1&count=100000`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessPromos,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedPromos });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedPromos });
      });
  };
};

export const AddPromos = (data, token, onSuccess, resetForm) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isAddLoading });
    Post(`promo-code`, data, token)
      .then(function (response) {
        console.log(response, "response")
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.AddSuccessPromos,
            payload: response?.data
          });
          resetForm()
          onSuccess()
        } else {
          dispatch({ type: actionTypes.AddFailedPromos });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.AddFailedPromos });
      });
  };
};

export const DeletePromo = (id, token, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isDeleteLoading });
    Delete(`promo-code/${id}`, token)
      .then(function (response) {
        console.log(response, "response")
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.DeleteSuccessPromos,
            payload: response?.data
          });
          onSuccess()
        } else {
          dispatch({ type: actionTypes.DeleteFailedPromos });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.DeleteFailedPromos });
      });
  };
};

export const GetDiscount = (token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isDiscountLoading });
    Get(`discount`, token)
      .then(function (response) {
        console.log(response,"GetDiscount")
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.DiscountSuccess,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.DiscountFailed });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.DiscountFailed });
      });
  };
};

export const UpdateDiscount = (data, token,setsnackOpen) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isUpdateDiscountLoading });
    Post(`discount`, data, token)
      .then(function (response) {
        console.log(response,"UpdateDiscount")
        if (response?.isSuccess) {
          setsnackOpen(true);
          dispatch({
            type: actionTypes.UpdateDiscountSuccess,
            payload: response?.data
          });

        } else {
          dispatch({ type: actionTypes.UpdateDiscountFailed });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.UpdateDiscountFailed });
      });
  };
};

