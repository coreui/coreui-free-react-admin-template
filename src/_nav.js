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
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

// Helper component for external link labels with icon
const ExternalLinkLabel = ({ children }) => (
  <>
    {children}
    <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
  </>
)

// Badge configuration constants
const BADGE_PRO = {
  color: 'danger',
  text: 'PRO',
}

const BADGE_NEW = {
  color: 'info',
  text: 'NEW',
}

// CoreUI Pro documentation base URL
const PRO_DOCS_BASE = 'https://coreui.io/react/docs'

// Navigation item factories for consistency and DRY principle
const createNavItem = (name, to, options = {}) => ({
  component: CNavItem,
  name,
  to,
  ...options,
})

const createProNavItem = (name, path) => ({
  component: CNavItem,
  name: <ExternalLinkLabel>{name}</ExternalLinkLabel>,
  href: `${PRO_DOCS_BASE}${path}`,
  badge: BADGE_PRO,
})

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: BADGE_NEW,
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  createNavItem('Colors', '/theme/colors', {
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  }),
  createNavItem('Typography', '/theme/typography', {
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  }),
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      createNavItem('Accordion', '/base/accordion'),
      createNavItem('Breadcrumb', '/base/breadcrumbs'),
      createProNavItem('Calendar', '/components/calendar/'),
      createNavItem('Cards', '/base/cards'),
      createNavItem('Carousel', '/base/carousels'),
      createNavItem('Collapse', '/base/collapses'),
      createNavItem('List group', '/base/list-groups'),
      createNavItem('Navs & Tabs', '/base/navs'),
      createNavItem('Pagination', '/base/paginations'),
      createNavItem('Placeholders', '/base/placeholders'),
      createNavItem('Popovers', '/base/popovers'),
      createNavItem('Progress', '/base/progress'),
      createProNavItem('Smart Pagination', '/components/smart-pagination/'),
      createProNavItem('Smart Table', '/components/smart-table/'),
      createNavItem('Spinners', '/base/spinners'),
      createNavItem('Tables', '/base/tables'),
      createNavItem('Tabs', '/base/tabs'),
      createNavItem('Tooltips', '/base/tooltips'),
      createProNavItem('Virtual Scroller', '/components/virtual-scroller/'),
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      createNavItem('Buttons', '/buttons/buttons'),
      createNavItem('Buttons groups', '/buttons/button-groups'),
      createNavItem('Dropdowns', '/buttons/dropdowns'),
      createProNavItem('Loading Button', '/components/loading-button/'),
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      createProNavItem('Autocomplete', '/forms/autocomplete/'),
      createNavItem('Checks & Radios', '/forms/checks-radios'),
      createProNavItem('Date Picker', '/forms/date-picker/'),
      createProNavItem('Date Range Picker', '/forms/date-range-picker/'),
      createNavItem('Floating Labels', '/forms/floating-labels'),
      createNavItem('Form Control', '/forms/form-control'),
      createNavItem('Input Group', '/forms/input-group'),
      createProNavItem('Multi Select', '/forms/multi-select/'),
      createProNavItem('Password Input', '/forms/password-input/'),
      createNavItem('Range', '/forms/range'),
      createProNavItem('Range Slider', '/forms/range-slider/'),
      createProNavItem('Rating', '/forms/rating/'),
      createNavItem('Select', '/forms/select'),
      createProNavItem('Stepper', '/forms/stepper/'),
      createProNavItem('Time Picker', '/forms/time-picker/'),
      createNavItem('Layout', '/forms/layout'),
      createNavItem('Validation', '/forms/validation'),
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      createNavItem('CoreUI Free', '/icons/coreui-icons'),
      createNavItem('CoreUI Flags', '/icons/flags'),
      createNavItem('CoreUI Brands', '/icons/brands'),
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      createNavItem('Alerts', '/notifications/alerts'),
      createNavItem('Badges', '/notifications/badges'),
      createNavItem('Modal', '/notifications/modals'),
      createNavItem('Toasts', '/notifications/toasts'),
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: BADGE_NEW,
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
      createNavItem('Login', '/login'),
      createNavItem('Register', '/register'),
      createNavItem('Error 404', '/404'),
      createNavItem('Error 500', '/500'),
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
