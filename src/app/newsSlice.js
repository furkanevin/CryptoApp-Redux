import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  news: [],
  initialized: false,
};

const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action?.payload?.value;
      state.initialized = true;
    },
  },
});

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;
