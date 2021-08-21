import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    editImage: false,
  },
  reducers: {
    openEditImageModal: (state) => {
      state.editImage = true
    },
    closeEditImageModal: (state) => {
      state.editImage = false
    },
  },
})

export const { openEditImageModal, closeEditImageModal } = profileSlice.actions
export const selectProfile = (state) => state.profile
export default profileSlice.reducer
