// action - state management
import * as actionTypes from './recipeType';

export const initialState = {
  isLoading: false,
  data: [],
  isLoadingAdd: false,
  addData: [],
  isLoadingDelete: false,
  deleteData: [],
  isLoadingEdit: false,
  EditData: [],
};

// ==============================|| UsersReducer REDUCER ||============================== //

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoading:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SuccessRecipe:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case actionTypes.FailedRecipe:
      return {
        ...state,
        isLoading: false
      };
    //////////////////////////////////////////////////////////////
    case actionTypes.isLoadingAdd:
      return {
        ...state,
        isLoadingAdd: true
      };
    case actionTypes.SuccessRecipeAdd:
      return {
        ...state,
        isLoadingAdd: false,
        addData: action.payload
      };
    case actionTypes.FailedRecipeAdd:
      return {
        ...state,
        isLoadingAdd: false
      };

    ///////////////////////////////////////////////////////////////
    case actionTypes.isLoadingDelete:
      return {
        ...state,
        isLoadingDelete: true
      };
    case actionTypes.SuccessRecipeDelete:
      return {
        ...state,
        isLoadingDelete: false,
        deleteData: action.payload
      };
    case actionTypes.FailedRecipeDelete:
      return {
        ...state,
        isLoadingDelete: false
      };

    ///////////////////////////////////////////////////////////////
    case actionTypes.isLoadingEdit:
      return {
        ...state,
        isLoadingEdit: true
      };
    case actionTypes.SuccessRecipeEdit:
      return {
        ...state,
        isLoadingEdit: false,
        EditData: action.payload
      };
    case actionTypes.FailedRecipeEdit:
      return {
        ...state,
        isLoadingEdit: false
      };

    default:
      return state;
  }
};

export default RecipeReducer;
