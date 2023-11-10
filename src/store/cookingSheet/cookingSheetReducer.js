// action - state management
import * as actionTypes from './cookingSheetType';

export const initialState = {
  isLoadingcookingSheet: false,
  cookingSheetData: [],

};

// ==============================|| OrderReducer REDUCER ||============================== //

const CookingSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoadingCookingSheet:
      return {
        ...state,
        isLoadingcookingSheet: true
      };
    case actionTypes.SuccessCookingSheet:
      return {
        ...state,
        isLoadingcookingSheet: false,
        cookingSheetData: action.payload
      };
    case actionTypes.FailedCookingSheet:
      return {
        ...state,
        isLoadingcookingSheet: false
      };

    default:
      return state;
  }
};

export default CookingSheetReducer;
