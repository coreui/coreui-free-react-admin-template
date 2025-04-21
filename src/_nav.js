// _nav.js
import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilMap, cilUser, cilDescription, cilEducation, cilLayers } from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />, 
    permissions: { actionName: 'Dashboard' },
  },
  {
    component: CNavGroup,
    name: 'HRM',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
     
      { component: CNavItem, name: 'Departments', to: '/departments', permissions: { actionName: 'Seeing Departments', actionName2:"Departments Management" } },
      { component: CNavItem, name: 'Roles', to: '/roles', permissions: { actionName: 'Seeing roles', actionName2:"Role Management" } },
      { component: CNavItem, name: 'Users', to: '/users', permissions: { actionName: 'Seeing users', actionName2:'Users Management' } },
    ],
  },
  {
    component: CNavItem,
    name: 'Map',
    to: '/map',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />, 
    permissions: { actionName: "Xaritani ko'rish",actionName2:"Map Management"},
  },
  {
    component: CNavItem,
    name: 'Layers',
    to: '/layers',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />, 
    permissions: { actionName:"Map Management"},
  },
  // {
  //   component: CNavItem,
  //   name: 'Instructor',
  //   to: '/instructor',
  //   icon: <CIcon icon={cilEducation} customClassName="nav-icon" />, 
  //   permissions: { actionName: "CMS Management" },
  // },
  // {
  //   component: CNavItem,
  //   name: 'Instructions',
  //   to: '/instructions',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />, 
  //   permissions: { actionName: "CMS Management", actionName2:"Seeing Instructions" },
  // },
  
];

export default _nav;
