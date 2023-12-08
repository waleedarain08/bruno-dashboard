// action - state management
import * as actionTypes from './batchType';

export const initialState = {
  isLoadingAddBatch: false,
  AddBatchData: [],
  isLoadingDeleteBatch: false,
  DeleteBatchData: [],
  isLoadingUpdateBatch: false,
  UpdateBatchData: [],
  isLoadingBatchIngredients: false,
  BatchIngredientsData: [],
  isLoadingBatchOrderById: false,
  BatchOrderByIdData: []
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
    ///////////////////////////////////////////////////////////
    case actionTypes.isLoading_Batch_Ingredients:
      return {
        ...state,
        isLoadingBatchIngredients: true
      };
    case actionTypes.SuccessAisLoading_Batch_Ingredients:
      return {
        ...state,
        isLoadingBatchIngredients: false,
        BatchIngredientsData: action.payload
      };
    case actionTypes.FailedAisLoading_Batch_Ingredients:
      return {
        ...state,
        isLoadingBatchIngredients: false
      };
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    case actionTypes.isLoading_Batch_Order_By_id:
      return {
        ...state,
        isLoadingBatchOrderById: true
      };
    case actionTypes.SuccessAisLoading_Batch_Order_By_id:
      return {
        ...state,
        isLoadingBatchOrderById: false,
        BatchOrderByIdData: action.payload
      };
    case actionTypes.FailedAisLoading_Batch_Order_By_id:
      return {
        ...state,
        isLoadingBatchOrderById: false
      };
    ///////////////////////////////////////////////////////////
    default:
      return state;
  }
};

export default BatchReducer;
