// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAfMX8RYSODQJhfkLv6Zc5IUJz2Q5W912Y',
  authDomain: 'sulopanel-ab5f0.firebaseapp.com',
  databaseURL: 'https://sulopanel-ab5f0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'sulopanel-ab5f0',
  storageBucket: 'sulopanel-ab5f0.appspot.com',
  messagingSenderId: '46704013149',
  appId: '1:46704013149:web:941cb7786157d761e982b4',
  measurementId: 'G-3WF0T2PZ3S',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default firebaseConfig
