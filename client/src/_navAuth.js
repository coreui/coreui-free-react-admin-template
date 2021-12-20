/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _navAuth = [
  {
    _component: 'CNavTitle',
    anchor: 'Administrator',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'MATCHING',
    to: '/auth/matching',
    icon: <CIcon icon="sidebar_icon" name="sidebar_icon" customClassName="nav-icon" />,
  },
]

export default _navAuth
