// action - state management
import * as actionTypes from './batchType';

export const initialState = {
  isLoadingAddBatch: false,
  AddBatchData: [],
  isLoadingDeleteBatch: false,
  DeleteBatchData: [],
  isLoadingUpdateBatch: false,
  UpdateBatchData: []
};

// ==============================|| OrderReducer REDUCER ||============================== //

const BatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoading_AddBatch:
      return {
        ...state,
        isLoadingAddBatch: true
      };
    case actionTypes.SuccessAisLoading_AddBatch:
      return {
        ...state,
        isLoadingAddBatch: false,
        AddBatchData: action.payload
      };
    case actionTypes.FailedAisLoading_AddBatch:
      return {
        ...state,
        isLoadingAddBatch: false
      };
    ///////////////////////////////////////////////////////////
    case actionTypes.isLoading_DeleteBatch:
      return {
        ...state,
        isLoadingDeleteBatch: true
      };
    case actionTypes.SuccessAisLoading_DeleteBatch:
      return {
        ...state,
        isLoadingDeleteBatch: false,
        DeleteBatchData: action.payload
      };
    case actionTypes.FailedAisLoading_DeleteBatch:
      return {
        ...state,
        isLoadingDeleteBatch: false
      };
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    case actionTypes.isLoading_UpdateBatch:
      return {
        ...state,
        isLoadingUpdateBatch: true
      };
    case actionTypes.SuccessAisLoading_UpdateBatch:
      return {
        ...state,
        isLoadingUpdateBatch: false,
        UpdateBatchData: action.payload
      };
    case actionTypes.FailedAisLoading_UpdateBatch:
      return {
        ...state,
        isLoadingUpdateBatch: false
      };
    ///////////////////////////////////////////////////////////
    default:
      return state;
  }
};

export default BatchReducer;
