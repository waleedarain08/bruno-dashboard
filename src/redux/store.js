import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../redux/rootReducer";
const persistConfig = {
  key: "authType",
  storage: storage,
  whitelist: ["Auth"] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };
