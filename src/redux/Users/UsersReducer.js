import * as actionTypes from "./UsersTypes";

const INTIAL_STATE = {
  data: null,
  isLoading: false
};
const UsersReducer = (state = INTIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    // Login Reducer
    case actionTypes.Users_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false
      };
    case actionTypes.Users_DATA_FALED:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default UsersReducer;
