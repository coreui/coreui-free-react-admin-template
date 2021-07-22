/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _navOut = [
  {
    _component: 'CNavItem',
    anchor: '_nav/anchor',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'CONTACT',
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
    anchor: 'SUPPORT',
    to: '/column',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'LOGIN',
    to: '/columnSummary',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavGroup',
    anchor: 'About',
    icon: <CIcon name="cil-star" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'HISTORY',
        to: '/login',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'ABOUT',
        to: '/register',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'TEAM',
        to: '/500',
      },
    ],
  },
]

export default _navOut
