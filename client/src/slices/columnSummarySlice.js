import { createSlice } from '@reduxjs/toolkit'

export const columnSummarySlice = createSlice({
  name: 'columnSummary',
  initialState: {
    page: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
})

export const { setPage } = columnSummarySlice.actions
export const selectColumnSummary = (state) => state.columnSummary
export default columnSummarySlice.reducer
