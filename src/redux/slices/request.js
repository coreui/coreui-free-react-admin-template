/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Api from "../../api/endpoints";
import { Axios } from "../../api/instances";
import { history } from '../../utils/utils'
import { NotificationManager } from "react-notifications";

const initialState = {
    requests: {
        items: [],
        totalPages: 0,
        currentPage: 0,
        totalItems: 0,
    },
    request: null,
    loading: false,
    approve: null,
    approveLoading: false,
    matchRequests: {
        users: [],
        sum: 0,
    },
    matchRequestsLoading: false,
    suggestCreative: null,
    suggestCreativeLoading: false

};

const fetchAllRequests = createAsyncThunk(
    "requests/fetchAllRequests",
    async (user_id) => {
        // TODO:: Fix Page size
        const res = await Axios.get(`${Api.GET_REQUEST(user_id)}?page=0&size=1000`)
        return res.data.data;
    }
);

const approveRequest = createAsyncThunk(
    "requests/approveRequest",
    async ({ id, user_id }) => {
        const res = await Axios.patch(Api.APPROVE_REQUEST(id), { admin_approval: true, user_id });
        history.push(`/#/request/match/${id}`);
        window.location.reload(false)
        return res.data.data;
    }
);

// Match request to creative... list all creatives admin can match 1 to the request
const fetchMatchRequest = createAsyncThunk(
    "requests/matchRequest",
    async ({ id }) => {
        const res = await Axios.get(`${Api.MATCH_REQUEST(id)}?page=0&size=200`)
        return res.data.data;
    }
)

const matchRequest = createAsyncThunk(
    "requests/suggestCreative",
    async ({request_id, creative_id}) => {
        const res = await Axios.post(Api.SUGGEST_CREATIVE, {
            request_id: request_id,
            creative_id: creative_id
        })
        history.goBack();
        return res.data.data
    }
)

const requestsSlice = createSlice({
    name: "requests",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRequests.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAllRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
                state.loading = false
            })
            .addCase(fetchAllRequests.rejected, (state, action) => {
                state.loading = false;
                NotificationManager.error(action.error.message);
            })
            .addCase(approveRequest.pending, (state, action) => {
                state.approveLoading = true;
            })
            .addCase(approveRequest.fulfilled, (state, action) => {
                state.approve = action.payload;
                state.approveLoading = false
                NotificationManager.success('Request Approved')
            })
            .addCase(approveRequest.rejected, (state, action) => {
                state.approveLoading = false;
                NotificationManager.error(action.error.message);
            })
            .addCase(fetchMatchRequest.pending, (state, action) => {
                state.matchRequestsLoading = true;
            })
            .addCase(fetchMatchRequest.fulfilled, (state, action) => {
                state.matchRequests = action.payload;
                state.matchRequestsLoading = false
              //  NotificationManager.success('Creative Found')
            })
            .addCase(fetchMatchRequest.rejected, (state, action) => {
                state.matchRequestsLoading = false;
                NotificationManager.error(action.error.message);
            })
            .addCase(matchRequest.pending, (state, action) => {
                state.suggestCreativeLoading = true;
            })
            .addCase(matchRequest.fulfilled, (state, action) => {
                state.suggestCreative = action.payload;
                state.suggestCreativeLoading = false
                NotificationManager.success('Request Matched with a creative')
            })
            .addCase(matchRequest.rejected, (state, action) => {
                state.suggestCreativeLoading = false;
                NotificationManager.error(action.error.message);
            })

    },
});

export { fetchAllRequests, approveRequest, fetchMatchRequest, matchRequest };

export default requestsSlice.reducer;