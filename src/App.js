import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'
import './scss/style.scss'
import PrivateRoute from './PrivateRute'
import { checkAuthentication } from './actions/authActions'

// Containers
const DefaultLayoutEmployee = React.lazy(() => import('./layout/DefaultLayoutEmployee'))
const DefaultLayoutManager = React.lazy(() => import('./layout/DefaultLayoutManager'))
const DefaultLayout = () => {
  const { user } = useSelector((state) => state.auth)
  return user.user.IsEmployee ? <DefaultLayoutEmployee /> : <DefaultLayoutManager />
}

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const dispatch = useDispatch()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthentication())
      } catch (error) {
        console.error('Authentication check failed:', error)
      } finally {
        setIsChecking(false)
      }
    }
    checkAuth()
  }, [dispatch])

  if (isChecking) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
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
