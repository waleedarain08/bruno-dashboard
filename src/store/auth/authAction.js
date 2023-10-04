// action - state management
import * as actionTypes from './authType';
import { Post, Get } from "../../helpers/apicalls/apicalls";

<<<<<<< HEAD
export const Loggin = (data, token) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.Loading });
        Post("login", data, token)
            .then(function (response) {
                if (response) {
                    dispatch({
                        type: actionTypes.SuccessLogin,
                        payload: response?.data
                    });
                } else {
                    dispatch({ type: actionTypes.FailedLogin });
                    alert(response.message);
                }
            })
            .catch(function (error) {
                dispatch({ type: actionTypes.FailedLogin });
            });
    };
=======
export const Login = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.Loading });
    Post('auth/login', data, false)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessLogin,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedLogin });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedLogin });
      });
  };
>>>>>>> feature/Recipe
};
