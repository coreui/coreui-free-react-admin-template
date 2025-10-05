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
    key: 'title-security-dashboard',
  },
  {
    component: CNavItem,
    name: 'Overview',
    to: '/overview',
    icon: <CIcon icon={cilChart} customClassName="nav-icon"/>,
    key: 'nav-overview',
  },
  {
    component: DynamicNavButtons,
    key: 'dynamic-nav-buttons',
    props: {
      onAddDepartment,
      onAddAsset,
      departments
    }
  },
  ...dynamicNavItems,
  
  ...(dynamicNavItems.length > 0 ? [{
    component: CNavTitle,
    name: 'Management',
    key: 'title-management',
  }] : []),
  
  {
    component: CNavItem,
    name: 'Data Management',
    to: '/datamanagement',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon"/>,
    key: 'nav-data-management',
  },

  // Security Tools Section (if there are assets)
  ...(dynamicNavItems.length > 0 ? [
    {
      component: CNavTitle,
      name: 'Security Tools',
      key: 'title-security-tools',
    },
    {
      component: CNavGroup,
      name: 'Vulnerability Management',
      key: 'group-vuln-mgmt',
      icon: <CIcon icon={cilBug} customClassName="nav-icon"/>,
      items: [
        {
          key: 'vuln-scan-results',
          component: CNavItem,
          name: 'Scan Results',
          to: '#',
          disabled: true,
          badge: {
            color: 'secondary',
            text: 'COMING SOON',
          },
        },
        {
          key: 'vuln-cve-db',
          component: CNavItem,
          name: 'CVE Database',
          to: '#',
          disabled: true,
          badge: {
            color: 'secondary',
            text: 'COMING SOON',
          },
        },
        {
          key: 'vuln-risk-assess',
          component: CNavItem,
          name: 'Risk Assessment',
          to: '#',
          disabled: true,
          badge: {
            color: 'secondary',
            text: 'COMING SOON',
          },
        }
      ]
    },
    {
      component: CNavGroup,
      name: 'Security Analytics',
      key: 'group-sec-analytics',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
      items: [
        {
          key: 'analytics-threat-intel',
          component: CNavItem,
          name: 'Threat Intelligence',
          to: '#',
          disabled: true,
          badge: {
            color: 'secondary',
            text: 'COMING SOON',
          },
        },
        {
          key: 'analytics-attack-patterns',
          component: CNavItem,
          name: 'Attack Patterns',
          to: '#',
          disabled: true,
          badge: {
            color: 'secondary',
            text: 'COMING SOON',
          },
        },
        {
          key: 'analytics-sec-metrics',
          component: CNavItem,
          name: 'Security Metrics',
          to: '#',
          disabled: true,
          badge: {
            color: 'secondary',
            text: 'COMING SOON',
          },
        }
      ]
    }
  ] : [])
]