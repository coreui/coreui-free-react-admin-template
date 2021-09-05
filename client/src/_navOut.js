/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _navOut = [
  {
    _component: 'CNavTitle',
    anchor: 'Information',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'DASHBOARD',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'ABOUT',
    to: '/about',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'HISTORY',
    to: '/history',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'TEAM',
    to: '/team',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'CONTACT',
    to: '/contact',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'SUPPORT',
    to: '/support',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
]

export default _navOut
