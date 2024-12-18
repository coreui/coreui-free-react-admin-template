import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import customerSlice from './slices/customerSlice';
import connectionSlice from './slices/connectionSlice';
import dataGridConnectionSlice from './slices/dataGridConnectionSlice';
import contactSlice from './slices/contactSlice'; 
import projectSlice from './slices/projectSlice'; 
import taskSlice from './slices/taskSlice';
import hoursSlice from './slices/hoursSlice'; 
import timeSheetSlice from './slices/timeSheetSlice';
import alertSlice from './slices/alertSlice'; 
import popoverSlice from './slices/popoverSlice';
import loginSlice from './slices/loginSlice';


const store = configureStore({
  reducer: {
    user: userSlice,
    customer: customerSlice,
    connection: connectionSlice,
    contacts: contactSlice,
    project: projectSlice,
    task: taskSlice,
    hours: hoursSlice,  
    timeSheet: timeSheetSlice, 
    alert: alertSlice,
    delete: popoverSlice,
    login: loginSlice,  
    dataGridConnection: dataGridConnectionSlice,
  },
});

export default store;
