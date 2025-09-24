import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CTable, 
  CTableHead, 
  CTableRow, 
  CTableHeaderCell, 
  CTableBody, 
  CTableDataCell, 
  CButton, 
  CBadge,
  CContainer,
  CRow,
  CCol,
  CAlert,
  CListGroup,
  CListGroupItem,
  CCollapse
} from '@coreui/react'
import { useNavigation } from '../../hooks/useNavigation'

const Overview = () => {
  const navigate = useNavigate()
  const { assets, departments } = useNavigation()
  const [expandedAssets, setExpandedAssets] = React.useState({})

  // Function to determine risk level based on CVSS score
  const getCVSSRiskLevel = (riskLevel) => {
  if (riskLevel >= 100) return 'Critical'  
  if (riskLevel >= 75) return 'High'
  if (riskLevel >= 50) return 'Medium'
  if (riskLevel >= 0) return 'Low'
  return 'None'
}

  // Function to get badge color based on risk level
  const getRiskBadgeColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Critical': return 'danger'
      case 'High': return 'warning'
      case 'Medium': return 'info'
      case 'Low': return 'success'
      default: return 'secondary'
    }
  }

  // Function to get CVSS badge color
  const getCVSSBadgeColor = (riskLevel) => {
    if (riskLevel >= 100) return 'danger'
    if (riskLevel >= 75) return 'warning'
    if (riskLevel >= 50) return 'info'
    return 'success'
  }

  // Process assets to include vulnerability summary
  const processedAssets = useMemo(() => {
    return assets
      .map(asset => {
        const cves = asset.vulnerabilities?.cves || []
        const hasCVEs = cves.length > 0
        
        // Use the overall device risk level calculated in useNavigation
        const maxRiskLevel = asset.risk_level || 0
        const highestRisk = getCVSSRiskLevel(maxRiskLevel)

        return {
          ...asset,
          cveCount: cves.length,
          hasCVEs,
          highestRisk,
          maxRiskLevel,
          // Sort CVEs by normalized risk level
          cves: cves.sort((a, b) => (b.normalized_risk_level || 0) - (a.normalized_risk_level || 0))
        }
      })
      // Sort assets by overall risk level (highest risk first)
      .sort((a, b) => (b.maxRiskLevel || 0) - (a.maxRiskLevel || 0))
  }, [assets])

  // Calculate summary statistics
  const summary = useMemo(() => {
    const total = processedAssets.length
    const vulnerable = processedAssets.filter(asset => asset.hasCVEs).length
    const safe = total - vulnerable
    const critical = processedAssets.filter(asset => asset.highestRisk === 'Critical').length
    const high = processedAssets.filter(asset => asset.highestRisk === 'High').length
    const medium = processedAssets.filter(asset => asset.highestRisk === 'Medium').length
    const low = processedAssets.filter(asset => asset.highestRisk === 'Low').length

    return { total, vulnerable, safe, critical, high, medium, low }
  }, [processedAssets])

  const handleViewAsset = (assetId) => {
    navigate(`/asset/${assetId}`)
  }

  const toggleAssetExpansion = (assetId) => {
    setExpandedAssets(prev => ({
      ...prev,
      [assetId]: !prev[assetId]
    }))
  }
/*
  const handleReset = () => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.reload()
  }
*/
  return (
    <CContainer fluid>
      {/* Summary Dashboard */}
      <CRow className="mb-4">
        <CCol sm={6} lg={2}>
          <CCard className="text-white bg-primary">
            <CCardBody className="pb-0">
              <div className="fs-4 fw-semibold">{summary.total}</div>
              <div>Total Assets</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} lg={2}>
          <CCard className="text-white bg-success">
            <CCardBody className="pb-0">
              <div className="fs-4 fw-semibold">{summary.safe}</div>
              <div>Safe Assets</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} lg={2}>
          <CCard className="text-white bg-warning">
            <CCardBody className="pb-0">
              <div className="fs-4 fw-semibold">{summary.vulnerable}</div>
              <div>Vulnerable</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} lg={2}>
          <CCard className="text-white bg-danger">
            <CCardBody className="pb-0">
              <div className="fs-4 fw-semibold">{summary.critical + summary.high}</div>
              <div>Critical/High</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} lg={2}>
          <CCard className="text-white bg-info">
            <CCardBody className="pb-0">
              <div className="fs-4 fw-semibold">{summary.medium}</div>
              <div>Medium Risk</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} lg={2}>
          <CCard className="text-white bg-secondary">
            <CCardBody className="pb-0">
              <div className="fs-4 fw-semibold">{summary.low}</div>
              <div>Low Risk</div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Main Assets Table */}
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Security Dashboard - Asset Overview</h4>
                <CBadge color="info" shape="rounded-pill">
                  {summary.total} Total Assets
                </CBadge>
              </div>
            </CCardHeader>
            <CCardBody>
              {processedAssets.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No Assets Found</h5>
                  <p className="text-muted">Start by adding departments and assets using the sidebar buttons.</p>
                </div>
              ) : (
                <>
                  {/* High Priority Alerts */}
                  {summary.critical > 0 && (
                    <CAlert color="danger" className="mb-4">
                      <strong>🚨 Critical Alert:</strong> {summary.critical} asset(s) have CRITICAL vulnerabilities that require immediate attention!
                    </CAlert>
                  )}
                  {summary.high > 0 && (
                    <CAlert color="warning" className="mb-4">
                      <strong>⚠️ High Priority:</strong> {summary.high} asset(s) have HIGH risk vulnerabilities.
                    </CAlert>
                  )}

                  <CTable hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Asset Details</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Security Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Vulnerability Count</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Risk Level</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-center">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {processedAssets.map((asset) => (
                        <React.Fragment key={asset.id}>
                          <CTableRow className={asset.highestRisk === 'Critical' ? 'table-danger' : asset.highestRisk === 'High' ? 'table-warning' : ''}>
                            <CTableDataCell>
                              <div>
                                <strong>{asset.name}</strong>
                                <br />
                                <small className="text-dark">
                                  {asset.vendor} {asset.model && `- ${asset.model}`}
                                </small>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <CBadge color="secondary">
                                {asset.department}
                              </CBadge>
                            </CTableDataCell>
                            <CTableDataCell>
                              {asset.hasCVEs ? (
                                <CBadge color="danger" className="me-1">
                                  🔓 Vulnerable
                                </CBadge>
                              ) : (
                                <CBadge color="success" className="me-1">
                                  🔒 Secure
                                </CBadge>
                              )}
                            </CTableDataCell>
                            <CTableDataCell>
                              {asset.hasCVEs ? (
                                <div>
                                  <CBadge color="warning" className="me-2">
                                    {asset.cveCount} CVEs
                                  </CBadge>
                                  {asset.cveCount > 0 && (
                                    <CButton
                                      size="sm"
                                      color="link"
                                      className="p-0"
                                      onClick={() => toggleAssetExpansion(asset.id)}
                                    >
                                      {expandedAssets[asset.id] ? 'Hide Details' : 'Show Details'}
                                    </CButton>
                                  )}
                                </div>
                              ) : (
                                <CBadge color="success">No CVEs</CBadge>
                              )}
                            </CTableDataCell>
                            <CTableDataCell>
                              <CBadge color={getRiskBadgeColor(asset.highestRisk)} className="me-1">
                                {asset.highestRisk}
                              </CBadge>
                              {asset.maxRiskLevel > 0 && (
                                <small className="text-dark">
                                  (CVSS: {asset.maxRiskLevel})
                                </small>
                              )}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <CButton
                                color="primary"
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewAsset(asset.id)}
                              >
                                Full Details
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
{/*
                          <CButton color="danger" onClick={handleReset}>
                            Reset App
                          </CButton>
*/}
                          {/* Expandable CVE Details */}
                          {asset.hasCVEs && (
                            <CTableRow>
                              <CTableDataCell colSpan={6} className="p-0">
                                <CCollapse visible={expandedAssets[asset.id]}>
                                  <div className="p-3 bg-light">
                                    <h6>CVE Details for {asset.name}:</h6>
                                    <CListGroup flush>
                                      {asset.cves.slice(0, 10).map((cve, index) => (
                                        <CListGroupItem key={index} className="d-flex justify-content-between align-items-start">
                                          <div className="flex-grow-1">
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                              <code className="text-primary me-2">{cve.cve_id}</code>
                                              
                                              {/* CVSS Badge */}
                                              <CBadge color={getCVSSBadgeColor(cve.cvss)} className="me-2">
                                                CVSS: {cve.cvss || 'N/A'}
                                              </CBadge>
                                              
                                              {/* Risk Level Badge - Fix field name */}
                                              {(cve.normalized_risk_level !== undefined && cve.normalized_risk_level !== null) && (
                                                <CBadge color="danger" className="me-2">
                                                  Risk Level: {cve.normalized_risk_level.toFixed(2)}
                                                </CBadge>
                                              )}
                                              
                                              {/* EPSS Badge */}
                                              {(cve.epss !== undefined && cve.epss !== null) && (
                                                <CBadge color="warning" className="me-2">
                                                  EPSS: {(cve.epss * 100).toFixed(2)}%
                                                </CBadge>
                                              )}
                                              
                                              {/* Impact Score Badge */}
                                              {(cve.impact_score !== undefined && cve.impact_score !== null) && (
                                                <CBadge color="info" className="me-2">
                                                  Impact: {cve.impact_score.toFixed(2)}
                                                </CBadge>
                                              )}
                                              
                                              {/* Exploitability Score Badge - Add this missing field */}
                                              {(cve.exploitability_score !== undefined && cve.exploitability_score !== null) && (
                                                <CBadge color="secondary" className="me-2">
                                                  Exploit: {cve.exploitability_score.toFixed(2)}
                                                </CBadge>
                                              )}
                                              
                                              {/* Overall Risk Level Badge */}
                                              <CBadge color={getRiskBadgeColor(getCVSSRiskLevel(cve.risk_level || cve.cvss))}>
                                                {getCVSSRiskLevel(cve.risk_level || cve.cvss)}
                                              </CBadge>
                                            </div>
                                            
                                            {/* Description */}
                                            <div className="small text-muted mt-1">
                                              {cve.description?.substring(0, 150)}
                                              {cve.description?.length > 150 ? '...' : ''}
                                            </div>
                                          </div>
                                        </CListGroupItem>
                                      ))}
                                      {asset.cves.length > 10 && (
                                        <CListGroupItem className="text-center text-muted">
                                          <small>... and {asset.cves.length - 10} more CVEs</small>
                                        </CListGroupItem>
                                      )}
                                    </CListGroup>
                                  </div>
                                </CCollapse>
                              </CTableDataCell>
                            </CTableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </CTableBody>
                  </CTable>
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Overview