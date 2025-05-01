import axios from 'axios'

const API_URL = 'http://localhost:8081/auth/'

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}signin`, { email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

const logout = async () => {
  try {
    const response = await axios.post(
      `${API_URL}logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    if (response.data.clearToken) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      // Clear Axios default headers
      delete axios.defaults.headers.common['Authorization']
      // Redirect to login page or update UI state
    }
    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      // Token already invalid/expired, clean up anyway
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
    throw error
  }
}

const checkAuth = () => {
  return axios
    .get(`${API_URL}check-auth`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('Error checking authentication:')
      return error
    })
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export default {
  login,
  logout,
  checkAuth,
  getCurrentUser,
}
