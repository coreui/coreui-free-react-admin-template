import React from 'react'

const Column = React.lazy(() => import('./views/components/column/Column'))
const About = React.lazy(() => import('./views/components/about/About'))
const History = React.lazy(() => import('./views/components/history/History'))
const Contact = React.lazy(() => import('./views/components/contact/Contact'))
const Support = React.lazy(() => import('./views/components/support/Support'))
const Team = React.lazy(() => import('./views/components/team/Team'))
const ShowColumns = React.lazy(() => import('./views/components/columnSummary/showColumns'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Career = React.lazy(() => import('./views/components/career/career'))
const Recommendation = React.lazy(() =>
  import('./views/components/career/recommendation/Recommendation'),
)
const Recruitment = React.lazy(() => import('./views/components/career/recruitment/Recruitment'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/columns', exact: true, name: 'ColumnSummary', component: ShowColumns },
  { path: '/columns/:id', exact: false, name: 'Column', component: Column },
  { path: '/columnSummary', exact: true, name: 'ColumnSummary', component: ShowColumns },
  { path: '/career', exact: true, name: 'Career', component: Career },
  { path: '/recommendation', exact: true, name: 'Recommendation', component: Recommendation },
  { path: '/recruitment', exact: true, name: 'Recruitment', component: Recruitment },
  { path: '/about', name: 'About', component: About },
  { path: '/history', name: 'History', component: History },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/support', name: 'Support', component: Support },
  { path: '/team', name: 'Team', component: Team },
]

export default routes
