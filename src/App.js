import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { setupAxiosInterceptors } from './utils/api/axiosConfig'
import { handleLogout } from './features/auth/authSlice'
import { checkAuthState } from './features/auth/authSlice' // Add this import
import './scss/style.scss'
import './scss/examples.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

import ProtectedRoute from './features/auth/ProtectedRoute'

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.ui.theme) // Changed from state.theme to state.ui.theme
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [authChecked, setAuthChecked] = useState(false)
  
  const dispatch = useDispatch()

  // Check authentication state on mount
  useEffect(() => {
    dispatch(checkAuthState())
    setAuthChecked(true)
  }, [dispatch])

  // Setup axios interceptors
  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch(handleLogout())
      window.location.href = '/login' 
    }
    
    setupAxiosInterceptors(handleUnauthorized)
  }, [dispatch])

  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const theme = urlParams.get('theme')

    if (theme && /^[A-Za-z0-9\s]+$/.test(theme)) {
      setColorMode(theme)
    }

    if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, [isColorModeSet, setColorMode, storedTheme])

  if (!authChecked) {
    return (
      <div className="h-100vh d-flex justify-content-center align-items-center text-center" style={{height:"100vh"}}>
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center h-100vh d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DefaultLayout />
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App