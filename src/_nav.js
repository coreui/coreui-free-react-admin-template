/* eslint-disable */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilPuzzle,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Options',
  },
  {
    component: CNavGroup,

    name: 'Assets',
    to: '/assets',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All',
        to: '/assets',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'User',
    to: '/user',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All',
        to: '/user/all',
      },
      {
        component: CNavItem,
        name: 'Customers',
        to: '/user/customer',
      },
      {
        component: CNavItem,
        name: 'Creatives',
        to: '/user/creative',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Requests',
    to: '/request',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Table',
      //   to: '/table',
      // },
      {
        component: CNavItem,
        name: 'All',
        to: '/request/all',
      },
      {
        component: CNavItem,
        name: 'Photo shoot',
        to: '/request/photo',
      },
      {
        component: CNavItem,
        name: 'Video shoot',
        to: '/request/video',
      },
      {
        component: CNavItem,
        name: 'Request Creative',
        to: '/request/creative',
      },
    ],
  },
]

export default _nav
