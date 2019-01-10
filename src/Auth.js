import axios from 'axios';
import api from './api';

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
    api.setAuthHeader(localStorage.getItem(this.storageKey));
    return api.getSession()
  }

  isLoggedIn(){
    const rememberMe = localStorage.getItem(this.storageKey);
    return rememberMe != null && rememberMe !== 'undefined';
  }
}

const auth = new Auth();

export default auth;
