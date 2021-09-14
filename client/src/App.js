import React, { useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AOS from 'aos'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  useEffect(() => {
    AOS.init({
      once: false,
      disable: 'phone',
      duration: 1000,
      easing: 'ease-out-cubic',
    })
  })

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
