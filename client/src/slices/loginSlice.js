import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    imgSrc: null,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true
    },
    logout: (state) => {
      state.isLogin = false
    },
    setImgSrc: (state, action) => {
      state.imgSrc = action.payload
    },
    clearImgSrc: (state) => {
      state.imgSrc = null
    },
  },
})

export const { login, logout, setImgSrc, clearImgSrc } = loginSlice.actions
export const selectLogin = (state) => state.login
export default loginSlice.reducer
