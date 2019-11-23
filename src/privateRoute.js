import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Cookies.get('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
export { PrivateRoute };