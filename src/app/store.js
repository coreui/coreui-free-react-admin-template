import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const loadUIState = () => {
  try {
    const savedState = localStorage.getItem('uiState');
    return savedState ? JSON.parse(savedState) : { sidebarShow: true, theme: 'light' };
  } catch (error) {
    console.error('Failed to load UI state:', error);
    return { sidebarShow: true, theme: 'light' };
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: loadUIState(),
  reducers: {
    set: (state, action) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem('uiState', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { set } = uiSlice.actions;

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authReducer,
  },
});

export default store;
