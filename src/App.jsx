/**
 * App Component
 *
 * Root application component that sets up routing, theme management,
 * and lazy-loaded page components with suspense boundaries.
 *
 * Features:
 * - Client-side routing with HashRouter
 * - Theme detection from URL parameters and Redux state
 * - Lazy loading for all routes with loading spinner fallback
 * - Public routes (login, register, error pages)
 * - Protected routes wrapped in DefaultLayout
 *
 * @module App
 */

import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/authentication/login/Login'))
const Register = React.lazy(() => import('./views/authentication/register/Register'))
const CheckEmail = React.lazy(() => import('./views/authentication/check-email/CheckEmail'))
const ResetPassword = React.lazy(
  () => import('./views/authentication/reset-password/ResetPassword'),
)
const ChangePassword = React.lazy(
  () => import('./views/authentication/change-password/ChangePassword'),
)
const PasswordChanged = React.lazy(
  () => import('./views/authentication/password-changed/PasswordChanged'),
)
const Page404 = React.lazy(() => import('./views/error-pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/error-pages/page500/Page500'))

/**
 * Main Application Component
 *
 * Manages application-wide concerns:
 * - Theme initialization and persistence
 * - Client-side routing configuration
 * - Lazy loading with suspense fallbacks
 * - Theme detection from URL query parameters
 *
 * Theme priority:
 * 1. URL parameter (?theme=dark)
 * 2. Redux stored theme
 * 3. Browser/system preference (auto)
 *
 * @component
 * @returns {React.ReactElement} Application root with routing
 *
 * @example
 * // Standard usage in index.js
 * import App from './App'
 * ReactDOM.render(<App />, document.getElementById('root'))
 */
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/authentication/login" name="Login Page" element={<Login />} />
          <Route
            exact
            path="/authentication/register"
            name="Register Page"
            element={<Register />}
          />
          <Route
            exact
            path="/authentication/check-email"
            name="Check Email Page"
            element={<CheckEmail />}
          />
          <Route
            exact
            path="/authentication/reset-password"
            name="Reset Password Page"
            element={<ResetPassword />}
          />
          <Route
            exact
            path="/authentication/change-password"
            name="Change Password Page"
            element={<ChangePassword />}
          />
          <Route
            exact
            path="/authentication/password-changed"
            name="Password Changed Page"
            element={<PasswordChanged />}
          />
          <Route exact path="/error-pages/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/error-pages/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
