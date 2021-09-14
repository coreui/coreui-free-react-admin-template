import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _navIn = [
  {
    _component: 'CNavTitle',
    anchor: 'Services',
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
    anchor: 'CAREER',
    to: '/career',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'COLUMNS',
    to: '/column_summary',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  },
  /* {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'STUDY',
    to: '/study',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
  }, */
]

export default _navIn
