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

Axios.interceptors.request.use(
  null,
  (error) => Promise.reject(error)
);

render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)

