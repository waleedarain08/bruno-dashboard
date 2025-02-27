// action - state management
import * as actionTypes from './batchType';
import { Post, Delete, Patch, Get } from '../../helpers/apicalls/apicalls';

export const ADDToBatch = (data, token, onSuccessBatch) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading_AddBatch });
    Post(`order-batch/`, data, token)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessAisLoading_AddBatch,
            payload: response?.data
          });
          onSuccessBatch();
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

export const updateToBatch = (id, data, token, onSuccessBatch) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading_UpdateBatch });
    Patch(`order-batch/${id}`, data, token)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessAisLoading_UpdateBatch,
            payload: response?.data
          });
          onSuccessBatch();
        } else {
          dispatch({ type: actionTypes.FailedAisLoading_UpdateBatch });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedAisLoading_UpdateBatch });
      });
  };
};

export const DeleteBatch = (data, token, onSuccessBatch) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading_DeleteBatch });
    Delete(`order-batch/${data}`, token)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessAisLoading_DeleteBatch,
            payload: response?.data
          });
          onSuccessBatch();
        } else {
          dispatch({ type: actionTypes.FailedAisLoading_DeleteBatch });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedAisLoading_DeleteBatch });
      });
  };
};

export const Batch_Ingredients = (id, token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading_Batch_Ingredients });
    Get(`order-batch/${id}/composition`, token)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessAisLoading_Batch_Ingredients,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedAisLoading_Batch_Ingredients });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedAisLoading_Batch_Ingredients });
      });
  };
};

export const Batch_Order_By_id = (id, token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading_Batch_Order_By_id });
    Get(`order-batch/${id}/orders`, token)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessAisLoading_Batch_Order_By_id,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedAisLoading_Batch_Order_By_id });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedAisLoading_Batch_Order_By_id });
      });
  };
};
