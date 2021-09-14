import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    sidebarShow: true,
    unfoldable: false,
  },
  reducers: {
    hideSidebar: (state) => {
      state.sidebarShow = false
      state.unfoldable = true
    },
    openSidebar: (state) => {
      state.sidebarShow = true
      state.unfoldable = false
    },
  },
})

export const { hideSidebar, openSidebar } = globalSlice.actions
export const selectGlobal = (state) => state.global
export default globalSlice.reducer
