// action - state management
import * as actionTypes from './promosType';
import { Get } from '../../helpers/apicalls/apicalls';

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
