import { createSlice } from '@reduxjs/toolkit'

export const columnSummarySlice = createSlice({
  name: 'columnSummary',
  initialState: {
    page: 1,
    keywords: '',
    isSearch: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setKeywords: (state, action) => {
      state.keywords = action.payload
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload
    },
  },
})

export const { setPage, setKeywords, setIsSearch } = columnSummarySlice.actions
export const selectColumnSummary = (state) => state.columnSummary
export default columnSummarySlice.reducer
