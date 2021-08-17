import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _nav = [
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
    _component: 'CNavTitle',
    anchor: 'Navigation Panel',
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Booking',
    to: '/to',
    icon: <CIcon name="cil-puzzle" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Add Consignment',
        to: '/booking/newconsignment',
      },
      // {
      //   _component: 'CNavItem',
      //   as: NavLink,
      //   anchor: 'create consignor',
      //   to: '/booking/createconsignor',
      // },

      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'view Consignments',
        to: '/booking/listconsignment',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tables',
        to: '/base/tables',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  // Loading and Despatch
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Loading & Despatch',
    to: '/to',
    icon: <CIcon name="cil-puzzle" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Add Consignment',
        to: '/booking/consignment',
      },

      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Spinners',
        to: '/base/spinners',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tables',
        to: '/base/tables',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Recive',
    to: '/to',
    icon: <CIcon name="cil-puzzle" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Add Consignment',
        to: '/booking/consignment',
      },

      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Spinners',
        to: '/base/spinners',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tables',
        to: '/base/tables',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Delivery',
    to: '/to',
    icon: <CIcon name="cil-puzzle" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Add Consignment',
        to: '/booking/consignment',
      },

      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Spinners',
        to: '/base/spinners',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tables',
        to: '/base/tables',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  // nav

  {
    _component: 'CNavTitle',
    anchor: "Admin's Pannel",
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Users',
    to: '/to',
    icon: <CIcon name="cil-puzzle" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: "All User's",
        to: '/base/accordion',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Add User',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Settings',
    to: '/to',
    icon: <CIcon name="cil-puzzle" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: "All User's",
        to: '/base/accordion',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Add User',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Base',
    to: '/to',
    icon: <CIcon name="cil-puzzle" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Accordion',
        to: '/base/accordion',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Cards',
        to: '/base/cards',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Carousel',
        to: '/base/carousels',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Collapse',
        to: '/base/collapses',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'List group',
        to: '/base/list-groups',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Pagination',
        to: '/base/paginations',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Popovers',
        to: '/base/popovers',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Progress',
        to: '/base/progress',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Spinners',
        to: '/base/spinners',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tables',
        to: '/base/tables',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    anchor: 'Buttons',
    icon: <CIcon name="cil-cursor" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    anchor: 'Forms',
    icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Form Control',
        to: '/forms/form-control',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Select',
        to: '/forms/select',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Range',
        to: '/forms/range',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Input Group',
        to: '/forms/input-group',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Layout',
        to: '/forms/layout',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Validation',
        to: '/forms/validation',
      },
    ],
  },

  {
    _component: 'CNavGroup',
    anchor: 'Icons',
    icon: <CIcon name="cil-star" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    anchor: 'Notifications',
    icon: <CIcon name="cil-bell" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Badges',
        to: '/notifications/badges',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Modal',
        to: '/notifications/modals',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
]

export default _nav
