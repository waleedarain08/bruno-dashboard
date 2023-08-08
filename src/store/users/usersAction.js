// action - state management
import * as actionTypes from './usersType';
import { Get } from '../../helpers/apicalls/apicalls';

export const GetUsers = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading });
    Get('user/users?count=10&page=1', data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessUsers,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedUsers });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedUsers });
      });
  };
};
