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

export default {
  getAllConfigJira,
}
