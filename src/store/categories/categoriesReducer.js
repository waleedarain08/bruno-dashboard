// action - state management
import * as actionTypes from './categoriesType';

export const initialState = {
  isLoading: false,
  data: [],
  isLoadingDelete: false,
  DeleteData: null,
  isLoadingSave: false,
  SaveData: [],
  EditIngData: [],
};

// ==============================|| UsersReducer REDUCER ||============================== //

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoading:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SuccessCategories:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case actionTypes.FailedCategories:
      return {
        ...state,
        isLoading: false
      };
    ///////////////////////////////////////////////////////////
    case actionTypes.isLoadingDelete:
      return {
        ...state,
        isLoadingDelete: true
      };
    case actionTypes.SuccessiCategorieDelete:
      return {
        ...state,
        isLoadingDelete: false,
        DeleteData: action.payload
      };

    case actionTypes.FailediCategorieDelete:
      return {
        ...state,
        isLoadingDelete: false
      };

    ///////////////////////////////////////////////////////////
    case actionTypes.isLoadingSave:
      return {
        ...state,
        isLoadingSave: true
      };
    case actionTypes.SuccessiCategorieSave:
      return {
        ...state,
        isLoadingSave: false,
        SaveData: action.payload
      };

    case actionTypes.FailediCategorieSave:
      return {
        ...state,
        isLoadingSave: false
      };

    ///////////////////////////////////////////////////////////
    case actionTypes.isLoadingEditIng:
      return {
        ...state,
        isLoadingSave: true
      };
    case actionTypes.SuccessiCategorieEditIng:
      return {
        ...state,
        isLoadingSave: false,
        EditIngData: action.payload
      };

    case actionTypes.FailediCategorieEditIng:
      return {
        ...state,
        isLoadingSave: false
      };

    default:
      return state;
  }
};

export default CategoryReducer;
