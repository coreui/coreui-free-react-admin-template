/* eslint-disable */
import React, { useEffect } from 'react'
import { Redirect, HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { setHistory } from "../utils/utils";
import '../scss/style.scss'
import { appRoutes } from '../routes/appRoutes';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

export const App = () => {
  const history = useHistory();

  useEffect(() => setHistory(history), []);
  console.log('history is:', history)
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          {appRoutes.map((route) => (
            <Route {...route} />
          ))}
          {/* <Redirect from="#/" to="#/login" /> */}
        </Switch>
      </React.Suspense>
    </HashRouter>
  )

}
