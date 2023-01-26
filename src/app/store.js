import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cryptoSlice from './cryptoSlice';
import newsSlice from './newsSlice';

const rootReducer = combineReducers({
  cryptoState: cryptoSlice,
  newsState: newsSlice,
});
export default configureStore({ reducer: rootReducer });
