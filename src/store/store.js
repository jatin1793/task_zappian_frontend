import authReducer from './reducers/authSlice.js'
import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer } from "redux-persist";
import { persistReducer } from 'redux-persist/dist/redux-persist.esm.js';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
