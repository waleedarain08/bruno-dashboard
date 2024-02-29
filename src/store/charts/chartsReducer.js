// action - state management
import * as actionTypes from './chartsType';

export const initialState = {
  isLoadingCharts: false,
  chartsData: null
};

// ==============================|| AuthReducer REDUCER ||============================== //

const ChartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LoadingChart:
      return {
        ...state,
        isLoadingCharts: true
      };
    case actionTypes.SuccessChart:
      return {
        ...state,
        isLoadingCharts: false,
        chartsData: action.payload
      };
    case actionTypes.FailedChart:
      return {
        ...state,
        isLoadingCharts: false
      };

    default:
      return state;
  }
};

export default ChartsReducer;
