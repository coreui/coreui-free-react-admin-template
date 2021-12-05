/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Api from "../../api/endpoints";
import { Axios } from "../../api/instances";
import { NotificationManager } from "react-notifications";

const initialState = {
    customer: null,
    creative: null,
    customerLoading: false,
    creativeLoading: false,
};

const fetchCustomerByID = createAsyncThunk(
    "users/fetchCustomerByID",
    async (user_id) => {
        const res = await Axios.get(Api.GET_USER_BY_ID(user_id));
        return res.data.data;
    }
);

const fetchCreativeByID = createAsyncThunk(
    "users/fetchCreativeByID",
    async (user_id) => {
        const res = await Axios.get(Api.GET_USER_BY_ID(user_id));
        return res.data.data;
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerByID.pending, (state, action) => {
                state.customerLoading = true;
            })
            .addCase(fetchCustomerByID.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.customerLoading = false
            })
            .addCase(fetchCustomerByID.rejected, (state, action) => {
                state.customerLoading = false;
                NotificationManager.error(action.error.message);
            })
            .addCase(fetchCreativeByID.pending, (state, action) => {
                state.creativeLoading = true;
            })
            .addCase(fetchCreativeByID.fulfilled, (state, action) => {
                state.creative = action.payload;
                state.creativeLoading = false
            })
            .addCase(fetchCreativeByID.rejected, (state, action) => {
                state.creativeLoading = false;
                //NotificationManager.error(action.error.message);
            })
    },
});

export { fetchCustomerByID, fetchCreativeByID };

export default usersSlice.reducer;