import * as actionTypes from "./UsersTypes";
import { Post, Get } from "../../helpers/apicalls/apicalls";

export const Add_User = (data, token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.IS_LOADING });
    Post("/api/user/register", data, token)
      .then(function (response) {
        if (response) {
          dispatch({
            type: actionTypes.Users_DATA_SUCCESS,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.Users_DATA_FALED });
        }
      })
      .catch(function (error) {
        dispatch({ type: actionTypes.Users_DATA_FALED });
      });
  };
};
