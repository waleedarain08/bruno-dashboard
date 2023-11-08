// action - state management
import * as actionTypes from './ordersType';

export const initialState = {
  isLoadingOrder: false,
  orderData: [],
  isLoadingOrderChange: false,
  orderDataChange: [],
  isLoadingLocation: false,
  LocationDataChange: [],
};

// ==============================|| OrderReducer REDUCER ||============================== //

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoadingOrder:
      return {
        ...state,
        isLoadingOrder: true
      };
    case actionTypes.SuccessOrder:
      return {
        ...state,
        isLoadingOrder: false,
        orderData: action.payload
      };
    case actionTypes.FailedOrder:
      return {
        ...state,
        isLoadingOrder: false
      };
    ///////////////////////////////////////////////////////////

    case actionTypes.isLoadingOrderChange:
      return {
        ...state,
        isLoadingOrderChange: true
      };
    case actionTypes.SuccessOrderChange:
      return {
        ...state,
        isLoadingOrderChange: false,
        orderDataChange: action.payload
      };
    case actionTypes.FailedOrderChange:
      return {
        ...state,
        isLoadingOrderChange: false
      };
    ///////////////////////////////////////////////////////////


    case actionTypes.isLoadingOrderLocation:
      return {
        ...state,
        isLoadingLocation: true
      };
    case actionTypes.SuccessOrderLocation:
      return {
        ...state,
        isLoadingLocation: false,
        LocationDataChange: action.payload
      };
    case actionTypes.FailedOrderLocation:
      return {
        ...state,
        isLoadingLocation: false
      };
    ///////////////////////////////////////////////////////////



    default:
      return state;
  }
};

export default OrderReducer;
