// action - state management
import * as actionTypes from './petsType';

export const initialState = {
  isLoading: false,
  data: []
};

// ==============================|| UsersReducer REDUCER ||============================== //

const PetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoading:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SuccessPets:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case actionTypes.FailedPets:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default PetsReducer;