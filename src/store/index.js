// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './page-slice';
import singleInputReducer from './singleInput-slice';
import manyInputReducer from './manyInput-slice';
import sortCriteriaReducer from './sort-slice';


const store = configureStore({
  reducer: {
    page: pageReducer,
    singleInput: singleInputReducer,
    manyInput: manyInputReducer,
    sortCriteria: sortCriteriaReducer
  },
});

export default store;
