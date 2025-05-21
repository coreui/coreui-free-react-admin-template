import axios from 'axios'

const API_URL = 'http://localhost:8081/user/'

const getAllUsers = () => {
  return axios
    .get(`${API_URL}getAllUsers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error fetching all users:', error)
      return error
    })
}

export default {
  getAllUsers,
}
