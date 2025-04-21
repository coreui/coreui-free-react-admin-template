// src/utils/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://109.199.124.208:2000',
});

// Setup request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setupAxiosInterceptors = (logoutCallback) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
     if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (logoutCallback) {
          logoutCallback();
        }
      } 
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;


