import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authReducer';
import expenseReducer from './reducers/expenseReducer';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','expense'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  expense: expenseReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };
