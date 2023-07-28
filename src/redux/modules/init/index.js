import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'

const initialState = {
  sidebarShow: true,
}

const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setSidebarShow: (state) => {
      state.sidebarShow = !state.sidebarShow
    },
  },
})

export function useToggleSidebar() {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.init.sidebarShow)

  const toggleSidebar = useCallback(() => {
    dispatch(initSlice.actions.setSidebarShow())
  }, [dispatch])

  return { sidebarShow, toggleSidebar }
}

export const { setSidebarShow } = initSlice.actions
export default initSlice.reducer
