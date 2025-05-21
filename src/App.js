import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CircularProgress } from '@mui/material'
import './scss/style.scss'
import PrivateRoute from './PrivateRute'
import { checkAuthentication } from './actions/authActions'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const dispatch = useDispatch()
  const [isChecking, setIsChecking] = useState(true)

  const isFirstRender = useRef(true)

  const checkAuth = useCallback(async () => {
    try {
      await dispatch(checkAuthentication())
    } catch (error) {
      console.error('Authentication check failed:', error)
    } finally {
      setIsChecking(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (isFirstRender.current) {
      checkAuth()
      isFirstRender.current = false
    }
  }, [checkAuth])

  if (isChecking) {
    return (
      <div className="pt-3 text-center">
        <CircularProgress size="3rem" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CircularProgress size="3rem" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" name="Login Page" element={<Login />} />
          <Route path="/register" name="Register Page" element={<Register />} />
          <Route path="/404" name="Page 404" element={<Page404 />} />
          <Route path="/500" name="Page 500" element={<Page500 />} />
          <Route element={<PrivateRoute />} exact>
            <Route path="/" element={<DefaultLayout />} />
            <Route path="*" element={<DefaultLayout />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
