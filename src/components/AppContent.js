import React, { Suspense, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';
import { useSelector } from 'react-redux';
import routes from '../routes';
import Page404 from '../views/pages/page404/Page404';
import { filterAccessibleRoutes } from '../features/access/permission';

const AppContent = () => {
  const currentUser = useSelector(state => state.auth.user);

  const accessibleRoutes = useMemo(() => filterAccessibleRoutes(routes, currentUser), [routes, currentUser]);

  return (
    <CContainer lg className='h-100'>
      <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <CSpinner color='primary'/>
        </div>
      }>
        <Routes>
          {accessibleRoutes.map((route, idx) => (
            route.element && (
              <Route key={idx} path={route.path} exact={route.exact} element={<route.element />} />
            )
          ))}

          {accessibleRoutes.some(route => route.path === '/dashboard') ? (
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          ) : (
            <Route path="/" element={accessibleRoutes.length > 0 ? <Navigate to={accessibleRoutes[0].path} replace /> : <Page404 />} />
          )}

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);