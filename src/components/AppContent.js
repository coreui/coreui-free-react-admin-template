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
  const auth = useSelector((state) => state.admin);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location.pathname]);

  useEffect(() => {
    dispatch(isLogin());
  }, []);


  return (
    <>
      {auth.admin ? (
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
              {/*   <Redirect to="/login" />  */}
            </Switch>
          </Suspense>
        </CContainer>
      ) : (
        <Redirect to="/login" />
      )}


    </>
  )
}

export default React.memo(AppContent)
