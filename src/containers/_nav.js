import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from "react-router-dom";

const _nav =  [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _component: 'CNavTitle',
    anchor: 'Theme'
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    _component: 'CNavTitle',
    anchor: 'Components'
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Base',
    to: '/to',
    icon: 'cil-puzzle',
    items: [
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
        anchor: 'Forms',
        to: '/base/forms',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Jumbotron',
        to: '/base/jumbotrons',
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
        anchor: 'Navs',
        to: '/base/navs',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Navbars',
        to: '/base/navbars',
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
        to: '/base/progress-bar',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Switches',
        to: '/base/switches',
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
        anchor: 'Tabs',
        to: '/base/tabs',
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
    // route: '/buttons',
    icon: 'cil-cursor',
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
        anchor: 'Brand buttons',
        to: '/buttons/brand-buttons',
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
        to: '/buttons/button-dropdowns',
      }
    ],
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie'
  },
  {
    _component: 'CNavGroup',
    anchor: 'Icons',
    // route: '/icons',
    icon: 'cil-star',
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
    // route: '/notifications',
    icon: 'cil-bell',
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
        anchor: 'Toaster',
        to: '/notifications/toaster'
      }
    ]
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Widgets',
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  // {
  //   _component: 'CSidebarNavDivider'
  // },
  // {
  //   _component: 'CSidebarNavTitle',
  //   items: ['Extras'],
  // },
  // {
  //   _component: 'CNavGroup',
  //   anchor: 'Pages',
  //   route: '/pages',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       _component: 'CNavItem',
  //       anchor: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchor: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchor: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchor: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   _component: 'CNavItem',
  //   anchor: 'Disabled',
  //   icon: 'cil-ban',
  //   badge: {
  //     color: 'secondary',
  //     text: 'NEW',
  //   },
  //   addLinkClass: 'c-disabled',
  //   'disabled': true
  // },
  // {
  //   _component: 'CSidebarNavDivider',
  //   classanchor: 'm-2'
  // },
  // {
  //   _component: 'CSidebarNavTitle',
  //   items: ['Labels']
  // },
  // {
  //   _component: 'CNavItem',
  //   anchor: 'Label danger',
  //   to: '',
  //   icon: {
  //     anchor: 'cil-star',
  //     classanchor: 'text-danger'
  //   },
  //   label: true
  // },
  // {
  //   _component: 'CNavItem',
  //   anchor: 'Label info',
  //   to: '',
  //   icon: {
  //     anchor: 'cil-star',
  //     classanchor: 'text-info'
  //   },
  //   label: true
  // },
  // {
  //   _component: 'CNavItem',
  //   anchor: 'Label warning',
  //   to: '',
  //   icon: {
  //     anchor: 'cil-star',
  //     classanchor: 'text-warning'
  //   },
  //   label: true
  // },
  // {
  //   _component: 'CSidebarNavDivider',
  //   classanchor: 'm-2'
  // }
]

export default _nav
