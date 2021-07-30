import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _navIn = [
  {
    _component: 'CNavItem',
    anchor: '_nav/anchor',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Career',
    to: '/career',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Columns',
    to: '/ColumnSummary',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavGroup',
    anchor: 'Pages',
    icon: <CIcon name="cil-star" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Login',
        to: '/login',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Register',
        to: '/register',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'RegisterEntry',
        to: '/register_entry',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'RegisterFB',
        to: '/register_facebook',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Error 404',
        to: '/404',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Error 500',
        to: '/500',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Profile',
        to: '/profile',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'ProfileEdit',
        to: '/profileEdit',
      },
    ],
  },
]

export default _navIn
