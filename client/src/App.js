import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  return (
    <HashRouter>
      <React.Suspense
        fallback={
          <div className="d-flex flex-row justify-content-center">
            <div className="spinner-border text-primary mt-3" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        }
      >
        <Switch>
          <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default App
