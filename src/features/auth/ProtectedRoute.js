// src/utils/auth/ProtectedRoute.js
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const token = localStorage.getItem('token') // Backup check for token
  
  // Add a loading state for when authentication is being checked
  const authLoading = useSelector((state) => state.auth?.loading)

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="pt-3 text-center  d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  // Check both Redux state and localStorage token
  if (!isAuthenticated && !token) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute