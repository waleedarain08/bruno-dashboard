// action - state management
import * as actionTypes from './authType';

export const initialState = {
  isLoading: false,
  data: null
};

// ==============================|| AuthReducer REDUCER ||============================== //

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.Loading:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SuccessLogin:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case actionTypes.FailedLogin:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoading: false,
        data: null
      };
    default:
      return state;
  }
};

export default AuthReducer;
