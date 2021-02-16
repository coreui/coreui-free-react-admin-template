import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from "react-router-dom";

const _nav =  [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchorText: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  // {
  //   _component: 'CSidebarNavTitle',
  //   items: ['Theme']
  // },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchorText: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchorText: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  // {
  //   _component: 'CSidebarNavTitle',
  //   items: ['Components']
  // },
  {
    _component: 'CNavGroup',
    anchorText: 'Base',
    route: '/base',
    icon: 'cil-puzzle',
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchorText: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchorText: 'Cards',
        to: '/base/cards',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Carousel',
        to: '/base/carousels',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Collapse',
        to: '/base/collapses',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Forms',
        to: '/base/forms',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Jumbotron',
        to: '/base/jumbotrons',
      },
      {
        _component: 'CNavItem',
        anchorText: 'List group',
        to: '/base/list-groups',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Navs',
        to: '/base/navs',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Navbars',
        to: '/base/navbars',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Pagination',
        to: '/base/paginations',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Popovers',
        to: '/base/popovers',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Progress',
        to: '/base/progress-bar',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Switches',
        to: '/base/switches',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Tables',
        to: '/base/tables',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Tabs',
        to: '/base/tabs',
      },
      {
        _component: 'CNavItem',
        anchorText: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  // {
  //   _component: 'CNavGroup',
  //   anchorText: 'Buttons',
  //   route: '/buttons',
  //   icon: 'cil-cursor',
  //   items: [
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Brand buttons',
  //       to: '/buttons/brand-buttons',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Dropdowns',
  //       to: '/buttons/button-dropdowns',
  //     }
  //   ],
  // },
  // {
  //   _component: 'CNavItem',
  //   anchorText: 'Charts',
  //   to: '/charts',
  //   icon: 'cil-chart-pie'
  // },
  // {
  //   _component: 'CNavGroup',
  //   anchorText: 'Icons',
  //   route: '/icons',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   _component: 'CNavGroup',
  //   anchorText: 'Notifications',
  //   route: '/notifications',
  //   icon: 'cil-bell',
  //   items: [
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Toaster',
  //       to: '/notifications/toaster'
  //     }
  //   ]
  // },
  // {
  //   _component: 'CNavItem',
  //   anchorText: 'Widgets',
  //   to: '/widgets',
  //   icon: 'cil-calculator',
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   _component: 'CSidebarNavDivider'
  // },
  // {
  //   _component: 'CSidebarNavTitle',
  //   items: ['Extras'],
  // },
  // {
  //   _component: 'CNavGroup',
  //   anchorText: 'Pages',
  //   route: '/pages',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       _component: 'CNavItem',
  //       anchorText: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   _component: 'CNavItem',
  //   anchorText: 'Disabled',
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
  //   classanchorText: 'm-2'
  // },
  // {
  //   _component: 'CSidebarNavTitle',
  //   items: ['Labels']
  // },
  // {
  //   _component: 'CNavItem',
  //   anchorText: 'Label danger',
  //   to: '',
  //   icon: {
  //     anchorText: 'cil-star',
  //     classanchorText: 'text-danger'
  //   },
  //   label: true
  // },
  // {
  //   _component: 'CNavItem',
  //   anchorText: 'Label info',
  //   to: '',
  //   icon: {
  //     anchorText: 'cil-star',
  //     classanchorText: 'text-info'
  //   },
  //   label: true
  // },
  // {
  //   _component: 'CNavItem',
  //   anchorText: 'Label warning',
  //   to: '',
  //   icon: {
  //     anchorText: 'cil-star',
  //     classanchorText: 'text-warning'
  //   },
  //   label: true
  // },
  // {
  //   _component: 'CSidebarNavDivider',
  //   classanchorText: 'm-2'
  // }
]

export default _nav
