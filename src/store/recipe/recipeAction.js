// action - state management
import * as actionTypes from './recipeType';
import { Delete, Get, Post, Put } from '../../helpers/apicalls/apicalls';

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

export const AddRecipe = (data, token, setLoading, onSuccess, isStandard, callAgain) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingAdd });
    Post(`recipe/`, data, token)
      .then(function (response) {
        console.log(response, 'response');
        if (response?.isSuccess) {
          setLoading(false);
          dispatch({
            type: actionTypes.SuccessRecipeAdd,
            payload: response?.data
          });
          if (isStandard) {
            let newData = data;
            newData.category = "standard recipe"
            callAgain(data);
          }
          else {
            onSuccess();
          }
        } else {
          dispatch({ type: actionTypes.FailedRecipeAdd });
          setLoading(false);
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        setLoading(false);
        dispatch({ type: actionTypes.FailedRecipeAdd });
      });
  };
};

export const DeleteRecipe = (id, token, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingDelete });
    Delete(`recipe/${id}`, token)
      .then(function (response) {
        console.log(response, 'response');
        if (response?.isSuccess) {
          onSuccess();
          dispatch({
            type: actionTypes.SuccessRecipeDelete,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedRecipeDelete });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedRecipeDelete });
      });
  };
};

export const EditRecipe = (id, data, token, setLoading, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingEdit });
    Put(`recipe/${id}`, data, token)
      .then(function (response) {
        console.log(response, 'response');
        if (response?.isSuccess) {
          onSuccess();
          setLoading(false);
          dispatch({
            type: actionTypes.SuccessRecipeEdit,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedRecipeEdit });
          setLoading(false);
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        setLoading(false);
        dispatch({ type: actionTypes.FailedRecipeEdit });
      });
  };
};
