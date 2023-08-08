// action - state management
import * as actionTypes from './authType';
import { Post } from '../../helpers/apicalls/apicalls';

export const Login = (data) => {
  console.log(data, 'data');
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
};
