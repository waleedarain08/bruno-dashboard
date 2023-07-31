import * as actionTypes from "./BrandsTypes";
import { Post, Get } from "../../helpers/apicalls/apicalls";

export const Get_Brands_By_Company = (data, token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.IS_LOADING });
    Post("/api/brand/companyId", data, token)
      .then(function (response) {
        if (response) {
          dispatch({
            type: actionTypes.BRAND_DATA_SUCCESS,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.BRAND_DATA_FALED });
        }
      })
      .catch(function (error) {
        dispatch({ type: actionTypes.BRAND_DATA_FALED });
      });
  };
};

export const Get_All_Brands = (token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.IS_LOADING });
    Get("/api/brand", token)
      .then(function (response) {
        if (response) {
          dispatch({
            type: actionTypes.BRAND_DATA_SUCCESS,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.BRAND_DATA_FALED });
        }
      })
      .catch(function (error) {
        dispatch({ type: actionTypes.BRAND_DATA_FALED });
      });
  };
};
