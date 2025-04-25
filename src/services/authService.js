import axios from 'axios'

const API_URL = 'http://localhost:8081/auth/'

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}signin`, { email, password })
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}logout`)
    console.log(response)
    localStorage.removeItem('user')
    return response.data
  } catch (error) {
    console.error('Error logout in:', error)
    throw error
  }
}

const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}check-auth`)
    return response
  } catch (error) {
    console.error('Error checking authentication status:', error)
    throw error
  }
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
