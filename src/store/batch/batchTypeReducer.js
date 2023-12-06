// action - state management
import * as actionTypes from './batchType';

export const initialState = {
  isLoadingAddBatch: false,
  AddBatchData: [],

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
    default:
      return state;
  }
};

export default BatchReducer;
