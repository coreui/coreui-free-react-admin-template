/**
 * Application Routes Configuration
 *
 * Defines all protected routes in the application using React lazy loading
 * for code splitting and performance optimization.
 *
 * Each route object contains:
 * - path: URL path for the route
 * - name: Human-readable name for breadcrumbs
 * - element: Lazy-loaded React component
 * - exact: (optional) Requires exact path match
 *
 * @module routes
 */

import React from 'react'

// Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Components
const Accordion = React.lazy(() => import('./views/components/accordion/Accordion'))
const Alerts = React.lazy(() => import('./views/components/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/components/badge/Badge'))
const Breadcrumbs = React.lazy(() => import('./views/components/breadcrumb/Breadcrumb'))
const Buttons = React.lazy(() => import('./views/components/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/components/button-group/ButtonGroup'))
const Cards = React.lazy(() => import('./views/components/cards/Cards'))
const Carousels = React.lazy(() => import('./views/components/carousel/Carousel'))
const Chip = React.lazy(() => import('./views/components/chip/Chip'))
const ChipSet = React.lazy(() => import('./views/components/chip-set/ChipSet'))
const Collapses = React.lazy(() => import('./views/components/collapse/Collapse'))
const Dropdowns = React.lazy(() => import('./views/components/dropdowns/Dropdowns'))
const ListGroups = React.lazy(() => import('./views/components/list-group/ListGroup'))
const Modals = React.lazy(() => import('./views/components/modals/Modals'))
const Navs = React.lazy(() => import('./views/components/navs-tabs/NavsTabs'))
const Paginations = React.lazy(() => import('./views/components/pagination/Pagination'))
const Placeholders = React.lazy(() => import('./views/components/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/components/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/components/progress/Progress'))
const SearchButton = React.lazy(() => import('./views/components/search-button/SearchButton'))
const Spinners = React.lazy(() => import('./views/components/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/components/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/components/tables/Tables'))
const Toasts = React.lazy(() => import('./views/components/toasts/Toasts'))
const Tooltips = React.lazy(() => import('./views/components/tooltips/Tooltips'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const ChipInput = React.lazy(() => import('./views/forms/chip-input/ChipInput'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

/**
 * Array of route configuration objects
 *
 * @type {Array<Object>}
 * @property {string} path - URL path pattern
 * @property {string} name - Display name for breadcrumbs and navigation
 * @property {React.LazyExoticComponent} element - Lazy-loaded component
 * @property {boolean} [exact] - Whether to match path exactly
 *
 * @example
 * // Route renders when URL matches '/dashboard'
 * { path: '/dashboard', name: 'Dashboard', element: Dashboard }
 *
 * @example
 * // Route with exact match required
 * { path: '/components', name: 'Components', element: Cards, exact: true }
 */
export const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/components', name: 'Components', element: Accordion, exact: true },
  { path: '/components/accordion', name: 'Accordion', element: Accordion },
  { path: '/components/alerts', name: 'Alerts', element: Alerts },
  { path: '/components/badge', name: 'Badge', element: Badges },
  { path: '/components/breadcrumb', name: 'Breadcrumb', element: Breadcrumbs },
  { path: '/components/buttons', name: 'Buttons', element: Buttons },
  { path: '/components/button-group', name: 'Button Group', element: ButtonGroups },
  { path: '/components/cards', name: 'Cards', element: Cards },
  { path: '/components/carousel', name: 'Carousel', element: Carousels },
  { path: '/components/chip', name: 'Chip', element: Chip },
  { path: '/components/chip-set', name: 'Chip Set', element: ChipSet },
  { path: '/components/collapse', name: 'Collapse', element: Collapses },
  { path: '/components/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/components/list-group', name: 'List group', element: ListGroups },
  { path: '/components/modals', name: 'Modals', element: Modals },
  { path: '/components/navs-tabs', name: 'Navs & Tabs', element: Navs },
  { path: '/components/pagination', name: 'Pagination', element: Paginations },
  { path: '/components/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/components/popovers', name: 'Popovers', element: Popovers },
  { path: '/components/progress', name: 'Progress', element: Progress },
  { path: '/components/search-button', name: 'Search Button', element: SearchButton },
  { path: '/components/spinners', name: 'Spinners', element: Spinners },
  { path: '/components/tabs', name: 'Tabs', element: Tabs },
  { path: '/components/tables', name: 'Tables', element: Tables },
  { path: '/components/toasts', name: 'Toasts', element: Toasts },
  { path: '/components/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/chip-input', name: 'Chip Input', element: ChipInput },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
