import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <div className="px-4">
      <Suspense fallback={<CircularProgress color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
