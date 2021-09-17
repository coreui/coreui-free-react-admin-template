// out pages
import {
  Home,
  Login,
  RegisterEntry,
  Register,
  RegisterFB,
  Forget,
  ResetPassword,
} from './views/out'
// in pages
import {
  ColumnSummary,
  Column,
  Career,
  Recruitment,
  AddRecruitment,
  EditRecruitment,
  OwnRecruitment,
  Recommendation,
  AddRecommendation,
  EditRecommendation,
  OwnRecommendation,
  Profile,
  EditProfile,
  SearchProfile,
  Study,
} from './views/in'

import Dashboard from './views/dashboard/Dashboard'

// out routes
const routes_out = [
  { path: '/home', exact: false, name: 'Home', component: Home },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/register_entry', exact: true, name: 'RegisterEntry', component: RegisterEntry },
  { path: '/register', exact: true, name: 'Register', component: Register },
  { path: '/register_fb', exact: true, name: 'RegisterFB', component: RegisterFB },
  { path: '/forget', exact: true, name: 'Forget', component: Forget },
  {
    path: '/reset_password/:account/:active',
    exact: true,
    name: 'ResetPassword',
    component: ResetPassword,
  },
]

const routes_in = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/column_summary/:id', exact: false, name: 'column', component: Column },
  { path: '/column_summary', exact: false, name: 'ColumnSummary', component: ColumnSummary },
  { path: '/career', exact: true, name: 'Career', component: Career },
  { path: '/recruitment', exact: true, name: 'Recruitment', component: Recruitment },
  { path: '/add_recruitment', exact: true, name: 'AddRecruitment', component: AddRecruitment },
  {
    path: '/edit_recruitment/:id',
    exact: false,
    name: 'EditRecruitment',
    component: EditRecruitment,
  },
  { path: '/own_recruitment', exact: true, name: 'OwnRecruitment', component: OwnRecruitment },
  { path: '/recommendation', exact: true, name: 'Recommendation', component: Recommendation },
  {
    path: '/add_recommendation',
    exact: true,
    name: 'AddRecommendation',
    component: AddRecommendation,
  },
  {
    path: '/edit_recommendation/:id',
    exact: false,
    name: 'EditRecommendation',
    component: EditRecommendation,
  },
  {
    path: '/own_recommendation',
    exact: true,
    name: 'OwnRecommendation',
    component: OwnRecommendation,
  },
  {
    path: '/profile/:id',
    exact: false,
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/edit_profile',
    exact: true,
    name: 'EditProfile',
    component: EditProfile,
  },
  {
    path: '/search_profile',
    exact: true,
    name: 'SearchProfile',
    component: SearchProfile,
  },
  {
    path: '/study',
    exact: true,
    name: 'Study',
    component: Study,
  },
]

export { routes_out, routes_in }
