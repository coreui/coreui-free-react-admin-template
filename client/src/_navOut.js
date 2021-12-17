/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavHashLink } from 'react-router-hash-link'

const _navOut = [
  {
    _component: 'CNavTitle',
    anchor: 'Information',
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'HEADER',
    to: '/home/#header',
    icon: <CIcon icon="sidebar_icon" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'SERVICES',
    to: '/home/#services',
    icon: <CIcon icon="sidebar_icon" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'ABOUT',
    to: '/home/#about',
    icon: <CIcon icon="sidebar_icon" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'INTERVIEWS',
    to: '/home/#interviews',
    icon: <CIcon icon="sidebar_icon" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'HISTORY',
    to: '/home/#history',
    icon: <CIcon icon="sidebar_icon" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'TEAM',
    to: '/home/#team',
    icon: <CIcon icon="sidebar_icon" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'CONTACT',
    to: '/home/#contact',
    icon: <CIcon icon="sidebar_icon" customClassName="nav-icon" />,
  },
]

export default _navOut
