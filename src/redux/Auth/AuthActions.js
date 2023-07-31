import * as actionTypes from "./AuthTypes";
import { Post } from "../../helpers/apicalls/apicalls";

export const Login_Action = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.IS_LOADING });
    Post("/api/user/login", data, false)
      .then(function (response) {
        console.log(response, "response");
        if (response) {
          dispatch({
            type: actionTypes.USER_DATA_SUCCESS,
            payload: response
          });
        } else {
          dispatch({ type: actionTypes.USER_DATA_FALED });
        }
      })
      .catch(function (error) {
        dispatch({ type: actionTypes.USER_DATA_FALED });
      });
  };
};

export const SignUp_Action = (data, navigate) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.IS_LOADING });
    Post("/auth/signup", data, false)
      .then(function (response) {
        console.log(response, "SignUp_Action");
        if (response) {
          dispatch({
            type: actionTypes.SIGNUP_USER_SUCCESS,
            payload: response
          });
          navigate("/");
        } else {
          dispatch({ type: actionTypes.SIGNUP_USER_FALED });
        }
      })
      .catch(function (error) {
        if (error?.response?.data?.statusCode === 400) {
          dispatch({ type: actionTypes.SIGNUP_USER_FALED });
        } else {
          dispatch({ type: actionTypes.SIGNUP_USER_FALED });
        }
      });
  };
};
