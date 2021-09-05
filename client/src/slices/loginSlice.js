import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    imgSrc: null,
    studentID: '',
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
    setStudentID: (state, action) => {
      state.studentID = action.payload
    },
    clearStudentID: (state, action) => {
      state.studentID = ''
    },
  },
})

export const { login, logout, setImgSrc, clearImgSrc, setStudentID, clearStudentID } =
  loginSlice.actions
export const selectLogin = (state) => state.login
export default loginSlice.reducer
