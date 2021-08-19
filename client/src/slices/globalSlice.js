import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    sidebarShow: false,
    unfoldable: false,
  },
  reducers: {
    hideSidebar: (state) => {
      state.sidebarShow = false
    },
    openSidebar: (state) => {
      state.sidebarShow = true
    },
  },
})

export const { hideSidebar, openSidebar } = globalSlice.actions
export const selectGlobal = (state) => state.global
export default globalSlice.reducer
