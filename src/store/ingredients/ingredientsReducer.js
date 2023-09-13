// action - state management
import * as actionTypes from './ingredientsType';

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

const IngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoading:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SuccessiIngredients:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case actionTypes.FailediIngredients:
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
    case actionTypes.SuccessiIngredientDelete:
      return {
        ...state,
        isLoadingDelete: false,
        DeleteData: action.payload
      };

    case actionTypes.FailediIngredientDelete:
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
    case actionTypes.SuccessiIngredientSave:
      return {
        ...state,
        isLoadingSave: false,
        SaveData: action.payload
      };

    case actionTypes.FailediIngredientSave:
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
    case actionTypes.SuccessiIngredientEditIng:
      return {
        ...state,
        isLoadingSave: false,
        EditIngData: action.payload
      };

    case actionTypes.FailediIngredientEditIng:
      return {
        ...state,
        isLoadingSave: false
      };

    default:
      return state;
  }
};

export default IngredientsReducer;
