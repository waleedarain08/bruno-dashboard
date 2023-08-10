// action - state management
import * as actionTypes from './petsType';
import { Get } from '../../helpers/apicalls/apicalls';

export const GetPets = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading });
    Get(`pet/?page=1&count=100000`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessPets,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedPets });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedPets });
      });
  };
};
