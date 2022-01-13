import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    isAuth: false,
    imgSrc: null,
    studentID: '',
    email: '',
    cellphone: '',
    name: '',
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true
      state.isAuth = action.payload
    },
    logout: (state) => {
      state.isLogin = false
      state.isAuth = false
    },
    setImgSrc: (state, action) => {
      state.imgSrc = action.payload
    },
    clearImgSrc: (state) => {
      state.imgSrc = null
    },
    setStudentInfo: (state, action) => {
      state.studentID = action.payload.account
      state.cellphone = action.payload.userCellphone
      state.name = action.payload.userName
      state.email = action.payload.userEmail
    },
    clearStudentInfo: (state, action) => {
      state.studentID = ''
      state.cellphone = ''
      state.name = ''
      state.email = ''
    },
  },
})

export const { login, logout, setImgSrc, clearImgSrc, setStudentInfo, clearStudentInfo } =
  loginSlice.actions
export const selectLogin = (state) => state.login
export default loginSlice.reducer
