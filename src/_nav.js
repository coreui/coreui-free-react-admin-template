import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilCalendar,
  cilBookmark,
  cilUser,
  cilSettings,
  cilGift,
  cilChart,
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
    name: 'Admin Management',
  },
  {
    component: CNavGroup,
    name: 'Admins',
    to: '/admins',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Admins',
        to: '/admins/list',
      },
      {
        component: CNavItem,
        name: 'Create Admin',
        to: '/admins/create',
      },
      {
        component: CNavItem,
        name: 'Admin Roles',
        to: '/admins/roles',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Event Management',
  },
  {
    component: CNavGroup,
    name: 'Events',
    to: '/events',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Statistics',
        to: '/events/statistics',
      },
      {
        component: CNavItem,
        name: 'Download Report',
        to: '/events/report',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Gift Box Probability Management',
  },
  {
    component: CNavGroup,
    name: 'Gift Boxes',
    to: '/gift-boxes',
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Boxes',
        to: '/gift-boxes/list',
      },
      {
        component: CNavItem,
        name: 'Probabilities',
        to: '/gift-boxes/probabilities',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Users',
        to: '/users/list',
      },
      {
        component: CNavItem,
        name: 'Permissions',
        to: '/users/permissions',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
