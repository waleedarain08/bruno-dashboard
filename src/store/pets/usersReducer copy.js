// action - state management
import * as actionTypes from './petsType';

export const initialState = {
  isLoading: false,
  data: []
};

// ==============================|| UsersReducer REDUCER ||============================== //

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoading:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SuccessUsers:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case actionTypes.FailedUsers:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default UsersReducer;
