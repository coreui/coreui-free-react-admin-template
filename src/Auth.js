import axios from 'axios';

class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.hasValidToken = false;
    this.storageKey = 'remember_me';
  }

  authenticate(cb) {
    this.isAuthenticated = true;
    this.hasValidToken = true;
    localStorage.setItem(this.storageKey, cb.token);
    setTimeout(cb, 100); // fake async
  }

  signout(cb) {
    this.isAuthenticated = false;
    this.hasValidToken = false;
    localStorage.clear();
    setTimeout(cb, 100);
  }

  hasAValidToken() {
    const rememberMe = localStorage.getItem('remember_me');
    if (rememberMe === '') {
      return false;
    }

    axios.defaults.headers['X-API-TOKEN'] = rememberMe;
    return axios.get('http://127.0.0.1:3001/session')
      .then(res => {
        console.log(res);
        console.log(res.data);
        return true;
      })
  }
}

const auth = new Auth();

export default auth;
