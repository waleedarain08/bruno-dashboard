// action - state management
import * as actionTypes from './recipeType';

export const initialState = {
  isLoading: false,
  data: []
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

    default:
      return state;
  }
};

export default RecipeReducer;
