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
  getFindings(max) {
    return axios.get(`${this.url}/findings/last?max=${max}`, {})
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

  // lock controller
  getLock(graphVar) {
    return axios.get(`${this.url}/locks/${graphVar}`, {})
  }

  createOrUpdateLock(graphVar, relations) {
    return axios.post(`${this.url}/locks/create`, {graph_variable: graphVar, relations: relations})
  }

  // Error Utils
  getFormattedErrorNotification(error) {
    let messageNotification = "An error occurred. Please retry later.";
    if (error.response) {
      if(error.response.status === 401){
        messageNotification = "Identification failed."
      }else{
        if(error.response.status === 403){
          messageNotification = "Not allowed to access the resource."
        }
      }
    } else if (error.request) {
      messageNotification = "An error occurred. Make sure you are connected to the internet.";
    }
    return({
      message: messageNotification,
      level: 'error'
    });
  }

}

const api = new Api({ url: 'http://localhost:3000' });

export default api;
