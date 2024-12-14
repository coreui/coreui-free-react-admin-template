import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildHoursDTO, hoursDTO } from '../dto/hoursDTO';

const initialState = {
    hoursList: [],
    hours: hoursDTO,
    status: 'idle',
    error: null,
}

// Async thunk for fetching hours list
export const fetchHoursList = createAsyncThunk('hours/fetchHoursList', async () => {
    const response = initialState.hoursList;
    return response;
});

// Async thunk for creating hours
export const createHours = createAsyncThunk('hours/createHours', async (newHour) => {
    const response = await buildHoursDTO(newHour);  
    return response;
});

const hoursSlice = createSlice({
    name: 'hours',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHoursList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHoursList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.hoursList = action.payload;
            })
            .addCase(fetchHoursList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createHours.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createHours.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.hours = action.payload;   
                state.hoursList.push(action.payload);
                console.log('state.hoursList: ', state.hoursList);
            })
            .addCase(createHours.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default hoursSlice.reducer;