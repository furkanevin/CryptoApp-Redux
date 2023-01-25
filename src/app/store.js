import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cryptoSlice from './cryptoSlice';

const rootReducer = combineReducers({
  cryptoState: cryptoSlice,
});
export default configureStore({ reducer: rootReducer });
