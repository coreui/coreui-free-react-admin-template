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

export const DELETE_CONFIG_JIRA_API_REQUEST = () => ({
  type: 'DELETE_CONFIG_JIRA_API_REQUEST',
})

export const DELETE_CONFIG_JIRA_API_SUCCESS = () => ({
  type: 'DELETE_CONFIG_JIRA_API_SUCCESS',
})

export const DELETE_CONFIG_JIRA_API_FAILURE = (error) => ({
  type: 'DELETE_CONFIG_JIRA_API_FAILURE',
  payload: error,
})

export const toggleEditConfigJiraModalOpen = (configId) => ({
  type: 'TOGGLE_EDIT_CONFIG_JIRA_MODAL_OPEN',
  payload: configId,
})

export const toggleEditConfigJiraModalClose = () => ({
  type: 'TOGGLE_EDIT_CONFIG_JIRA_MODAL_CLOSE',
})

export const EDIT_CONFIG_JIRA_API_REQUEST = () => ({
  type: 'EDIT_CONFIG_JIRA_API_REQUEST',
})
export const EDIT_CONFIG_JIRA_API_SUCCESS = () => ({
  type: 'EDIT_CONFIG_JIRA_API_SUCCESS',
})
export const EDIT_CONFIG_JIRA_API_FAILURE = (error) => ({
  type: 'EDIT_CONFIG_JIRA_API_FAILURE',
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

export const deleteConfigJiraAPI = (id) => (dispatch) => {
  dispatch(DELETE_CONFIG_JIRA_API_REQUEST())
  return jiraService
    .deleteConfigJiraAPI(id)
    .then((response) => {
      console.log(response)
      dispatch(DELETE_CONFIG_JIRA_API_SUCCESS())
      return response
    })
    .catch((error) => {
      dispatch(DELETE_CONFIG_JIRA_API_FAILURE(error))
      throw new Error(error)
    })
}

export const editConfigJiraAPI =
  (id, protocol, host, username, password, apiVersion, strictSSL, enableConfig) => (dispatch) => {
    dispatch(EDIT_CONFIG_JIRA_API_REQUEST())
    return jiraService
      .editConfigJiraAPI(
        id,
        protocol,
        host,
        username,
        password,
        apiVersion,
        strictSSL,
        enableConfig,
      )
      .then((response) => {
        console.log(response)
        dispatch(EDIT_CONFIG_JIRA_API_SUCCESS())
        return response
      })
      .catch((error) => {
        dispatch(EDIT_CONFIG_JIRA_API_FAILURE(error))
        throw new Error(error)
      })
  }
