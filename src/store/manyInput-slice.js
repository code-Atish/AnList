// src/features/year/yearSlice.js
import { createSlice } from '@reduxjs/toolkit';

const manyInputSlice = createSlice({
    name: 'MultipleInputs',
    initialState: {
        format: [],
        isFormatVisible: false,
        genre: [],
        isGenreVisible: false,
        searchGenre: '',
        name: '',
    },
    reducers: {
        modifySearchGenre: (state, action) => {
            state.searchGenre = action.payload;
        },

        modifyGenre: (state, action) => {
            state.genre = action.payload
        },
        modifyFormat: (state, action) => {
            state.format = action.payload
        },
        modifyName: (state, action) => {
            state.name = action.payload
        }

    },
});

export const {
    modifySearchGenre,
    modifyGenre,
    modifyFormat,
    modifyName
} = manyInputSlice.actions;

export default manyInputSlice.reducer;
