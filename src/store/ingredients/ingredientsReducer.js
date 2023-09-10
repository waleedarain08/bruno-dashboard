// action - state management
import * as actionTypes from './ingredientsType';

export const initialState = {
  isLoading: false,
  data: []
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

    default:
      return state;
  }
};

export default IngredientsReducer;
