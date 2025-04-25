/* eslint-disable prettier/prettier */
import React from 'react'
import authService from '../services/authService'

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
})

export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
})

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
})

export const logoutRequest = () => ({
  type: 'LOGOUT_REQUEST',
})

export const logoutSuccess = (user) => ({
  type: 'LOGOUT_SUCCESS',
  payload: user,
})

export const logoutFailure = (error) => ({
  type: 'LOGOUT_FAILURE',
  payload: error,
})

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest())
  try {
    const user = await authService.login(username, password)
    dispatch(loginSuccess(user))
  } catch (error) {
    dispatch(loginFailure(error))
    console.error('Error logging in:', error)
  }
}

export const logout = () => async (dispatch) => {
  dispatch(logoutRequest())
  try {
    const user = await authService.logout()
    dispatch(logoutSuccess(user))
  } catch (error) {
    dispatch(logoutFailure(error))
    console.error('Error logging out:', error)
  }
}

export const checkAuthRequest = () => ({
  type: 'AUTH_CHECK_REQUEST',
})

export const checkAuthSuccess = (data) => ({
  type: 'AUTH_CHECK_SUCCESS',
  payload: data,
})

export const checkAuthFailure = (error) => ({
  type: 'AUTH_CHECK_FAILURE',
  payload: error,
})

export const checkAuthentication = () => async (dispatch) => {
  dispatch(checkAuthRequest())
  try {
    const response = await authService.checkAuth()
    dispatch(checkAuthSuccess(response.data))
  } catch (error) {
    dispatch(checkAuthFailure(error))
    console.error('Error checking authentication status:', error)
  }
}
