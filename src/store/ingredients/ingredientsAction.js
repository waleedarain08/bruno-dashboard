// action - state management
import * as actionTypes from './ingredientsType';
import { Get, Delete, Post, Put } from '../../helpers/apicalls/apicalls';

export const GetAllIngredient = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading });
    Get(`ingredient/`, data)
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

export const DeleteIngredient = (data, id, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingDelete });
    Delete(`ingredient/${id}`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessiIngredientDelete,
            payload: response?.data
          });
          onSuccess();
        } else {
          dispatch({ type: actionTypes.FailediIngredientDelete });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailediIngredientDelete });
      });
  };
};

export const SaveIngredient = (data, Token, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingSave });
    Post(`ingredient/`, data, Token)
      .then(function (response) {
        console.log(response, "responsePost")
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessiIngredientSave,
            payload: response?.data
          });
          onSuccess();
        } else {
          dispatch({ type: actionTypes.FailediIngredientSave });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailediIngredientSave });
      });
  };
};

export const EditIngredient = (id, data, token, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingEditIng });
    Put(`ingredient/${id}/quantity`, data, token)
      .then(function (response) {
        console.log(response, 'response');
        if (response?.isSuccess) {
          onSuccess();
          dispatch({
            type: actionTypes.SuccessiIngredientEditIng,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailediIngredientEditIng });

          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');

        dispatch({ type: actionTypes.FailediIngredientEditIng });
      });
  };
};

