/*import React, { useMemo } from 'react'
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
  CCol
} from '@coreui/react'
import { useNavigation } from '../../hooks/useNavigation'

const Overview = () => {
  const navigate = useNavigate()
  const { assets } = useNavigation()

  // Generate random CVE numbers and risk levels for each asset
  const enrichedAssets = useMemo(() => {
    return assets.map(asset => {
      // Generate a consistent random CVE based on asset ID (so it doesn't change on re-render)
      const seed = asset.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
      const cveYear = 2020 + (seed % 5) // CVE years between 2020-2024
      const cveNumber = (seed % 9999) + 1000 // CVE numbers between 1000-9999
      const cve = `CVE-${cveYear}-${cveNumber}`
      
      // Generate consistent risk level
      const riskLevels = ['Low', 'Medium', 'High', 'Critical']
      const riskColors = ['success', 'warning', 'danger', 'dark']
      const riskIndex = seed % 4
      const riskLevel = riskLevels[riskIndex]
      const riskColor = riskColors[riskIndex]
      
      return {
        ...asset,
        cve,
        riskLevel,
        riskColor
      }
    })
  }, [assets])

  const handleViewAsset = (assetId) => {
    navigate(`/asset/${assetId}`)
  }

  const getRiskBadgeVariant = (riskLevel) => {
    switch (riskLevel) {
      case 'Low': return 'success'
      case 'Medium': return 'warning'
      case 'High': return 'danger'
      case 'Critical': return 'dark'
      default: return 'secondary'
    }
  }

  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Vulnerabilities Overview</h4>
                <CBadge color="info" shape="rounded-pill">
                  {assets.length} Total Vulnerabilies
                </CBadge>
              </div>
            </CCardHeader>
            <CCardBody>
              {enrichedAssets.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No Vulnerable Assets Found</h5>
                  <p className="text-muted">Start by adding departments and assets using the sidebar buttons.</p>
                </div>
              ) : (
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Device Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                      <CTableHeaderCell scope="col">CVE ID</CTableHeaderCell>
                      <CTableHeaderCell scope="col">CVE Risk Level</CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="text-center">More Details</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {enrichedAssets.map((asset) => (
                      <CTableRow key={asset.id}>
                        <CTableDataCell>
                          <div>
                            <strong>{asset.name}</strong>
                            <br />
                            <small className="text-muted">
                              {asset.vendor} - {asset.deviceType}
                            </small>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color="secondary" className="me-1">
                            {asset.department}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <code className="text-primary">{asset.cve}</code>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={getRiskBadgeVariant(asset.riskLevel)}>
                            {asset.riskLevel}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                            color="primary"
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewAsset(asset.id)}
                          >
                            View Details
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      */
      {/* Optional: Summary cards */}/*
      {enrichedAssets.length > 0 && (
        <CRow className="mt-4">
          <CCol sm={6} lg={3}>
            <CCard className="text-white bg-success">
              <CCardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fs-4 fw-semibold">
                      {enrichedAssets.filter(a => a.riskLevel === 'Low').length}
                    </div>
                    <div>Low Risk</div>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6} lg={3}>
            <CCard className="text-white bg-warning">
              <CCardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fs-4 fw-semibold">
                      {enrichedAssets.filter(a => a.riskLevel === 'Medium').length}
                    </div>
                    <div>Medium Risk</div>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6} lg={3}>
            <CCard className="text-white bg-danger">
              <CCardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fs-4 fw-semibold">
                      {enrichedAssets.filter(a => a.riskLevel === 'High').length}
                    </div>
                    <div>High Risk</div>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6} lg={3}>
            <CCard className="text-white bg-dark">
              <CCardBody>
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fs-4 fw-semibold">
                      {enrichedAssets.filter(a => a.riskLevel === 'Critical').length}
                    </div>
                    <div>Critical Risk</div>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </CContainer>
  )
}

export default Overview*/

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
  const { assets } = useNavigation()
  const [expandedAssets, setExpandedAssets] = React.useState({})

  // Function to determine risk level based on CVSS score
  const getCVSSRiskLevel = (cvssScore) => {
    if (cvssScore >= 9.0) return 'Critical'
    if (cvssScore >= 7.0) return 'High' 
    if (cvssScore >= 4.0) return 'Medium'
    if (cvssScore >= 0.1) return 'Low'
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
  const getCVSSBadgeColor = (cvssScore) => {
    if (cvssScore >= 9.0) return 'danger'
    if (cvssScore >= 7.0) return 'warning' 
    if (cvssScore >= 4.0) return 'info'
    return 'success'
  }

  // Process assets to include vulnerability summary
  const processedAssets = useMemo(() => {
    return assets.map(asset => {
      const cves = asset.vulnerabilities?.cves || []
      const hasCVEs = cves.length > 0
      
      // Calculate highest risk level
      let highestRisk = 'None'
      let maxCvss = 0
      
      if (hasCVEs) {
        maxCvss = Math.max(...cves.map(cve => cve.cvss || 0))
        highestRisk = getCVSSRiskLevel(maxCvss)
      }

      return {
        ...asset,
        cveCount: cves.length,
        hasCVEs,
        highestRisk,
        maxCvss,
        cves: cves.sort((a, b) => (b.cvss || 0) - (a.cvss || 0)) // Sort by CVSS descending
      }
    })
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
                        <CTableHeaderCell scope="col">Highest Risk</CTableHeaderCell>
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
                                <small className="text-muted">
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
                              {asset.maxCvss > 0 && (
                                <small className="text-muted">
                                  (CVSS: {asset.maxCvss})
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
                          
                          {/* Expandable CVE Details */}
                          {asset.hasCVEs && (
                            <CTableRow>
                              <CTableDataCell colSpan={6} className="p-0">
                                <CCollapse visible={expandedAssets[asset.id]}>
                                  <div className="p-3 bg-light">
                                    <h6>CVE Details for {asset.name}:</h6>
                                    <CListGroup flush>
                                      {asset.cves.slice(0, 10).map((cve, index) => (
                                        <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                                          <div>
                                            <code className="text-primary me-2">{cve.cve_id}</code>
                                            <CBadge color={getCVSSBadgeColor(cve.cvss)} className="me-2">
                                              CVSS: {cve.cvss || 'N/A'}
                                            </CBadge>
                                            {cve.epss && (
                                              <CBadge color="secondary" className="me-2">
                                                EPSS: {(cve.epss * 100).toFixed(1)}%
                                              </CBadge>
                                            )}
                                            <CBadge color={getRiskBadgeColor(getCVSSRiskLevel(cve.cvss))}>
                                              {getCVSSRiskLevel(cve.cvss)}
                                            </CBadge>
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