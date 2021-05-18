import React from 'react'

// examples

const Colors = React.lazy(() => import('./views/examples/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/examples/theme/typography/Typography'))

const Accordion = React.lazy(() => import('./views/examples/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/examples/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/examples/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/examples/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/examples/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/examples/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/examples/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/examples/base/paginations/Paginations'))
const Popovers = React.lazy(() => import('./views/examples/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/examples/base/progress/Progress'))
const Tables = React.lazy(() => import('./views/examples/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/examples/base/tooltips/Tooltips'))

const Buttons = React.lazy(() => import('./views/examples/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/examples/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/examples/buttons/dropdowns/Dropdowns'))

const ChecksRadios = React.lazy(() => import('./views/examples/forms/checks-radios/ChecksRadios'))
const FormControl = React.lazy(() => import('./views/examples/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/examples/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/examples/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/examples/forms/range/Range'))
const Select = React.lazy(() => import('./views/examples/forms/select/Select'))
const Validation = React.lazy(() => import('./views/examples/forms/validation/Validation'))

const CoreUIIcons = React.lazy(() => import('./views/examples/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/examples/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/examples/icons/brands/Brands'))

const Alerts = React.lazy(() => import('./views/examples/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/examples/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/examples/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/examples/notifications/toasts/Toasts'))

const Login = React.lazy(() => import('./views/examples/pages/login/Login'))
const Register = React.lazy(() => import('./views/examples/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/examples/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/examples/pages/page500/Page500'))

const Widgets = React.lazy(() => import('./views/examples/widgets/Widgets'))

const Charts = React.lazy(() => import('./views/examples/charts/Charts'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', component: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress', name: 'Progress', component: Progress },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/forms', name: 'Forms', component: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', component: FormControl },
  { path: '/forms/select', name: 'Select', component: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', component: ChecksRadios },
  { path: '/forms/range', name: 'Range', component: Range },
  { path: '/forms/input-group', name: 'Input Group', component: InputGroup },
  { path: '/forms/layout', name: 'Layout', component: Layout },
  { path: '/forms/validation', name: 'Validation', component: Validation },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toasts', name: 'Toasts', component: Toasts },
  // { path: '/login', name: 'Login', component: Login },
  // { path: '/register', name: 'Register', component: Register },
  // { path: '/404', name: '404', component: Page404 },
  // { path: '/500', name: '500', component: Page500 },
  { path: '/widgets', name: 'Widgets', component: Widgets },
]

export default routes
