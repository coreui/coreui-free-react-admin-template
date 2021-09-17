import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import {
  login,
  logout,
  setImgSrc,
  selectLogin,
  clearImgSrc,
  setStudentInfo,
  clearStudentInfo,
} from '../slices/loginSlice'
import axios from 'axios'
import default_male from '../assets/images/default_male.png'
import { AppBackground } from '.'

// routes config
import { routes_out, routes_in } from '../routes'

const AppContent = () => {
  const ContentStyle = {
    maxWidth: `100%`,
    maxHeight: `100%`,
  }

  const dispatch = useDispatch()
  const { isLogin } = useSelector(selectLogin)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    // check login status
    axios
      .post('/api/isLogin', {})
      .then((res) => {
        console.log(res)
        dispatch(login())
        dispatch(setImgSrc(res.data.userimage === '' ? default_male : res.data.userimage))
        dispatch(setStudentInfo(res.data))
      })
      .catch((err) => {
        dispatch(logout())
        dispatch(clearImgSrc())
        dispatch(clearStudentInfo())
      })
  }, [isLogin])

  return (
    <div style={ContentStyle}>
      <AppBackground />
      <Suspense
        fallback={
          <div className="d-flex flex-row justify-content-center">
            <div className="spinner-border text-primary mt-3" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        }
      >
        <Switch>
          {routes_out.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect exact from="/" to="/home" />
          {!isLogin ? <Redirect to="/login" /> : null}
          {isLogin
            ? routes_in.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <>
                          <route.component {...props} />
                        </>
                      )}
                    />
                  )
                )
              })
            : null}
        </Switch>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
