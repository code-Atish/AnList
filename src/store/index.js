// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './page-slice'; 
import singleInputReducer from './singleInput-slice'; 
import manyInputReducer from './manyInput-slice'; 
// Import your reducers here
// Example:
// import counterReducer from './features/counter/counterSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // Example:
    page: pageReducer,
    singleInput:singleInputReducer,
    manyInput:manyInputReducer,
  },
});

export default store;
 