import React from 'react'

const Column = React.lazy(() => import('./views/components/column/Column'))
const About = React.lazy(() => import('./views/components/about/About'))
const History = React.lazy(() => import('./views/components/history/History'))
const Contact = React.lazy(() => import('./views/components/contact/Contact'))
const Support = React.lazy(() => import('./views/components/support/Support'))
const Team = React.lazy(() => import('./views/components/team/Team'))
const ShowColumns = React.lazy(() => import('./views/components/columnSummary/showColumns'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Career = React.lazy(() => import('./views/in/career/Career'))
const RecommendationForm = React.lazy(() => import('./views/in/recommendation/RecommendationForm'))
const Recommendation = React.lazy(() => import('./views/in/recommendation/Recommendation'))
const RecruitmentForm = React.lazy(() => import('./views/in/recruitment/RecruitmentForm'))
const Recruitment = React.lazy(() => import('./views/in/recruitment/Recruitment'))
const EditRecruitment = React.lazy(() => import('./views/in/recruitment/edit/EditRecruitment'))
const EditRecommendation = React.lazy(() =>
  import('./views/in/recommendation/edit/EditRecommendation'),
)

const ProfileSearch = React.lazy(() => import('./views/components/searchProfile/SearchProfile'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/ColumnSummary', exact: true, name: 'columnSummary', component: ShowColumns },
  { path: '/ColumnSummary/:id', exact: false, name: 'column', component: Column },
  { path: '/career', exact: true, name: 'Career', component: Career },
  { path: '/recommendation', exact: true, name: 'Recommendation', component: Recommendation },
  { path: '/recruitment', exact: true, name: 'Recruitment', component: Recruitment },
  { path: '/addRecruitment', exact: true, name: 'AddRecruitment', component: RecruitmentForm },
  {
    path: '/addRecommendation',
    exact: true,
    name: 'AddRecommendation',
    component: RecommendationForm,
  },
  {
    path: '/editRecruitment/:id',
    exact: false,
    name: 'EditRecruitment',
    component: EditRecruitment,
  },
  {
    path: '/editRecommendation/:id',
    exact: false,
    name: 'EditRecommendation',
    component: EditRecommendation,
  },
  { path: '/editRecruitment', name: 'EditRecruitment', component: Recruitment },
  { path: '/editRecommendation', name: 'EditRecommendation', component: Recommendation },
  { path: '/profileSearch', name: 'profileSearch', component: ProfileSearch },
  { path: '/about', name: 'About', component: About },
  { path: '/history', name: 'History', component: History },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/support', name: 'Support', component: Support },
  { path: '/team', name: 'Team', component: Team },
]

export default routes
