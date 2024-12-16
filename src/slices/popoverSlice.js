import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    data: {}
}

const popoverSlice = createSlice({
    name: 'delete',
    initialState,
    reducers: {
        showPopup: (state, action) => {
            state.show = true;
            state.data = action.payload;
            console.log('showPopup', state.data);
        },
        hidePopup: (state, action) => {
            state.show = false;
            state.data = {};
        },
       
    }
});


export const {showPopup, hidePopup, focusPopup} = popoverSlice.actions;
export default popoverSlice.reducer;