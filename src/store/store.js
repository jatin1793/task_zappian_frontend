// import authReducer from './reducers/authSlice.js'
// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, authReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });
const { configureStore } = require('@reduxjs/toolkit');
const { persistReducer } = require('redux-persist');
const storage = require('redux-persist/lib/storage').default;
const authReducer = require('./reducers/authSlice.js');

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

exports.store = configureStore({
  reducer: persistedReducer,
});

