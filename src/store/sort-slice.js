// src/features/year/yearSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
    name: 'sortCriteria',
    initialState: {
        sortValue: undefined,
        sortText: 'Popular',
        isVisible: false,
    },
    reducers: {
        modifySortValue: (state, action) => {
            state.sortValue = action.payload;
        },
        modifySortText: (state, action) => {
            state.sortText = action.payload;
        },
        modifySortVisibility: (state, action) => {
            state.isVisible = action.payload;
        }

    },
});

export const { modifySortText, modifySortValue, modifySortVisibility } = sortSlice.actions;

export default sortSlice.reducer;
