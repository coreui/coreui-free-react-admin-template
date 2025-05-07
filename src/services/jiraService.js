import axios from 'axios'

const API_URL = 'http://localhost:8081/jira_config/'

const getAllConfigJira = () => {
  return axios
    .get(`${API_URL}getAllConfig`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching all config Jira:', error)
      return error
    })
}

const checkConnectionJiraApi = (protocol, host, username, password, apiVersion, strictSSL) => {
  return axios
    .post(
      `${API_URL}checkConnection`,
      { protocol, host, username, password, apiVersion, strictSSL },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('Error checking connection Api Jira:', error)
      return error
    })
}

const addNewConfigJiraAPI = (protocol, host, username, password, apiVersion, strictSSL) => {
  return axios
    .post(
      `${API_URL}addConfig`,
      { protocol, host, username, password, apiVersion, strictSSL },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('Error adding new config Api Jira:', error)
      return error
    })
}

const deleteConfigJiraAPI = (idList) => {
  return axios
    .post(
      `${API_URL}deleteConfigByID`,
      { ids: idList },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('Error deleting config Api Jira:', error)
      return error
    })
}

const editConfigJiraAPI = (id, protocol, host, username, password, apiVersion, strictSSL) => {
  return axios
    .post(
      `${API_URL}updateConfigByID`,
      { id, protocol, host, username, password, apiVersion, strictSSL },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('Error editing config Api Jira:', error)
      return error
    })
}

export default {
  getAllConfigJira,
  checkConnectionJiraApi,
  addNewConfigJiraAPI,
  deleteConfigJiraAPI,
  editConfigJiraAPI,
}
