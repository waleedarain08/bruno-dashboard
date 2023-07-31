import * as actionTypes from "./AuthTypes";

const INTIAL_STATE = {
  userData: null,
  isLoading: false
};
const AuthReducer = (state = INTIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    // Login Reducer
    case actionTypes.USER_DATA_SUCCESS:
      return {
        ...state,
        userData: payload,
        isLoading: false
      };
    case actionTypes.USER_DATA_FALED:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        userData: payload,
        isLoading: false
      };
    case actionTypes.SIGNUP_USER_FALED:
      return {
        ...state,
        isLoading: false
      };

    case "USER_LOGOUT":
      return {
        ...state,
        userData: null,
        isLoading: false
      };

    default:
      return state;
  }
};

export default AuthReducer;
