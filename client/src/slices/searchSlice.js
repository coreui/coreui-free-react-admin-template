import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    keywords: '',
    resultProfiles: [],
  },
  reducers: {
    setResultProfiles: (state, action) => {
      state.resultProfiles = action.payload
    },
    clearResultProfiles: (state, action) => {
      state.resultProfiles = []
    },
    setKeywords: (state, action) => {
      state.keywords = action.payload
    },
    clearKeywords: (state) => {
      state.keywords = ''
    },
  },
})

export const { setResultProfiles, setKeywords, clearResultProfiles, clearKeywords } =
  searchSlice.actions
export const selectSearch = (state) => state.search
export default searchSlice.reducer
