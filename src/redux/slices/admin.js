/* eslint-disable */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { history } from '../../utils/utils'
import api from "../../api/api";

const login = createAsyncThunk('login', async ({ email, password }) => {
    console.log('i got here')
    console.log(email)
    try {
        console.log('got into try')
        const res = await api.createSession(email, password);

        // const data = await api.getAccount()

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
        const session_id = localStorage.getItem("session_id");
        console.log('is logged in thunk')
        console.log(session_id)
        if (!session_id) throw "ERROR!";

        const res = await api.getSession(session_id);
        console.log(res)
        return res;
    } catch (error) {
        console.log(error)
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
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                console.log('loading')
                state.authLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log('fulfilled')
                console.log(action)
                state.admin = true;
                localStorage.setItem("session_id", action.payload.$id);
                state.authLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.authLoading = false;
                console.log(action.error.message)
                // NotificationManager.error(action.error.message);
            })
            .addCase(isLogin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(isLogin.fulfilled, (state, action) => {
                console.log('still logged in')
                console.log(action)
                state.admin = true;
                state.loading = false;
            })
            .addCase(isLogin.rejected, (state, action) => {
                console.log('log out')
                state.loading = false;
                state.admin = false;
                localStorage.removeItem("session_id");
            })
    },
});


export { login, isLogin }

export default adminSlice.reducer;