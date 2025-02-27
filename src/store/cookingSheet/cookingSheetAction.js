// action - state management
import * as actionTypes from './cookingSheetType';
import { Get } from '../../helpers/apicalls/apicalls';

export const GetAllCookingSheet = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingCookingSheet });
    Get(`order-batch/?page=1&count=100000`, data)
      .then(function (response) {
        console.log(response,"response");
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessCookingSheet,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedCookingSheet });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedCookingSheet });
      });
  };
};

export const GetDeliveryReport = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingDeliveryReport });
    Get(`order/cooked`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessDeliveryReport,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedDeliveryReport });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedDeliveryReport });
      });
  };
};

export const GetIngredientSum = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingIngredientSum });
    Get(`order/ingredient-sum`, data)
      .then(function (response) {
        console.log(response, "response")
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessIngredientSum,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedIngredientSum });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedIngredientSum });
      });
  };
};