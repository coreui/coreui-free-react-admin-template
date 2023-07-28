import axios from 'axios'

class ReactApiPlugin {
  setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  clearAuthToken() {
    delete axios.defaults.headers.common['Authorization']
  }

  async putData(url, data, config = {}) {
    try {
      const response = await axios.put(url, data, config)
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else {
        throw new Error('Network error')
      }
    }
  }

  async getData(url, config = {}) {
    try {
      const response = await axios.get(url, config)
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else {
        throw new Error('Network error')
      }
    }
  }

  async postData(url, data, config = {}) {
    try {
      const response = await axios.post(url, data, config)
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else {
        throw new Error('Network error')
      }
    }
  }
}

const apiPluginInstance = new ReactApiPlugin()
export default apiPluginInstance
