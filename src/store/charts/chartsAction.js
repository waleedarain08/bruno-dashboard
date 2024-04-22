// action - state management
import * as actionTypes from './chartsType';
import { Get } from '../../helpers/apicalls/apicalls';

export const chatsApi = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LoadingChart });
    Get('order/report', data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessChart,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedChart });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedChart });
      });
  };
};

export const GrowthApi = (data, token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LoadingChartGrowth });
    Get(`order/growth?year=${data}`, token)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessChartGrowth,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedChartGrowth });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedChartGrowth });
      });
  };
};

export const TendingApi = (start, end, token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LoadingChartStartEnd });
    Get(`recipe/trending?startingDate=${start}&endingDate=${end}`, token)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.SuccessChartStartEnd,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.FailedChartStartEnd });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.FailedChartStartEnd });
      });
  };
};
