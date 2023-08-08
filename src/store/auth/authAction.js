// action - state management
import * as actionTypes from './authType';
import { Post, Get } from "../../helpers/apicalls/apicalls";

export const Loggin = (data, token) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.Loading });
        Post("login", data, token)
            .then(function (response) {
                if (response) {
                    dispatch({
                        type: actionTypes.SuccessLogin,
                        payload: response?.data
                    });
                } else {
                    dispatch({ type: actionTypes.FailedLogin });
                    alert(response.message);
                }
            })
            .catch(function (error) {
                dispatch({ type: actionTypes.FailedLogin });
            });
    };
};
