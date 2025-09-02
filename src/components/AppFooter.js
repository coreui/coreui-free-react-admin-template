import React from 'react'
import { CFooter, CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAnimal, cilCheckCircle } from '@coreui/icons'
import { useNavigation } from '../hooks/useNavigation'

const AppFooter = () => {
  const { assets } = useNavigation()
  
  // Calculate security metrics for footer
  const securityStatus = React.useMemo(() => {
    if (assets.length === 0) return { status: 'unknown', message: 'No assets scanned' }
    
    const totalVulns = assets.reduce((sum, asset) => 
      sum + (asset.vulnerabilities?.cves?.length || 0), 0
    )
    
    const criticalVulns = assets.reduce((sum, asset) => 
      sum + (asset.vulnerabilities?.cves?.filter(cve => cve.cvss_score >= 7.0)?.length || 0), 0
    )
    
    if (criticalVulns > 0) {
      return { status: 'critical', message: `${criticalVulns} critical vulnerabilities detected` }
    } else if (totalVulns > 0) {
      return { status: 'warning', message: `${totalVulns} vulnerabilities detected` }
    } else {
      return { status: 'secure', message: 'All systems secure' }
    }
  }, [assets])

  const getStatusColor = () => {
    switch (securityStatus.status) {
      case 'secure': return 'success'
      case 'warning': return 'warning'
      case 'critical': return 'danger'
      default: return 'secondary'
    }
  }

  const getStatusIcon = () => {
    switch (securityStatus.status) {
      case 'secure': return cilCheckCircle
      default: return cilAnimal
    }
  }

  return (
    <CFooter className="px-4">
      <div className="d-flex align-items-center">
        <CIcon icon={cilAnimal} className="me-2" />
        <span className="me-2">CyberSec Dashboard</span>
        <span className="text-muted">&copy; 2025 Security Operations.</span>
      </div>
      <div className="ms-auto d-flex align-items-center gap-3">
        {/* Security Status Indicator */}
        <div className="d-flex align-items-center gap-2">
          <CIcon 
            icon={getStatusIcon()} 
            size="sm" 
            className={`text-${getStatusColor()}`}
          />
          <small className="text-muted">Status:</small>
          <CBadge color={getStatusColor()} className="me-2">
            {securityStatus.message}
          </CBadge>
        </div>
        
        {/* Asset Count */}
        <div className="d-flex align-items-center gap-1">
          <small className="text-muted">Assets:</small>
          <CBadge color="info">{assets.length}</CBadge>
        </div>
        
        {/* Last Updated */}
        <small className="text-muted">
          Updated: {new Date().toLocaleTimeString()}
        </small>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)