import React from 'react'

const Home = React.lazy(() => import('./home'))
const Login = React.lazy(() => import('./login'))
const RegisterEntry = React.lazy(() => import('./registerEntry'))
const Register = React.lazy(() => import('./register'))
const RegisterFB = React.lazy(() => import('./registerFB'))
const Forget = React.lazy(() => import('./forget'))
const ResetPassword = React.lazy(() => import('./resetPassword'))

export { Home, Login, RegisterEntry, Register, RegisterFB, Forget, ResetPassword }
