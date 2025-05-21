import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Admin Management
const AdminsList = React.lazy(() => import('./views/admins/AdminsList'))
const AdminForm = React.lazy(() => import('./views/admins/AdminForm'))
const AdminRoles = React.lazy(() => import('./views/admins/AdminRoles'))

// Event Management
const EventsList = React.lazy(() => import('./views/events/EventsList'))
const EventForm = React.lazy(() => import('./views/events/EventForm'))
const EventCategories = React.lazy(() => import('./views/events/EventCategories'))
const EventStatistics = React.lazy(() => import('./views/events/EventStatistics'))
const EventReport = React.lazy(() => import('./views/events/EventReport'))

// Gift Box Management
const GiftBoxesList = React.lazy(() => import('./views/gift-boxes/GiftBoxesList'))
const GiftBoxForm = React.lazy(() => import('./views/gift-boxes/GiftBoxForm'))
const GiftBoxProbabilities = React.lazy(() => import('./views/gift-boxes/GiftBoxProbabilities'))

// User Management
const UsersList = React.lazy(() => import('./views/users/UsersList'))
const UserPermissions = React.lazy(() => import('./views/users/UserPermissions'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  
  // Admin Management
  { path: '/admins', name: 'Admins', element: AdminsList, exact: true },
  { path: '/admins/list', name: 'Admins List', element: AdminsList },
  { path: '/admins/create', name: 'Create Admin', element: AdminForm },
  { path: '/admins/edit/:id', name: 'Edit Admin', element: AdminForm },
  { path: '/admins/roles', name: 'Admin Roles', element: AdminRoles },
  
  // Event Management
  { path: '/events', name: 'Events', element: EventsList, exact: true },
  { path: '/events/statistics', name: 'Event Statistics', element: EventStatistics },
  { path: '/events/report', name: 'Event Report', element: EventReport },
  
  // Gift Box Management
  { path: '/gift-boxes', name: 'Gift Boxes', element: GiftBoxesList, exact: true },
  { path: '/gift-boxes/list', name: 'Gift Boxes List', element: GiftBoxesList },
  { path: '/gift-boxes/edit/:boxType/:scenario/:index', name: 'Edit Gift Box Item', element: GiftBoxForm },
  { path: '/gift-boxes/probabilities', name: 'Gift Box Probabilities', element: GiftBoxProbabilities },
  
  // User Management
  { path: '/users', name: 'Users', element: UsersList, exact: true },
  { path: '/users/list', name: 'Users List', element: UsersList },
  { path: '/users/permissions', name: 'User Permissions', element: UserPermissions },
  { path: '/users/permissions/:id', name: 'Edit User Permissions', element: UserPermissions },
]

export default routes
