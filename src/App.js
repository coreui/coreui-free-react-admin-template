import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { Redirect } from 'react-router-dom'
import { PrivateRoute } from './privateRoute'
import Cookies from 'js-cookie'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: Cookies.get('token'),
    } 

    this.setToken = this.setToken.bind(this);

  }

  setToken(token) {
    Cookies.set('token', token);
    this.setState({token: token})
    console.log(Cookies.get('token'));
    return <Redirect to={"/"} />

  }
  
  render() {
    
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props} token={this.state.token} setToken={this.setToken} />}/>
              <PrivateRoute exact path="/register" name="Register Page" component={Register}/>
              <PrivateRoute exact path="/404" name="Page 404" component={Page404}/>
              <PrivateRoute exact path="/500" name="Page 500" component={Page500}/>
              <PrivateRoute path="/" name="Home" component={DefaultLayout}/>
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
