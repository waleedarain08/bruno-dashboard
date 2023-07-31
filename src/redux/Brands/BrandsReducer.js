import * as actionTypes from "./BrandsTypes";

const INTIAL_STATE = {
  data: null,
  isLoading: false
};
const BrandsReducer = (state = INTIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    // Login Reducer
    case actionTypes.BRAND_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false
      };
    case actionTypes.BRAND_DATA_FALED:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default BrandsReducer;
