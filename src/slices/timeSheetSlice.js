import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { buildTimeSheetObjDTO, timeSheetObjDTO } from '../dto/timesDTO';


const initialState = {
    timeSheetList: [],
    timeSheet: timeSheetObjDTO,
    loading: false,
    error: null,
}

// Async thunk for creating a time sheet
export const createTimeSheet = createAsyncThunk(
    'timeSheet/createTimeSheet',
    async (timeSheetData, { rejectWithValue }) => {
        try {
            const response = await buildTimeSheetObjDTO(timeSheetData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for fetching the time sheet list
export const fetchTimeSheetList = createAsyncThunk(
    'timeSheet/fetchTimeSheetList',
    async (_, { rejectWithValue }) => {
        try {
            const response = initialState.timeSheetList;
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const timeSheetSlice = createSlice({
    name: 'timeSheet',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTimeSheet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTimeSheet.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSheet = action.payload;
                state.timeSheetList.push(action.payload);
            })
            .addCase(createTimeSheet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTimeSheetList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTimeSheetList.fulfilled, (state, action) => {
                state.loading = false;
                state.timeSheetList = action.payload;
            })
            .addCase(fetchTimeSheetList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default timeSheetSlice.reducer;