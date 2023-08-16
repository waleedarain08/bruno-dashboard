// action - state management
import * as actionTypes from './promosType';

export const initialState = {
  isLoading: false,
  data: []
};

// ==============================|| UsersReducer REDUCER ||============================== //

const PromosReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoading:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SuccessPromos:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case actionTypes.FailedPromos:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default PromosReducer;
