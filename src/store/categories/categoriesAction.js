// action - state management
import * as actionTypes from './categoriesType';
import { Get, Delete, Post, Patch } from '../../helpers/apicalls/apicalls';

export const GetAllCategories = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading });
    Get(`category/`, data)
      .then(function (response) {
        console.log(response, "response")
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessCategories,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedCategories });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedCategories });
      });
  };
};

export const DeleteCategories = (data, id, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingDelete });
    Delete(`category/${id}`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessiCategorieDelete,
            payload: response?.data
          });
          onSuccess();
        } else {
          dispatch({ type: actionTypes.FailediCategorieDelete });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailediCategorieDelete });
      });
  };
};

export const SaveCategories = (data, Token, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingSave });
    Post(`category/`, data, Token)
      .then(function (response) {
        console.log(response, "responsePost")
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessiCategorieSave,
            payload: response?.data
          });
          onSuccess();
        } else {
          dispatch({ type: actionTypes.FailediCategorieSave });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailediCategorieSave });
      });
  };
};

export const EditCategories = (id, data, token, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingEditIng });
    Patch(`category/${id}`, data, token)
      .then(function (response) {
        console.log(response, 'response');
        if (response?.isSuccess) {
          onSuccess();
          dispatch({
            type: actionTypes.SuccessiCategorieEditIng,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailediCategorieEditIng });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');

        dispatch({ type: actionTypes.FailediCategorieEditIng });
      });
  };
};

