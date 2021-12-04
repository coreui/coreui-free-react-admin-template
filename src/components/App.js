/* eslint-disable */
import React, { useEffect } from 'react'
import { Redirect, HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { setHistory } from "../utils/utils";
import '../scss/style.scss'
import { appRoutes } from '../routes/appRoutes';
import { makeStyles, CssBaseline, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import { NotificationContainer } from "react-notifications";


const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

export const App = () => {
  const history = useHistory();

  useEffect(() => setHistory(history), [])
  return (
    <ThemeProvider theme={theme}>
     
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            {appRoutes.map((route) => (
              <Route {...route} />
            ))}
          </Switch>
          <NotificationContainer />
        </React.Suspense>
      </HashRouter>
    </ThemeProvider>
  )

}
