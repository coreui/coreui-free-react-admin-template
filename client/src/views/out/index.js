import React from 'react'

const Home = React.lazy(() => import('./home'))
const About = React.lazy(() => import('./about'))
const Contact = React.lazy(() => import('./contact'))
const Support = React.lazy(() => import('./support'))
const History = React.lazy(() => import('./history'))
const Team = React.lazy(() => import('./team'))
const Login = React.lazy(() => import('./login'))
const RegisterEntry = React.lazy(() => import('./registerEntry'))
const Register = React.lazy(() => import('./register'))
const RegisterFB = React.lazy(() => import('./registerFB'))
const Forget = React.lazy(() => import('./forget'))
const ResetPassword = React.lazy(() => import('./resetPassword'))

export {
  Home,
  About,
  Contact,
  Support,
  History,
  Team,
  Login,
  RegisterEntry,
  Register,
  RegisterFB,
  Forget,
  ResetPassword,
}
