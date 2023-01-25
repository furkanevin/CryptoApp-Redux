import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coins: [],
  stats: [],
  initialized: false,
};

const cryptoSlice = createSlice({
  name: 'cryptoSlice',
  initialState,
  reducers: {
    setCryptos: (state, action) => {
      state.coins = action.payload.coins;
      state.stats = action.payload.stats;
      state.initialized = true;
    },
  },
});

export const { setCryptos } = cryptoSlice.actions;
export default cryptoSlice.reducer;
