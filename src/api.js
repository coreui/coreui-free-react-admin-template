import axios from 'axios';

class Api {
  constructor({ url }) {
    this.url = url;
  }

  // session controller
  getSession(){
    return axios.get(`${this.url}/session`)
  }

  // login controller
  login(username, password) {
    const user = {
      username: username,
      password: password
    };

    return axios.post(`${this.url}/login/auth`, user)
  }

  // finding controller
  findingSearch() {
    return axios.get(`${this.url}/findings/search`, {})
  }

  getFindingCount() {
    return axios.get(`${this.url}/findings/count`, {})
  }

  // node controller
  getNodesByGraph(graphId) {
    return axios.get(`${this.url}/graphs/${graphId}/nodes`, {})
  }

  getEdgesWithinLastMinutes(graphId, lastMinutes) {
    return axios.get(`${this.url}/graphs/${graphId}/nodes/edges?last_minutes=${lastMinutes}`, {})
  }

  // graph controller
  getListGraph(page, max) {
    return axios.get(`${this.url}/graphs/list/?page=${page}&max=${max}`, {})
  }

  getGraphByVariable(graphVar) {
    return axios.get(`${this.url}/graphs/variable/${graphVar}`, {})
  }

}

const api = new Api({ url: 'http://localhost:3000' });

export default api;
