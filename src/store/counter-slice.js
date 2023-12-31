// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    page: 1,
  },
  reducers: {
    increment: (state) => {
      state.page += 1;
    },
    decrement: (state) => {
      state.page -= 1;
    },
  },
});

export const pageActions = pageSlice.actions;
export default pageSlice.reducer;
