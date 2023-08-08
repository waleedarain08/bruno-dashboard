import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ==============================|| REDUX - MAIN STORE ||============================== //

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['AuthReducer']
};
const persistedReducer = persistReducer(persistConfig, reducer);
// const store = createStore(persistedReducer);

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
export { store, persistor };
