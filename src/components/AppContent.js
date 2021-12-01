/* eslint-disable */
import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../redux/slices/admin";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
// import routes from '../routes'
import { adminRoutes } from "../routes/adminRoutes";

const AppContent = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.admin.admin);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location.pathname]);

  useEffect(() => {
    console.log('is logged in')
    dispatch(isLogin());
  }, []);

  console.log(isLoggedIn)

  return (
    <>
      {isLoggedIn ? (
        <CContainer lg>
          <Suspense fallback={<CSpinner color="primary" />}>
            <Switch>
              {adminRoutes.map((route, idx) => {
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

            </Switch>
          </Suspense>
        </CContainer>
      ) : (
        <Redirect from="/" to="/login" />
      )}
    </>
  )
}

export default React.memo(AppContent)
