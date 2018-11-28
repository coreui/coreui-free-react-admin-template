import axios from 'axios';

class Api {
  constructor({ url }) {
    this.url = url;
  }

  // finding controller
  findingSearch() {
    return axios.get(`${this.url}/findings/search`, {})
  }

  // node controller
  getNodesByGraph(graphId) {
    return axios.get(`${this.url}/graphs/${graphId}/nodes`, {})
  }

  getEdgesWithinLastMinutes(graphId, lastMinutes) {
    return axios.get(`${this.url}/graphs/${graphId}/nodes/edges`, {last_minutes: lastMinutes})
  }
}

const api = new Api({ url: 'http://localhost:3001' });

export default api;
