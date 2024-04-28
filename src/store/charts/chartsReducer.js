// action - state management
import * as actionTypes from './chartsType';

export const initialState = {
  isLoadingCharts: false,
  isLoadingChartGrowth: false,
  chartsData: null,
  chartGrowthData: null,
  isLoadingChartstart: false,
  chartstartData: null,
  isLoadingreport: false,
  reportData: []
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

    case actionTypes.LoadingChartGrowth:
      return {
        ...state,
        isLoadingChartGrowth: true
      };
    case actionTypes.SuccessChartGrowth:
      return {
        ...state,
        isLoadingChartGrowth: false,
        chartGrowthData: action.payload
      };
    case actionTypes.FailedChartGrowth:
      return {
        ...state,
        isLoadingChartGrowth: false
      };

    case actionTypes.LoadingChartStartEnd:
      return {
        ...state,
        isLoadingChartstart: true
      };
    case actionTypes.SuccessChartStartEnd:
      return {
        ...state,
        isLoadingChartstart: false,
        chartstartData: action.payload
      };
    case actionTypes.FailedChartStartEnd:
      return {
        ...state,
        isLoadingChartstart: false
      };
    ///
    case actionTypes.LoadingReport:
      return {
        ...state,
        isLoadingreport: true
      };
    case actionTypes.SuccessReport:
      return {
        ...state,
        isLoadingreport: false,
        reportData: action.payload
      };
    case actionTypes.FailedReport:
      return {
        ...state,
        isLoadingreport: false
      };
    case actionTypes.FailedReportEmpty:
      return {
        ...state,
        isLoadingreport: false,
        reportData: []
      };

    default:
      return state;
  }
};

export default ChartsReducer;
