// src/features/year/yearSlice.js
import { createSlice } from '@reduxjs/toolkit';

const manyInputSlice = createSlice({
    name: 'MultipleInputs',
    initialState: {
        format: [],
        isFormatVisible: false,
        genre: [],
        isGenreVisible: false,
        searchGenre:'',
    },
    reducers: {
        // modifyYear: (state, actions) => {
        //     state.year = state.year == actions.payload ? undefined : actions.payload;
        // },
        modifyFormatVisibility: (state, action) => {
            state.isFormatVisible = action.payload;
        },
        handleGenreSelect: (state, action) => {
            // if (state.genre.includes(action.payload)) {
            //     console.log(action.payload)
            //     let newArr = state.genre.filter((item) => item != action.payload);
            //     state.genre = newArr;
            // } else
            //     state.genre = [...state.genre, action.payload];
            // state.isGenreVisible = !state.isGenreVisible;

            // console.log(newFormat)
            state.genre=action.payload;
        },
        modifyGenreVisibility: (state, action) => {
            state.isGenreVisible = action.payload;
            state.searchGenre='';
        },
        modifySearchGenre : (state,action) => {
            state.searchGenre=action.payload;
        } 
    },
});

export const {
    handleGenreSelect,
    modifyGenreVisibility,
    modifySearchGenre
} = manyInputSlice.actions;

export default manyInputSlice.reducer;
