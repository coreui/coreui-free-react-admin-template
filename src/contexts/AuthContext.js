import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import PropTypes from 'prop-types'
const AuthContext = React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function logout() {
    return auth.signOut()
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logout,
    signup,
  }
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
