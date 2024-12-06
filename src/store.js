import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import dataGridConnectionSlice from './slices/dataGridConnectionSlice';


const store = configureStore({
  reducer: {
    user: userSlice,
    dataGridConnection: dataGridConnectionSlice,
  },
});

export default store;
