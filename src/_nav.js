import React from 'react'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { 
  cilHome, 
  cilSettings, 
  cilAnimal,
  cilChart,
  cilSpeedometer,
  cilFolder,
  cilDescription,
  cilBug
} from '@coreui/icons'
import DynamicNavButtons from './components/DynamicNavButtons'

export const getNavigation = (departments, onAddDepartment, onAddAsset, dynamicNavItems) => [
  // Main Navigation Title
  {
    component: CNavTitle,
    name: 'Security Dashboard',
  },

  // Overview Page
  {
    component: CNavItem,
    name: 'Overview',
    to: '/overview',
    icon: <CIcon icon={cilChart} customClassName="nav-icon"/>,
  },

  // Asset Management Buttons
  {
    component: DynamicNavButtons,
    props: {
      onAddDepartment,
      onAddAsset,
      departments
    }
  },

  // Dynamic Department and Asset Items
  ...dynamicNavItems,

  // Management Section Title
  ...(dynamicNavItems.length > 0 ? [{
    component: CNavTitle,
    name: 'Management',
  }] : []),

  // Data Management
  {
    component: CNavItem,
    name: 'Data Management',
    to: '/datamanagement',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon"/>,
  },

  // Security Tools Section (if there are assets)
  ...(dynamicNavItems.length > 0 ? [
    {
      component: CNavTitle,
      name: 'Security Tools',
    },
    {
      component: CNavGroup,
      name: 'Vulnerability Management',
      icon: <CIcon icon={cilBug} customClassName="nav-icon"/>,
      items: [
        {
          component: CNavItem,
          name: 'Scan Results',
          to: '/vulnerabilities/scan-results',
          badge: {
            color: 'danger',
            text: 'NEW',
          },
        },
        {
          component: CNavItem,
          name: 'CVE Database',
          to: '/vulnerabilities/cve-database',
        },
        {
          component: CNavItem,
          name: 'Risk Assessment',
          to: '/vulnerabilities/risk-assessment',
        }
      ]
    },
    {
      component: CNavGroup,
      name: 'Security Analytics',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
      items: [
        {
          component: CNavItem,
          name: 'Threat Intelligence',
          to: '/analytics/threat-intelligence',
        },
        {
          component: CNavItem,
          name: 'Attack Patterns',
          to: '/analytics/attack-patterns',
        },
        {
          component: CNavItem,
          name: 'Security Metrics',
          to: '/analytics/security-metrics',
        }
      ]
    }
  ] : [])
]