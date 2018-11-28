import axios from 'axios';

class Auth {
  constructor() {
    this.hasValidToken = true;
    this.storageKey = 'remember_me';
  }

  authenticate(token) {
    this.hasValidToken = true;
    localStorage.setItem(this.storageKey, token);
  }

  signout() {
    this.hasValidToken = false;
    localStorage.clear();
  }

  hasAValidToken() {
    axios.defaults.headers['X-API-TOKEN'] = localStorage.getItem(this.storageKey);
    return axios.get('http://127.0.0.1:3001/session')
  }

  isLoggedIn(){
    const rememberMe = localStorage.getItem(this.storageKey);
    return rememberMe !== 'undefined';
  }
}

const auth = new Auth();

export default auth;
