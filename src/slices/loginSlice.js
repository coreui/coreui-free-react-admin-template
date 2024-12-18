import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api_Status } from '../components/common/utils';
import { buildUserDTO, userDTO } from '../dto/userDTO';
import { userLogin } from '../components/common/apiCalls';

// Initial state for login
const initialState = {
    user: userDTO,
    loading: false,
    error: null,
    status: Api_Status.Idle,
};

// Async thunk to handle login
export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const user = await userLogin(credentials);  
            const response = buildUserDTO(user);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.status = Api_Status.Loading
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = Api_Status.Succeeded;
                state.user = action.payload;
                console.log("User:", state.user);
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = Api_Status.Failed;
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;