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
