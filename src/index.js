import React from 'react'
import ReactDOM from 'react-dom'
import StoreProvider from './store'
import App from './App'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { StyledEngineProvider } from '@mui/material/styles'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <StoreProvider>
      <StyledEngineProvider injectFirst>
        <ToastContainer
          hideProgressBar
          pauseOnFocusLoss={false}
          autoClose={2000}
          closeOnClick
          position="top-center"
          theme="colored"
        />
        <App />
      </StyledEngineProvider>
    </StoreProvider>
  </React.StrictMode>,
)
