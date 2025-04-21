import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/api/axiosConfig';

const loadInitialState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return {
    isAuthenticated: !!token,
    user: user ? JSON.parse(user) : null,
    token: token || null,
    error: null,
    loading: false,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    resetError(state) {
      state.error = null;
    },
    updateUserSuccess(state, action) {
      state.user = { ...state.user, ...action.payload };
      // Update user in localStorage as well
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  resetError,
  updateUserSuccess 
} = authSlice.actions;

// Login thunk
export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const loginResponse = await axiosInstance.post('/auth/login', {
      login: credentials.user,
      password: credentials.password,
    });
    const { token } = loginResponse.data;
    const userResponse = await axiosInstance.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = userResponse.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch(loginSuccess({ token, user: userData }));
    return true;
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Login failed';
    dispatch(loginFailure(errorMsg));
    return false;
  }
};

// Update user thunk
export const updateUser = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put('/auth/me', userData);
    dispatch(updateUserSuccess(userData));
    return true;
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
};

// Check auth state thunk
export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token && user) {
    try {
      const userData = JSON.parse(user);
      dispatch(loginSuccess({ token, user: userData }));
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
    }
  } else {
    dispatch(logout());
  }
};

// Logout thunk
export const handleLogout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(logout());
};

export default authSlice.reducer;