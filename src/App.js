import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './scss/style.scss'
import PrivateRoute from './PrivateRute'
import { checkAuthentication } from './actions/authActions'
import { CSpinner } from '@coreui/react'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

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
        <CSpinner size="3rem" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner size="3rem" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" name="Login Page" element={<Login />} />
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
