/* eslint-disable */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { history } from '../../utils/utils'
import api from "../../api/api";

const login = createAsyncThunk('login', async ({ email, password }) => {
    try {
        const res = await api.createSession(email, password);

        history.push('/#/dashboard')
        window.location.reload(false)
        return res
    } catch (error) {
        console.log(error)
        throw error?.response?.data || error.message
    }
})

const isLogin = createAsyncThunk("admin/isLogin", async () => {
    try {
        const session_id = localStorage.getItem("session_id")

        if (!session_id) throw "ERROR!"

        const res = await api.getSession(session_id)

        return res
    } catch (error) {
        throw error?.response?.data || error.message
    }
});

const initialState = {
    admin: true,
    authLoading: false,
    loading: false
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        logout(state, action) {
            localStorage.removeItem("session_id")
            state.admin = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                console.log('loading')
                state.authLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.admin = true;
                localStorage.setItem("session_id", action.payload.$id);
                state.authLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.authLoading = false;
                // NotificationManager.error(action.error.message);
            })
            .addCase(isLogin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(isLogin.fulfilled, (state, action) => {
                state.admin = true;
                state.loading = false;
            })
            .addCase(isLogin.rejected, (state, action) => {
                state.loading = false;
                state.admin = false;
                localStorage.removeItem("session_id");
            })
    },
});


export { login, isLogin }

export const { logout } = adminSlice.actions;

export default adminSlice.reducer;