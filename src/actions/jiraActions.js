import React from 'react'
import jiraService from '../services/jiraService'

export const GetAllConfigJiraRequest = () => ({
  type: 'GET_ALL_CONFIG_JIRA_REQUEST',
})

export const GET_ALL_CONFIG_JIRA_SUCCESS = (user) => ({
  type: 'GET_ALL_CONFIG_JIRA_SUCCESS',
  payload: user,
})

export const GET_ALL_CONFIG_JIRA_FAILURE = (error) => ({
  type: 'GET_ALL_CONFIG_JIRA_FAILURE',
  payload: error,
})

export const CHECK_CONNECTION_JIRA_API_REQUEST = () => ({
  type: 'CHECK_CONNECTION_JIRA_API_REQUEST',
})

export const CHECK_CONNECTION_JIRA_API_SUCCESS = () => ({
  type: 'CHECK_CONNECTION_JIRA_API_SUCCESS',
})

export const CHECK_CONNECTION_JIRA_API_FAILURE = (error) => ({
  type: 'CHECK_CONNECTION_JIRA_API_FAILURE',
  payload: error,
})

export const ADD_NEW_CONFIG_JIRA_API_REQUEST = () => ({
  type: 'ADD_NEW_CONFIG_JIRA_API_REQUEST',
})

export const ADD_NEW_CONFIG_JIRA_API_SUCCESS = () => ({
  type: 'ADD_NEW_CONFIG_JIRA_API_SUCCESS',
})

export const ADD_NEW_CONFIG_JIRA_API_FAILURE = (error) => ({
  type: 'ADD_NEW_CONFIG_JIRA_API_FAILURE',
  payload: error,
})

export const getAllConfigJiraAPI = () => (dispatch) => {
  dispatch(GetAllConfigJiraRequest())
  return jiraService
    .getAllConfigJira()
    .then((response) => {
      if (response.error) {
        dispatch(GET_ALL_CONFIG_JIRA_FAILURE(response.error))
        throw new Error(response.error)
      } else {
        dispatch(GET_ALL_CONFIG_JIRA_SUCCESS(response.data.data))
        return response
      }
    })
    .catch((error) => {
      dispatch(GET_ALL_CONFIG_JIRA_FAILURE(error))
      throw new Error(error)
    })
}

export const checkConnectionJiraAPI =
  (protocol, host, username, password, apiVersion, strictSSL) => (dispatch) => {
    dispatch(CHECK_CONNECTION_JIRA_API_REQUEST())
    return jiraService
      .checkConnectionJiraApi(protocol, host, username, password, apiVersion, strictSSL)
      .then((response) => {
        console.log(response)
        dispatch(CHECK_CONNECTION_JIRA_API_SUCCESS())
        return response
      })
      .catch((error) => {
        dispatch(CHECK_CONNECTION_JIRA_API_FAILURE(error))
        throw new Error(error)
      })
  }

export const addNewConfigJiraAPI =
  (protocol, host, username, password, apiVersion, strictSSL) => (dispatch) => {
    dispatch(CHECK_CONNECTION_JIRA_API_REQUEST())
    return jiraService
      .addNewConfigJiraAPI(protocol, host, username, password, apiVersion, strictSSL)
      .then((response) => {
        console.log(response)
        dispatch(CHECK_CONNECTION_JIRA_API_SUCCESS())
        return response
      })
      .catch((error) => {
        dispatch(CHECK_CONNECTION_JIRA_API_FAILURE(error))
        throw new Error(error)
      })
  }
