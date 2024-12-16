import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alert: {
        open: false,
        message: '', 
        severity: 'success',
    }
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.alert = action.payload;   
        },
        hideAlert: (state) => {
            state.alert = initialState.alert;
        },
    },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;