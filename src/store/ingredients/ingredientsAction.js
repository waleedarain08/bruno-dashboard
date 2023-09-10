// action - state management
import * as actionTypes from './ingredientsType';
import { Get } from '../../helpers/apicalls/apicalls';

export const GetAllIngredient = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading });
    Get(`ingredient/`, true)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessiIngredients,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailediIngredients });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailediIngredients });
      });
  };
};
