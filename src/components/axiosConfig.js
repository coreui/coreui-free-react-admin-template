import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost/fianance/public/api/', // Set your API base URL
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000', // Set your allowed origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Set allowed methods
  },
})

export default instance
