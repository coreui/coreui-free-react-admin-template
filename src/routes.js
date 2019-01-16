import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const GraphDashboard = React.lazy(() => import('./views/Dashboards/GraphDashboard/GraphDashboard'));
const GenerateGraphDashboard = React.lazy(() => import('./views/Dashboards/GraphDashboard/Generate'));
const FindingDashboard = React.lazy(() => import('./views/Dashboards/FindingDashboard'));
const Users = React.lazy(() => import('./views/DefaultTheme/Users'));
const User = React.lazy(() => import('./views/DefaultTheme/Users/User'));
const LogOut = React.lazy(() => import('./views/LogOut'));
const Profile = React.lazy(() => import('./views/Settings/Profile'));
const Agent = React.lazy(() => import('./views/Metrics/Agent'));
const Finding = React.lazy(() => import('./views/Metrics/Finding'));
const Follow = React.lazy(() => import('./views/Configuration/FollowConfiguration'));
const QuickStart = React.lazy(() => import('./views/Help/QuickStart'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboards/graph/generate', name: 'Generate Graph Dashboard', component: GenerateGraphDashboard },
  { path: '/dashboards/graph/:graph_id', name: 'Graph Dashboard', component: GraphDashboard },
  { path: '/dashboards/finding', name: 'FindingDashboard', component: FindingDashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/logout', exact: true, name: 'Logout', component: LogOut },
  { path: '/settings/profile', exact: true, name: 'Profile Settings', component: Profile },
  { path: '/metrics/agent', exact: true, name: 'Agents Metrics', component: Agent },
  { path: '/metrics/finding', exact: true, name: 'Findings Metrics', component: Finding },
  { path: '/configuration/follow', exact: true, name: 'Follow Configuration', component: Follow },
  { path: '/help/quick_start', exact: true, name: 'Quick Start', component: QuickStart },
];

export default routes;
