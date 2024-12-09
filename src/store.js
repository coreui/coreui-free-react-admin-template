import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import customerSlice from './slices/customerSlice';
import connectionSlice from './slices/connectionSlice';
import dataGridConnectionSlice from './slices/dataGridConnectionSlice';
import contactSlice from './slices/contactSlice'; 


const store = configureStore({
  reducer: {
    user: userSlice,
    customer: customerSlice,
    connection: connectionSlice,
    contacts: contactSlice,
    dataGridConnection: dataGridConnectionSlice,
  },
});

export default store;
