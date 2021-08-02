/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _navOut = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'CONTACT',
    to: '/contact',
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
    to: '/support',
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
    to: '/login',
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
        to: '/history',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'ABOUT',
        to: '/about',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'TEAM',
        to: '/team',
      },
    ],
  },
]

export default _navOut
