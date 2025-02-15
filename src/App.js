import React, { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { CSpinner, useColorModes } from '@coreui/react';
import useAuth from './Firebase/useAuth';
import './scss/style.scss';
import './scss/examples.scss';

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const { user, loading } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme')?.match(/^[A-Za-z0-9\s]+/)?.[0];
    if (theme) setColorMode(theme);
    if (!isColorModeSet()) setColorMode('light');
  }, [isColorModeSet, setColorMode]);

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    );
  }

  return (
    <HashRouter>
      <Suspense fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />

          {/* Protected routes */}
          <Route
            path="/*"
            element={user ? <DefaultLayout /> : <Navigate to="/login" replace />}
          />

          {/* Redirect unmatched routes */}
          <Route
            path="*"
            element={<Navigate to={user ? "/" : "/login"} replace />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;