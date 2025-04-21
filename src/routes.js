import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Map = React.lazy(() => import('./views/map/Map'))
const Users = React.lazy(() => import('./views/users/Users'))
const Roles = React.lazy(() => import('./views/roles/Roles'))
const Departments = React.lazy(() => import('./views/departments/Departments'))

const LayerForm = React.lazy(() => import('./views/layers/layers'))
const AddLayer = React.lazy(() => import('./views/layers/add'))
const EditLayer = React.lazy(() => import('./views/layers/edit'))
const Profile = React.lazy(()=>import('./views/profile/Profile'))
const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    permissions: { method: 'GET' },
  },
  { path: '/profile', name: 'Profile', element: Profile, permissions: { method: 'GET' } },
  {
    path: '/map',
    name: 'Map',
    element: Map,
    permissions: { method: 'GET', actionName: "Xaritani ko'rish", actionName2: 'Map Management' },
  },

  {
    path: '/layers',
    name: 'Layers',
    element: LayerForm,
    permissions: { method: 'GET', actionName: 'Map Management' },
  },
  {
    path: '/layers/add',
    name: 'Add Layer',
    element: AddLayer,
    permissions: { method: 'GET', actionName: 'Map Management' },
  },
  {
    path: '/layers/edit/:id',
    name: 'Edit Layer',
    element: EditLayer,
    permissions: { method: 'GET', actionName: 'Map Management' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
    permissions: { method: 'GET' },
  },
  {
    path: '/users',
    name: 'Users',
    element: Users,
    permissions: { method: 'GET', actionName: 'Seeing users', actionName2: 'Users Management' },
  },
  {
    path: '/roles',
    name: 'Roles',
    element: Roles,
    permissions: { method: 'GET', actionName: 'Seeing roles', actionName2: 'Role Management' },
  },
  {
    path: '/departments',
    name: 'Departments',
    element: Departments,
    permissions: {
      method: 'GET',
      actionName: 'Seeing Departments',
      actionName2: 'Departments Management',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    element: React.lazy(() => import('./views/contact/Contact')),
    permissions: { method: 'GET' },
  },
  {
    path: '/about', 
    name: 'About',
    element: React.lazy(() => import('./views/about/About')),
    permissions: { method: 'GET' },
  },
  // {
  //   path: '/instructions',
  //   name: 'Instructions',
  //   element: InstructionsPage,
  //   permissions: {
  //     method: 'GET',
  //     actionName: 'Seeing Instructions',
  //     actionName2: 'CMS Management',
  //   },
  // },
  // {
  //   path: '/instructor',
  //   name: 'Instructor',
  //   element: InstructionsAdmin,
  //   permissions: { method: 'GET', actionName: 'CMS Management' },
  // },
  // {
  //   path: '/instructor/new',
  //   name: 'Add Instruction',
  //   element: InstructionForm,
  //   permissions: { method: 'GET', actionName: 'CMS Management' },
  // },
  // {
  //   path: '/instructor/edit/:id',
  //   name: 'Edit Instruction',
  //   element: InstructionForm,
  //   permissions: { method: 'GET', actionName: 'CMS Management' },
  // },
]

export default routes
