import { combineReducers } from 'redux';
import AuthReducer from './auth/authReducer';

// reducer import
import customizationReducer from './customizationReducer';
import UsersReducer from './users/usersReducer';
import PetsReducer from './pets/petsReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  AuthReducer: AuthReducer,
  UsersReducer: UsersReducer,
  PetsReducer: PetsReducer
});

export default reducer;
