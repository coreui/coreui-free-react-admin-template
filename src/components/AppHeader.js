import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CListGroup,
  CListGroupItem,
  CProgress,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilAnimal,
  cilShieldAlt,
  cilBug,
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
  cilWarning,
  cilCheckCircle,
  cilTriangle,
  cilSettings,
  cilReload,
  cilChart,
  cilBell
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { useNavigation } from '../hooks/useNavigation'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const { assets } = useNavigation()
  
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // Security Status States
  const [securityAlerts, setSecurityAlerts] = useState([])
  const [showAlertsModal, setShowAlertsModal] = useState(false)
  const [showSecurityStatus, setShowSecurityStatus] = useState(false)
  const [lastScanTime, setLastScanTime] = useState(new Date())

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  // Calculate security metrics from assets
  const securityMetrics = React.useMemo(() => {
    let totalVulns = 0
    let criticalVulns = 0
    let highRiskAssets = 0

    assets.forEach(asset => {
      if (asset.vulnerabilities?.cves) {
        totalVulns += asset.vulnerabilities.cves.length
        criticalVulns += asset.vulnerabilities.cves.filter(cve => 
          cve.cvss_score >= 7.0
        ).length
      }
      if (asset.risk_level >= 7) {
        highRiskAssets++
      }
    })

    const overallRisk = assets.length > 0 
      ? Math.round(assets.reduce((sum, asset) => sum + (asset.risk_level || 0), 0) / assets.length)
      : 0

    return {
      totalAssets: assets.length,
      totalVulnerabilities: totalVulns,
      criticalVulnerabilities: criticalVulns,
      highRiskAssets,
      overallRiskScore: overallRisk,
      securityStatus: overallRisk <= 3 ? 'good' : overallRisk <= 6 ? 'warning' : 'critical'
    }
  }, [assets])

  // Simulate security alerts (in real app, this would come from your backend)
  useEffect(() => {
    const alerts = [
      {
        id: 1,
        type: 'critical',
        title: 'Critical Vulnerability Detected',
        message: 'CVE-2024-1234 found in 3 assets',
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 2,
        type: 'warning',
        title: 'Outdated Software Detected',
        message: '5 assets need security updates',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ]
    setSecurityAlerts(alerts)
  }, [assets])

  const getSecurityStatusColor = () => {
    switch (securityMetrics.securityStatus) {
      case 'good': return 'success'
      case 'warning': return 'warning'
      case 'critical': return 'danger'
      default: return 'secondary'
    }
  }

  const getSecurityStatusIcon = () => {
    switch (securityMetrics.securityStatus) {
      case 'good': return cilCheckCircle
      case 'warning': return cilTriangle
      case 'critical': return cilWarning
      default: return cilShieldAlt
    }
  }

  return (
    <>
      <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
        <CContainer className="border-bottom px-4" fluid>
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          
          {/* Main Navigation */}
          <CHeaderNav className="d-none d-md-flex">
            <CNavItem>
              <CNavLink to="/overview" as={NavLink}>
                <CIcon icon={cilChart} className="me-1" />
                Overview
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/datamanagement" as={NavLink}>
                <CIcon icon={cilSettings} className="me-1" />
                Management
              </CNavLink>
            </CNavItem>
          </CHeaderNav>

          {/* Security Tools */}
          <CHeaderNav className="ms-auto">
            {/* Security Alerts */}
            <CNavItem>
              <CNavLink 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  setShowAlertsModal(true)
                }}
                className="position-relative"
              >
                <CIcon icon={cilBell} size="lg" />
                {securityAlerts.length > 0 && (
                  <CBadge 
                    color="danger" 
                    position="top-end" 
                    shape="rounded-pill"
                    className="position-absolute"
                  >
                    {securityAlerts.length}
                  </CBadge>
                )}
              </CNavLink>
            </CNavItem>

            {/* Vulnerability Scanner */}
            <CNavItem>
              <CNavLink 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  // Implement scan functionality
                  setLastScanTime(new Date())
                  alert('Vulnerability scan initiated...')
                }}
                title="Run Vulnerability Scan"
              >
                <CIcon icon={cilBug} size="lg" />
              </CNavLink>
            </CNavItem>

            {/* Security Status Indicator */}
            <CNavItem>
              <CNavLink 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setShowSecurityStatus(true)
                }}
                className="position-relative"
              >
                <CIcon 
                  icon={getSecurityStatusIcon()} 
                  size="lg" 
                  className={`text-${getSecurityStatusColor()}`}
                />
                <CBadge 
                  color={getSecurityStatusColor()} 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.6rem', padding: '0.2rem 0.4rem' }}
                >
                  {securityMetrics.overallRiskScore}
                </CBadge>
              </CNavLink>
            </CNavItem>
          </CHeaderNav>

          {/* Theme Switcher */}
          <CHeaderNav>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <CDropdown variant="nav-item" placement="bottom-end">
              <CDropdownToggle caret={false}>
                {colorMode === 'dark' ? (
                  <CIcon icon={cilMoon} size="lg" />
                ) : colorMode === 'auto' ? (
                  <CIcon icon={cilContrast} size="lg" />
                ) : (
                  <CIcon icon={cilSun} size="lg" />
                )}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  active={colorMode === 'light'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('light')}
                >
                  <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                </CDropdownItem>
                <CDropdownItem
                  active={colorMode === 'dark'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('dark')}
                >
                  <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                </CDropdownItem>
                <CDropdownItem
                  active={colorMode === 'auto'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('auto')}
                >
                  <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CHeaderNav>
        </CContainer>
        
        {/* Security Status Bar */}
        {securityMetrics.totalAssets > 0 && (
          <CContainer className="px-4 py-2 bg-body-tertiary" fluid>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <small className="text-muted">Security Overview:</small>
                <div className="d-flex align-items-center gap-1">
                  <CIcon icon={cilShieldAlt} size="sm" />
                  <small>{securityMetrics.totalAssets} Assets</small>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <CIcon icon={cilBug} size="sm" className="text-danger" />
                  <small>{securityMetrics.totalVulnerabilities} Vulnerabilities</small>
                </div>
                {securityMetrics.criticalVulnerabilities > 0 && (
                  <div className="d-flex align-items-center gap-1">
                    <CIcon icon={cilWarning} size="sm" className="text-danger" />
                    <small className="text-danger">{securityMetrics.criticalVulnerabilities} Critical</small>
                  </div>
                )}
              </div>
              <small className="text-muted">
                Last scan: {lastScanTime.toLocaleTimeString()}
              </small>
            </div>
          </CContainer>
        )}
        
        {/* Breadcrumb */}
        <CContainer className="px-4" fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>

      {/* Security Alerts Modal */}
      <CModal visible={showAlertsModal} onClose={() => setShowAlertsModal(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Security Alerts</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {securityAlerts.length > 0 ? (
            <CListGroup>
              {securityAlerts.map(alert => (
                <CListGroupItem key={alert.id} className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold d-flex align-items-center gap-2">
                      <CIcon 
                        icon={alert.type === 'critical' ? cilWarning : cilTriangle} 
                        className={alert.type === 'critical' ? 'text-danger' : 'text-warning'}
                      />
                      {alert.title}
                    </div>
                    <p className="mb-1">{alert.message}</p>
                    <small className="text-muted">
                      {alert.timestamp.toLocaleString()}
                    </small>
                  </div>
                  <CBadge color={alert.type === 'critical' ? 'danger' : 'warning'}>
                    {alert.type}
                  </CBadge>
                </CListGroupItem>
              ))}
            </CListGroup>
          ) : (
            <CAlert color="success">
              <CIcon icon={cilCheckCircle} className="me-2" />
              No security alerts at this time.
            </CAlert>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowAlertsModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Security Status Modal */}
      <CModal visible={showSecurityStatus} onClose={() => setShowSecurityStatus(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Security Status Dashboard</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Overall Security Score</span>
                <strong className={`text-${getSecurityStatusColor()}`}>
                  {securityMetrics.overallRiskScore}/10
                </strong>
              </div>
              <CProgress 
                color={getSecurityStatusColor()} 
                value={securityMetrics.overallRiskScore * 10}
              />
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>High Risk Assets</span>
                <strong className="text-danger">
                  {securityMetrics.highRiskAssets}/{securityMetrics.totalAssets}
                </strong>
              </div>
              <CProgress 
                color="danger" 
                value={securityMetrics.totalAssets > 0 ? (securityMetrics.highRiskAssets / securityMetrics.totalAssets) * 100 : 0}
              />
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-6 col-md-3 text-center">
              <div className="h4 mb-0">{securityMetrics.totalAssets}</div>
              <small className="text-muted">Total Assets</small>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="h4 mb-0 text-warning">{securityMetrics.totalVulnerabilities}</div>
              <small className="text-muted">Vulnerabilities</small>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="h4 mb-0 text-danger">{securityMetrics.criticalVulnerabilities}</div>
              <small className="text-muted">Critical</small>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="h4 mb-0 text-danger">{securityMetrics.highRiskAssets}</div>
              <small className="text-muted">High Risk</small>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowSecurityStatus(false)}>
            Close
          </CButton>
          <CButton color="primary">
            <CIcon icon={cilReload} className="me-2" />
            Refresh Status
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AppHeader