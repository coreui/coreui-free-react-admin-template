import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import { ThemeProvider } from '@mui/material'
import theme from './layout/theme'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <App />
  </Provider>
  </ThemeProvider>,
)
