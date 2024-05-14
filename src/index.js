import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'; // Firebase Storage için gerekli modülü ekleyin
import firebaseConfig from './components/firebase'; // Firebase config dosyasını içe aktarın


import App from './App'
import store from './store'

firebase.initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
