// action - state management
import * as actionTypes from './recipeType';
import { Delete, Get, Post, Put } from '../../helpers/apicalls/apicalls';

export const GetAllRecipes = (data,isAdmin=false) => {
  let url  = isAdmin?`recipe/adminRecipes/`:`recipe/`;
  console.log(url);
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading });
    Get(url, data)
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
    data.isVisible=true;
    console.log("dddddd",data);
    Post(`recipe/`, data, token)
      .then(function (response) {
        //console.log(response, 'response');
        if (response?.isSuccess) {
          if (isStandard) {
            let newData = data;
            newData.category = "Standard Recipes";
            newData.name = data.name + " ";
            newData.details = "Bruno's Kitchen";
            newData.weight = "";
            newData.sizes = [];
            //newData.ingredient = data.ingredient;
            //console.log("here again",newData);
            callAgain(newData);
          }
          else {
            onSuccess();
            setLoading(false);
            dispatch({
              type: actionTypes.SuccessRecipeAdd,
              payload: response?.data
            });

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
        //console.log(response, 'response');
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

export const EditRecipe = (id, data, token, setLoading, onSuccess, isStandard, callAgain) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingEdit });
    data.isVisible=true;
    console.log("dddddddd",data);
    Put(`recipe/${id}`, data, token)
      .then(function (response) {
        console.log(response, 'response');
        if (response?.isSuccess) {
          if (isStandard) {
            let newData = data;
            newData.name = data.name + " ";
            newData.details = "Bruno's Kitchen";
            newData.weight = "";
            newData.sizes = [];
            newData.category = "Standard Recipes";
            //newData.ingredient = [];
            console.log("newwwwww",newData);
            callAgain(newData);
          }
          else {
            onSuccess();
            setLoading(false);
            dispatch({
              type: actionTypes.SuccessRecipeEdit,
              payload: response?.data
            });
          }
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
