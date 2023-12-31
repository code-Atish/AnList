// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './counter-slice'; 
// Import your reducers here
// Example:
// import counterReducer from './features/counter/counterSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // Example:
    page: pageReducer,
  },
});

export default store;
 