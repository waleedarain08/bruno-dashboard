// action - state management
import * as actionTypes from './chartsType';
import { Get } from '../../helpers/apicalls/apicalls';

export const chatsApi = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LoadingChart });
    Get('order/report', data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessChart,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedChart });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedChart });
      });
  };
};
