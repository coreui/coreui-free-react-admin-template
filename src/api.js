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

  getGraphByVariable(graphVar, aggs) {
    if (aggs){
      return axios.get(`${this.url}/graphs/variable/${graphVar}?aggs=${aggs}`, {})
    } else {
      return axios.get(`${this.url}/graphs/variable/${graphVar}`, {})
    }
  }

  // lock controller
  getLock(graphVar) {
    return axios.get(`${this.url}/locks/${graphVar}`, {})
  }

  createOrUpdateLock(graphVar, relations) {
    return axios.post(`${this.url}/locks/create`, {graph_variable: graphVar, relations: relations})
  }

  // profile controller
  getProfile(){
    return axios.get(`${this.url}/profile`, {})
  }

  updateProfile(username, occupation){
    return axios.post(`${this.url}/profile`, {username: username, occupation: occupation})
  }

  updatePassword(password, npassword){
    return axios.post(`${this.url}/profile/password`, {password: password, npassword: npassword})
  }

  deleteProfile(username){
    return axios.delete(`${this.url}/profile/${username}`)
  }

  // agent controller
  getAgents(query, page, max) {
    if (query !== '') {
      return axios.get(`${this.url}/agents/list/?q=${query}&page=${page}&max=${max}`, {})
    } else {
      return axios.get(`${this.url}/agents/list/?page=${page}&max=${max}`, {})
    }
  }

  // data sensors controller
  getDataSensors(query, page, max){
    if (query !== ''){
      return axios.get(`${this.url}/data_sensors/list/?q=${query}&page=${page}&max=${max}`, {})
    } else{
      return axios.get(`${this.url}/data_sensors/list/?page=${page}&max=${max}`, {})
    }
  }

  createOrUpdateDataSensor(id, name, type, rule, label, isActivated){
    return axios.post(`${this.url}/data_sensors/${id}`, {name: name, type: type, rule: rule, label: label, is_activated: isActivated})
  }

  deleteDataSensor(id){
    return axios.delete(`${this.url}/data_sensors/${id}`)
  }


  // Error Utils
  getFormattedErrorNotification(error) {
    let messageNotification = "An error occurred. Please retry later.";
    if (error.response) {
      if(error.response.status === 401){
        messageNotification = "Identification failed."
      }else{
        if(error.response.status === 403){
          messageNotification = "This action is not allowed."
        }
      }
    } else if (error.request) {
      messageNotification = "An error occurred. Make sure you are connected to internet.";
    }
    return({
      message: messageNotification,
      level: 'error'
    });
  }

}

const api = new Api({ url: 'http://localhost:3000' });

export default api;
