import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilShieldAlt, cilBug } from '@coreui/icons'
import { AppSidebarNav } from './AppSidebarNav'
import { getNavigation } from '../_nav'
import { useNavigation } from '../hooks/useNavigation'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  
  // Use our custom navigation hook
  const { departments, assets, addDepartment, addAsset, dynamicNavItems } = useNavigation()
  
  // Get the complete navigation with dynamic items
  const navigation = getNavigation(departments, addDepartment, addAsset, dynamicNavItems)

  // Calculate security metrics for sidebar
  const securityMetrics = React.useMemo(() => {
    let totalVulns = 0
    let criticalVulns = 0

    assets.forEach(asset => {
      if (asset.vulnerabilities?.cves) {
        totalVulns += asset.vulnerabilities.cves.length
        // Use backend's risk_level for critical determination
        criticalVulns += asset.vulnerabilities.cves.filter(cve => 
          (cve.risk_level && cve.risk_level >= 75) || (cve.cvss_score >= 7.0)
        ).length
      }
    })

    return {
      totalAssets: assets.length,
      totalVulnerabilities: totalVulns,
      criticalVulnerabilities: criticalVulns
    }
  }, [assets])

  return (
    <CSidebar
      className="d-print-none sidebar sidebar-fixed"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/" className="d-flex align-items-center">
          <CIcon icon={cilShieldAlt} height={32} className="me-2" />
          <div className="sidebar-brand-full">
            <div className="fw-bold text-light">CyberSec</div>
            <small className="text-light-emphasis">Dashboard</small>
          </div>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* Security Metrics Header */}
      {securityMetrics.totalAssets > 0 && (
        <div className="px-3 py-2 border-bottom border-secondary">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-light-emphasis">Security Status</small>
          </div>
          <div className="row g-2">
            <div className="col-6">
              <div className="text-center">
                <div className="fs-6 fw-semibold text-info">{securityMetrics.totalAssets}</div>
                <small className="text-light-emphasis">Assets</small>
              </div>
            </div>
            <div className="col-6">
              <div className="text-center">
                <div className="fs-6 fw-semibold text-warning">
                  {securityMetrics.totalVulnerabilities}
                </div>
                <small className="text-light-emphasis">Vulns</small>
              </div>
            </div>
          </div>
          {securityMetrics.criticalVulnerabilities > 0 && (
            <div className="mt-2 text-center">
              <CBadge color="danger" className="d-flex align-items-center justify-content-center gap-1">
                <CIcon icon={cilBug} size="sm" />
                {securityMetrics.criticalVulnerabilities} Critical
              </CBadge>
            </div>
          )}
        </div>
      )}

      <AppSidebarNav items={navigation} />
      
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <div className="d-flex justify-content-between w-100 align-items-center px-3">
          <small className="text-light-emphasis">
            v1.0.0
          </small>
          <CSidebarToggler
            onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
          />
        </div>
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)