/* eslint-disable prettier/prettier */
import React from 'react'
const AuthMatching = React.lazy(() => import('./matching'))
const AuthRegister=React.lazy(() => import('./register'))
export { AuthMatching, AuthRegister }
