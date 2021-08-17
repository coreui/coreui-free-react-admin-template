import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import './scss/style.scss'
import PrivateRoute from './components/PrivateRoute'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
              <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <PrivateRoute
                path="/"
                name="Home"
                components={(props) => <DefaultLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </AuthProvider>
    )
  }
}

export default App
