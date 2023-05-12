import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { CSpinner } from '@coreui/react'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <CSpinner color="primary" variant="grow" />
  </div>
)

const getPreferredTheme = (storedTheme) => {
  if (storedTheme) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setTheme = (theme) => {
  document.documentElement.dataset.coreuiTheme =
    theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : theme
}

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)
  const urlParams = new URLSearchParams(window.location.href.split('?')[1])

  useEffect(() => {
    if (urlParams.get('theme')) {
      dispatch({ type: 'setTheme', theme: urlParams.get('theme') })
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme !== 'light' || theme !== 'dark') {
        setTheme(getPreferredTheme(theme))
      }
    })
  }, [])

  useEffect(() => {
    setTheme(getPreferredTheme(theme))
  }, [theme])

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
