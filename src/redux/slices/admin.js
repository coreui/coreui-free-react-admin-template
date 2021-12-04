/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { NotificationManager } from "react-notifications"
import { history } from '../../utils/utils'
import api from "../../api/api";


const login = createAsyncThunk('login', async ({ email, password }) => {
    try {
        const res = await api.createSession(email, password);
        const resp = await api.getAccount()

        if (resp.prefs.role.toUpperCase() === "ADMIN") {
            NotificationManager.success("Logged in!")
            history.push('/#/dashboard')
            window.location.reload(false)
        
            return res
        }
        throw Error

    } catch (error) {
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
                state.authLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.admin = true;
                localStorage.setItem("admin_id", action.payload.userId)
                localStorage.setItem("session_id", action.payload.$id);
                state.authLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.authLoading = false;
                NotificationManager.error('Unable to login. Try again!!!');
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
                localStorage.removeItem("admin_id");
                localStorage.removeItem("session_id");
            })
    },
});


export { login, isLogin }

export const { logout } = adminSlice.actions;

export default adminSlice.reducer;