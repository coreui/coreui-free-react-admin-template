/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

export const careerSlice = createSlice({
  name: 'career',
  initialState: {
    keywords: '',
    croppedFile: null,
    croppedDataUrl: '',
  },
  reducers: {
    setKeywords: (state, action) => {
      state.keywords = action.payload
    },
    clearKeywords: (state) => {
      state.keywords = ''
    },
    setCroppedFile: (state, action) => {
      state.croppedFile = action.payload
    },
    clearCroppedFile: (state) => {
      state.croppedFile = null
    },
    setCroppedDataUrl: (state, action) => {
      state.croppedDataUrl = action.payload
    },
    clearCroppedDataUrl: (state) => {
      state.croppedDataUrl = ''
    },
  },
})

export const {
  setKeywords,
  clearKeywords,
  setCroppedFile,
  clearCroppedFile,
  setCroppedDataUrl,
  clearCroppedDataUrl,
} = careerSlice.actions
export const selectCareer = (state) => state.career
export default careerSlice.reducer
