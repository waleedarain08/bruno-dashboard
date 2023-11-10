// action - state management
import * as actionTypes from './cookingSheetType';
import { Get } from '../../helpers/apicalls/apicalls';

export const GetAllCookingSheet = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingCookingSheet });
    Get(`order/cooking-sheet`, data)
      .then(function (response) {
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





