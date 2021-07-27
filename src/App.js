import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const RegisterEntry = React.lazy(() => import('./views/pages/register/RegisterEntry'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const RegisterFB = React.lazy(() => import('./views/pages/registerFB/RegisterFB'))
const Forget = React.lazy(() => import('./views/pages/forget/Forget'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))
const ProfileEdit = React.lazy(() => import('./views/pages/profileEdit/ProfileEdit'))
class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/register_entry"
              name="RegisterEntry Page"
              render={(props) => <RegisterEntry {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/register_facebook"
              name="Register with Facebook"
              render={(props) => <RegisterFB {...props} />}
            />
            <Route exact path="/forget" name="Forget" render={(props) => <Forget {...props} />} />

            <Route exact path="/profile" name="Profile Page" render={() => <Profile />} />
            <Route
              exact
              path="/profileEdit"
              name="Profile Edit Page"
              render={() => <ProfileEdit />}
            />
            <Route exact path="/profile" name="Profile Page" render={() => <Profile />} />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App
