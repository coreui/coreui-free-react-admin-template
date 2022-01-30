import React from 'react'

const Home = React.lazy(() => import('./home'))
const Login = React.lazy(() => import('./login'))
const RegisterEntry = React.lazy(() => import('./registerEntry'))
const RegisterEntryAlumni = React.lazy(() => import('./registerEntryAlumni'))
const RegisterEntryStudent = React.lazy(() => import('./registerEntryStudent'))
const Register = React.lazy(() => import('./register'))
const RegisterFB = React.lazy(() => import('./registerFB'))
const Forget = React.lazy(() => import('./forget'))
const ResetPassword = React.lazy(() => import('./resetPassword'))
const Policy = React.lazy(() => import('./policy'))
export {
  Home,
  Login,
  RegisterEntry,
  RegisterEntryAlumni,
  RegisterEntryStudent,
  Register,
  RegisterFB,
  Forget,
  ResetPassword,
  Policy,
}
