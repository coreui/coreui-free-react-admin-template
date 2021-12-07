/* eslint-disable */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilUser,
  cilPuzzle,
  cilSpeedometer,
  cilListRich,
  cilShareAll
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
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Options',
  // },
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

    name: 'Settings',
    to: '/setting',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Settings',
        to: '/settings',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'User',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
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
      // {
      //   component: CNavItem,
      //   name: 'Photo shoot',
      //   to: '/request/photo',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Video shoot',
      //   to: '/request/video',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Request Creative',
      //   to: '/request/creative',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Campaign',
    to: '/campaign',
    icon: <CIcon icon={cilShareAll} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All',
        to: '/campaign/all',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Category',
    to: '/category',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All',
        to: '/category/all',
      },
    ],
  },

]

export default _nav
