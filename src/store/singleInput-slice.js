// src/features/year/yearSlice.js
import { createSlice } from '@reduxjs/toolkit';

const singleInputSlice = createSlice({
  name: 'singleInput',
  initialState: {
    year: undefined,
    isYearVisible: false,
    season: undefined,
    isSeasonVisible: false,
    status: undefined,
    isStatusVisible: false,
    source: undefined,
    isSourceVisible: false,
  },
  reducers: {
    modifyYear: (state, actions) => {
      state.year = state.year == actions.payload ? undefined : actions.payload;
    },

    modifyYearVisibility: (state, action) => {
      state.isYearVisible = action.payload;
    },

    modifySeason: (state, actions) => {
      state.season = state.season == actions.payload ? undefined : actions.payload;
    },

    modifySeasonVisibility: (state, action) => {
      state.isSeasonVisible = action.payload;
    },

    modifyStatus: (state, actions) => {
      state.status = state.status == actions.payload ? undefined : actions.payload;
    },

    modifyStatusVisibility: (state, action) => {
      state.isStatusVisible = action.payload;
    },
    modifySource: (state, actions) => {
      state.source = state.source == actions.payload ? undefined : actions.payload;
    },

    modifySourceVisibility: (state, action) => {
      state.isSourceVisible = action.payload;
    }
  },
});

export const {
  modifyYear,
  modifyYearVisibility,
  modifyStatus,
  modifyStatusVisibility,
  modifySeason,
  modifySeasonVisibility,
  modifySource,
  modifySourceVisibility

} = singleInputSlice.actions;

export default singleInputSlice.reducer;
