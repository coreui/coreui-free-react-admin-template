/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

export const careerSlice = createSlice({
  name: 'career',
  initialState: {
    keywords: '',
  },
  reducers: {
    setKeywords: (state, action) => {
      state.keywords = action.payload
    },
    clearKeywords: (state) => {
      state.keywords = ''
    },
  },
})

export const { setKeywords, clearKeywords } = careerSlice.actions
export const selectCareer = (state) => state.career
export default careerSlice.reducer
