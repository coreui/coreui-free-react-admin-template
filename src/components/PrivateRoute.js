import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import PropTypes from 'prop-types'
export default function PrivateRoute({ components: Components, ...rest }) {
  const { currentUser } = useAuth()
  return (
    <Route>
      {(props) => {
        return currentUser ? <Components {...props} /> : <Redirect to="/login" />
      }}
    </Route>
  )
}
PrivateRoute.propTypes = {
  components: PropTypes.any,
}
