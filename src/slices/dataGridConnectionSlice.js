import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    connections: [],
    loading: false,
    error: null,
};

const dataGridConnectionSlice = createSlice({
    name: 'dataGridConnection',
    initialState,
    reducers: {
        addConnections: (state, action) => {
            state.connections = action.payload;
        }
    },
});

export const { addConnections } = dataGridConnectionSlice.actions;

export default dataGridConnectionSlice.reducer;