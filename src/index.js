import React from 'react'
import ReactDOM from 'react-dom'
import StoreProvider from './store'
import App from './App'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
)
