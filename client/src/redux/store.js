import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
/* ------------------------------------------------------ */
const reducer = combineReducers({ productsReducer });

const store = configureStore({
  reducer,
});

export default store;
