import { createSlice } from '@reduxjs/toolkit';

const manyInputSlice = createSlice({
    name: 'MultipleInputs',
    initialState: {
        format: [],
        isFormatVisible: false,
        genre: [],
        isGenreVisible: false,
        searchGenre: '',
        searchFormat: '',
        name: '',
    },
    reducers: {
        modifySearchGenre: (state, action) => {
            state.searchGenre = action.payload;
        },
        modifySearchFormat: (state, action) => {
            state.searchFormat = action.payload;
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
    modifyGenre,
    modifyFormat,
    modifyName,
    modifySearchGenre,
    modifySearchFormat
} = manyInputSlice.actions;

export default manyInputSlice.reducer;
