import { combineReducers } from 'redux';
import AuthReducer from './auth/authReducer';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  AuthReducer: AuthReducer
});

export default reducer;
