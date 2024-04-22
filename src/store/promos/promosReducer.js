// action - state management
import * as actionTypes from './promosType';

export const initialState = {
  isLoading: false,
  data: [],
  addLoading: false,
  addData: [],
  deleteLoading: false,
  deleteData: [],
  discountdata: [],
  discountLoading: false,
  updateDiscountData: [],
  updateDiscountLoading: false,
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
    case actionTypes.isAddLoading:
      return {
        ...state,
        addLoading: true
      };
    case actionTypes.AddSuccessPromos:
      return {
        ...state,
        addLoading: false,
        addData: action.payload
      };
    case actionTypes.AddFailedPromos:
      return {
        ...state,
        addLoading: false
      };

    case actionTypes.isDeleteLoading:
      return {
        ...state,
        deleteLoading: true
      };
    case actionTypes.DeleteSuccessPromos:
      return {
        ...state,
        deleteLoading: false,
        deleteData: action.payload
      };
    case actionTypes.DeleteFailedPromos:
      return {
        ...state,
        deleteLoading: false
      };
    /////////////////////////////////////////////////////////////
    case actionTypes.isDiscountLoading:
      return {
        ...state,
        discountLoading: true
      };
    case actionTypes.DiscountSuccess:
      return {
        ...state,
        discountLoading: false,
        discountdata: action.payload
      };
    case actionTypes.DiscountFailed:
      return {
        ...state,
        discountLoading: false
      };
         /////////////////////////////////////////////////////////////
    case actionTypes.isUpdateDiscountLoading:
      return {
        ...state,
        updateDiscountLoading: true
      };
    case actionTypes.UpdateDiscountSuccess:
      return {
        ...state,
        updateDiscountLoading: false,
        updateDiscountData: action.payload
      };
    case actionTypes.UpdateDiscountFailed:
      return {
        ...state,
        updateDiscountLoading: false
      };

    default:
      return state;
  }
};

export default PromosReducer;
