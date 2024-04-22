// action - state management
import * as actionTypes from './cookingSheetType';

export const initialState = {
  isLoadingcookingSheet: false,
  cookingSheetData: [],
  DeliveryReportData: [],
  isLoadingDeliveryReport: false,
  IngredientSumData: null,
  isLoadingIngredientSum: false
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
    ///////////////////////////////////////////////////////////
    case actionTypes.isLoadingDeliveryReport:
      return {
        ...state,
        isLoadingDeliveryReport: true
      };
    case actionTypes.SuccessDeliveryReport:
      return {
        ...state,
        isLoadingDeliveryReport: false,
        DeliveryReportData: action.payload
      };
    case actionTypes.FailedDeliveryReport:
      return {
        ...state,
        isLoadingDeliveryReport: false
      };
    ///////////////////////////////////////////////////////////
    case actionTypes.isLoadingIngredientSum:
      return {
        ...state,
        isLoadingIngredientSum: true
      };
    case actionTypes.SuccessIngredientSum:
      return {
        ...state,
        isLoadingIngredientSum: false,
        IngredientSumData: action.payload
      };
    case actionTypes.FailedIngredientSum:
      return {
        ...state,
        isLoadingIngredientSum: false
      };

    default:
      return state;
  }
};

export default CookingSheetReducer;
