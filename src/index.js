/* eslint-disable */
import 'react-app-polyfill/stable'
import 'core-js'
import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './components/App'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store'
import { Axios } from "./api/instances";
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-notifications/lib/notifications.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

Axios.interceptors.request.use(
  null,
  (error) => Promise.reject(error)
);

render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)

