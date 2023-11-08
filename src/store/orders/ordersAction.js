// action - state management
import * as actionTypes from './ordersType';
import { Get, Put } from '../../helpers/apicalls/apicalls';

export const GetAllOrder = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingOrder });
    Get(`order/`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessOrder,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedOrder });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedOrder });
      });
  };
};

export const ChangeOrder = (id, data, token, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingOrderChange });
    Put(`order/${id}`, data, token)
      .then(function (response) {
        if (response?.isSuccess) {
          onSuccess();
          dispatch({
            type: actionTypes.SuccessOrderChange,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedOrderChange });
        }
      })
      .catch(function (error) {
        console.log(error, 'error');

        dispatch({ type: actionTypes.FailedOrderChange });
      });
  };
};

export const ViewOrderLocation = (id, data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingOrderLocation });
    Get(`user/location/${id}`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessOrderLocation,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedOrderLocation });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedOrderLocation });
      });
  };
};




