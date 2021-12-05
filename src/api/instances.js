import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://services.projects.sbs/',
})

export { instance as Axios }
