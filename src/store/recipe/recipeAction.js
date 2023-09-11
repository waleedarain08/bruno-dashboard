// action - state management
import * as actionTypes from './recipeType';
import { Get } from '../../helpers/apicalls/apicalls';

export const GetAllRecipes = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading });
    Get(`recipe/`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessRecipe,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedRecipe });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedRecipe });
      });
  };
};
