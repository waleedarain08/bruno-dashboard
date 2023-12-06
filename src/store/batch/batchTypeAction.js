// action - state management
import * as actionTypes from './batchType';
import { Post } from '../../helpers/apicalls/apicalls';

export const ADDToBatch = (data, token) => {
  console.log(data,"data")
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading_AddBatch });
    Post(`order-batch/`, data, token)
      .then(function (response) {
        console.log(response,"response");
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessAisLoading_AddBatch,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedAisLoading_AddBatch });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedAisLoading_AddBatch });
      });
  };
};
