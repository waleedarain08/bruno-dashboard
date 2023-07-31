import { combineReducers } from "redux";
import AuthReducer from "./Auth/AuthReducer";
import BrandsReducer from "./Brands/BrandsReducer";
import UsersReducer from "./Users/UsersReducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Brands: BrandsReducer,
  Users: UsersReducer
});

export default rootReducer;
