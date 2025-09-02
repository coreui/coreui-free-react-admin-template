import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CButton, 
  CBadge,
  CContainer,
  CRow,
  CCol,
  CListGroup,
  CListGroupItem,
  CFormInput,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
  CAlert
} from '@coreui/react'
import { useNavigation } from '../../hooks/useNavigation'

const AssetDetail = () => {
  const { assetId } = useParams()
  const navigate = useNavigate()
  const { assets } = useNavigation()

  const asset = assets.find(a => a.id === assetId)

  // Generate the same random data as in Overview (consistent based on asset ID)
  const enrichedAsset = useMemo(() => {
    if (!asset) return null
    
    // Check if we have vulnerability data
    const hasVulnerabilities = asset.vulnerabilities && (
      (asset.vulnerabilities.cves && asset.vulnerabilities.cves.length > 0) ||
      (asset.vulnerabilities.cwes && asset.vulnerabilities.cwes.length > 0) ||
      (asset.vulnerabilities.capecs && asset.vulnerabilities.capecs.length > 0) ||
      (asset.vulnerabilities.attacks && asset.vulnerabilities.attacks.length > 0)
    )
    
    // Generate consistent mock network data based on asset ID
    const seed = asset.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    const serialNumber = `SN${(seed % 999999).toString().padStart(6, '0')}`
    const ipAddress = `192.168.${(seed % 255) + 1}.${((seed * 7) % 255) + 1}`
    const macAddress = `00:${((seed % 255).toString(16).padStart(2, '0'))}:${(((seed * 3) % 255).toString(16).padStart(2, '0'))}:${(((seed * 5) % 255).toString(16).padStart(2, '0'))}:${(((seed * 7) % 255).toString(16).padStart(2, '0'))}:${(((seed * 11) % 255).toString(16).padStart(2, '0'))}`
    const lastScanDate = asset.last_updated ? new Date(asset.last_updated).toLocaleDateString() : new Date().toLocaleDateString()
    const osVersion = asset.version || `${asset.vendor || 'Generic'} OS v${(seed % 5) + 1}.${(seed % 10)}`
    
    return {
      ...asset,
      hasVulnerabilities,
      serialNumber,
      ipAddress,
      macAddress,
      lastScanDate,
      osVersion,
      // Calculate risk level based on vulnerabilities if they exist
      riskLevel: hasVulnerabilities && asset.vulnerabilities.cves?.length > 0 
        ? (() => {
            const maxCvss = Math.max(...asset.vulnerabilities.cves.map(cve => cve.cvss || 0))
            if (maxCvss >= 9.0) return 'Critical'
            if (maxCvss >= 7.0) return 'High' 
            if (maxCvss >= 4.0) return 'Medium'
            return 'Low'
          })()
        : 'Secure'
    }
  }, [asset])

  const [editableFields, setEditableFields] = useState({
    ipAddress: enrichedAsset?.ipAddress || '',
    macAddress: enrichedAsset?.macAddress || '',
    osVersion: enrichedAsset?.osVersion || ''
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (enrichedAsset) {
      setEditableFields({
        ipAddress: enrichedAsset.ipAddress,
        macAddress: enrichedAsset.macAddress,
        osVersion: enrichedAsset.osVersion
      })
    }
  }, [enrichedAsset])

  if (!enrichedAsset) {
    return (
      <CContainer fluid>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Asset Not Found</h4>
                  <CButton 
                    color="secondary" 
                    variant="outline"
                    onClick={() => navigate('/overview')}
                  >
                    Back to Overview
                  </CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                The requested asset could not be found.
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    )
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
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h4 className="mb-0">{enrichedAsset.name}</h4>
                    {enrichedAsset.hasVulnerabilities ? (
                      <CBadge color="warning" size="sm">
                        ⚠️ Vulnerabilities Found
                      </CBadge>
                    ) : (
                      <CBadge color="success" size="sm">
                        ✅ Secure
                      </CBadge>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <CBadge color="secondary">{enrichedAsset.department}</CBadge>
                    <CBadge color="info">{enrichedAsset.type}</CBadge>
                  </div>
                </div>
                <CButton 
                  color="secondary" 
                  variant="outline"
                  onClick={() => navigate('/overview')}
                >
                  Back to Overview
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              {/* Device Information Section */}
              <CRow className="mb-4">
                <CCol md={6}>
                  <h5>Device Information</h5>
                  <CListGroup flush>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Name:</strong>
                      <span>{enrichedAsset.name}</span>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Vendor:</strong>
                      <span>{enrichedAsset.vendor}</span>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Model:</strong>
                      <span>{enrichedAsset.model}</span>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Department:</strong>
                      <CBadge color="secondary">{enrichedAsset.department}</CBadge>
                    </CListGroupItem>
                  </CListGroup>
                </CCol>
                
                <CCol md={6}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5>Network & System Info</h5>
                    <CButton 
                      size="sm" 
                      color={isEditing ? "success" : "primary"} 
                      variant="outline"
                      onClick={() => {
                        if (isEditing) {
                          // Save logic here if needed
                          setIsEditing(false)
                        } else {
                          setIsEditing(true)
                        }
                      }}
                    >
                      {isEditing ? "Save" : "Edit"}
                    </CButton>
                  </div>
                  
                  <CListGroup flush>
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <strong>IP Address:</strong>
                      {isEditing ? (
                        <CFormInput
                          size="sm"
                          value={editableFields.ipAddress}
                          onChange={(e) => setEditableFields(prev => ({...prev, ipAddress: e.target.value}))}
                          style={{ width: '150px' }}
                        />
                      ) : (
                        <code>{editableFields.ipAddress}</code>
                      )}
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <strong>MAC Address:</strong>
                      {isEditing ? (
                        <CFormInput
                          size="sm"
                          value={editableFields.macAddress}
                          onChange={(e) => setEditableFields(prev => ({...prev, macAddress: e.target.value}))}
                          style={{ width: '150px' }}
                        />
                      ) : (
                        <code>{editableFields.macAddress}</code>
                      )}
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <strong>OS Version:</strong>
                      {isEditing ? (
                        <CFormInput
                          size="sm"
                          value={editableFields.osVersion}
                          onChange={(e) => setEditableFields(prev => ({...prev, osVersion: e.target.value}))}
                          style={{ width: '150px' }}
                        />
                      ) : (
                        <span>{editableFields.osVersion}</span>
                      )}
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Last Scan:</strong>
                      <span>{enrichedAsset.lastScanDate}</span>
                    </CListGroupItem>
                  </CListGroup>
                </CCol>
              </CRow>

              {/* Security Status Section */}
              <CRow className="mb-4">
                <CCol xs={12}>
                  <h5>Security Status</h5>
                  {enrichedAsset.hasVulnerabilities ? (
                    <CAlert color="warning">
                      <strong>⚠️ Vulnerabilities Found</strong> - This device has known security vulnerabilities that require attention.
                    </CAlert>
                  ) : (
                    <CAlert color="success">
                      <strong>✅ No Vulnerable CVEs Found</strong> - This device appears to be secure with no known critical vulnerabilities.
                    </CAlert>
                  )}
                </CCol>
              </CRow>

              {/* Vulnerability Details Section - Only show if vulnerabilities exist */}
              {enrichedAsset.hasVulnerabilities && (
                <CRow className="mb-4">
                  <CCol xs={12}>
                    <h5>Vulnerability Details</h5>
                    <CTabs activeItemKey="cves">
                      <CTabList variant="pills" className="mb-3">
                        {enrichedAsset.vulnerabilities.cves?.length > 0 && (
                          <CTab itemKey="cves">
                            CVEs ({enrichedAsset.vulnerabilities.cves.length})
                          </CTab>
                        )}
                        {enrichedAsset.vulnerabilities.cwes?.length > 0 && (
                          <CTab itemKey="cwes">
                            CWEs ({enrichedAsset.vulnerabilities.cwes.length})
                          </CTab>
                        )}
                        {enrichedAsset.vulnerabilities.capecs?.length > 0 && (
                          <CTab itemKey="capecs">
                            CAPECs ({enrichedAsset.vulnerabilities.capecs.length})
                          </CTab>
                        )}
                        {enrichedAsset.vulnerabilities.attacks?.length > 0 && (
                          <CTab itemKey="attacks">
                            ATT&CK ({enrichedAsset.vulnerabilities.attacks.length})
                          </CTab>
                        )}
                      </CTabList>
                      
                      <CTabContent>
                        {enrichedAsset.vulnerabilities.cves?.length > 0 && (
                          <CTabPanel className="py-3" itemKey="cves">
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              <CListGroup>
                                {enrichedAsset.vulnerabilities.cves.map((cve, index) => (
                                  <CListGroupItem key={index} className="border-0 border-bottom">
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div className="flex-grow-1">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                          <code className="text-primary fw-bold">{cve.cve_id}</code>
                                          <CBadge 
                                            color={
                                              cve.cvss >= 9.0 ? 'danger' : 
                                              cve.cvss >= 7.0 ? 'warning' : 
                                              cve.cvss >= 4.0 ? 'info' : 'secondary'
                                            }
                                          >
                                            CVSS: {cve.cvss || 'N/A'}
                                          </CBadge>
                                          {cve.epss && (
                                            <CBadge color="light" className="text-dark">
                                              EPSS: {(cve.epss * 100).toFixed(1)}%
                                            </CBadge>
                                          )}
                                        </div>
                                        <p className="mb-1 small text-muted">
                                          {cve.description?.substring(0, 200)}
                                          {cve.description?.length > 200 && '...'}
                                        </p>
                                      </div>
                                    </div>
                                  </CListGroupItem>
                                ))}
                              </CListGroup>
                            </div>
                          </CTabPanel>
                        )}
                        
                        {enrichedAsset.vulnerabilities.cwes?.length > 0 && (
                          <CTabPanel className="py-3" itemKey="cwes">
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              <CListGroup>
                                {enrichedAsset.vulnerabilities.cwes.map((cwe, index) => (
                                  <CListGroupItem key={index} className="border-0 border-bottom">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                      <code className="text-info fw-bold">{cwe.cwe_id}</code>
                                      <span className="fw-semibold">{cwe.name}</span>
                                    </div>
                                    <p className="mb-0 small text-muted">
                                      {cwe.description?.substring(0, 150)}
                                      {cwe.description?.length > 150 && '...'}
                                    </p>
                                  </CListGroupItem>
                                ))}
                              </CListGroup>
                            </div>
                          </CTabPanel>
                        )}
                        
                        {enrichedAsset.vulnerabilities.capecs?.length > 0 && (
                          <CTabPanel className="py-3" itemKey="capecs">
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              <CListGroup>
                                {enrichedAsset.vulnerabilities.capecs.map((capec, index) => (
                                  <CListGroupItem key={index} className="border-0 border-bottom">
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div className="flex-grow-1">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                          <code className="text-warning fw-bold">{capec.capec_id}</code>
                                          <span className="fw-semibold">{capec.name}</span>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                          <CBadge color="secondary">
                                            Severity: {capec.typical_severity || 'Unknown'}
                                          </CBadge>
                                          <CBadge color="light" className="text-dark">
                                            Likelihood: {capec.likelihood_of_attack || 'Unknown'}
                                          </CBadge>
                                        </div>
                                        <p className="mb-0 small text-muted">
                                          {capec.description?.substring(0, 150)}
                                          {capec.description?.length > 150 && '...'}
                                        </p>
                                      </div>
                                    </div>
                                  </CListGroupItem>
                                ))}
                              </CListGroup>
                            </div>
                          </CTabPanel>
                        )}
                        
                        {enrichedAsset.vulnerabilities.attacks?.length > 0 && (
                          <CTabPanel className="py-3" itemKey="attacks">
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              <CListGroup>
                                {enrichedAsset.vulnerabilities.attacks.map((attack, index) => (
                                  <CListGroupItem key={index} className="border-0 border-bottom">
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div className="flex-grow-1">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                          <code className="text-danger fw-bold">{attack.technique_id}</code>
                                          <span className="fw-semibold">{attack.name}</span>
                                        </div>
                                        <div className="d-flex flex-wrap gap-1 mb-2">
                                          {attack.tactics && (
                                            <CBadge color="danger" className="small">
                                              {attack.tactics}
                                            </CBadge>
                                          )}
                                          {attack.platforms && (
                                            <CBadge color="secondary" className="small">
                                              {attack.platforms.length > 20 ? attack.platforms.substring(0, 20) + '...' : attack.platforms}
                                            </CBadge>
                                          )}
                                        </div>
                                        <p className="mb-0 small text-muted">
                                          {attack.description?.substring(0, 150)}
                                          {attack.description?.length > 150 && '...'}
                                        </p>
                                      </div>
                                    </div>
                                  </CListGroupItem>
                                ))}
                              </CListGroup>
                            </div>
                          </CTabPanel>
                        )}
                      </CTabContent>
                    </CTabs>
                  </CCol>
                </CRow>
              )}

              {/* Summary Section */}
              <CRow>
                <CCol xs={12}>
                  <hr />
                  {enrichedAsset.hasVulnerabilities ? (
                    <CAlert color="danger" className="mb-0">
                      <strong>Action Required:</strong> This device has {
                        (enrichedAsset.vulnerabilities.cves?.length || 0) + 
                        (enrichedAsset.vulnerabilities.cwes?.length || 0) + 
                        (enrichedAsset.vulnerabilities.capecs?.length || 0) + 
                        (enrichedAsset.vulnerabilities.attacks?.length || 0)
                      } security findings that should be reviewed and addressed.
                    </CAlert>
                  ) : (
                    <CAlert color="success" className="mb-0">
                      <strong>All Clear:</strong> No vulnerable CVEs were found for this device. Continue monitoring for new threats.
                    </CAlert>
                  )}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {enrichedAsset.vulnerabilities && enrichedAsset.vulnerabilities.cves.length > 0 && (
        <>
          <hr className="my-4" />
          <CRow>
            <CCol xs={12}>
              <h5>Vulnerability Details</h5>
            </CCol>
          </CRow>
          
          <CRow>
            <CCol md={6}>
              <h6>CVEs ({enrichedAsset.vulnerabilities.cves.length})</h6>
              <CListGroup flush style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {enrichedAsset.vulnerabilities.cves.slice(0, 10).map((cve, index) => (
                  <CListGroupItem key={index}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <code className="text-primary">{cve.cve_id}</code>
                        <div className="small text-muted mt-1">
                          {cve.description?.substring(0, 100)}...
                        </div>
                      </div>
                      <div className="text-end">
                        <CBadge color={cve.cvss >= 7 ? 'danger' : cve.cvss >= 4 ? 'warning' : 'info'}>
                          CVSS: {cve.cvss}
                        </CBadge>
                      </div>
                    </div>
                  </CListGroupItem>
                ))}
                {enrichedAsset.vulnerabilities.cves.length > 10 && (
                  <CListGroupItem className="text-center text-muted">
                    ... and {enrichedAsset.vulnerabilities.cves.length - 10} more
                  </CListGroupItem>
                )}
              </CListGroup>
            </CCol>
            
            <CCol md={6}>
              <h6>Attack Patterns ({enrichedAsset.vulnerabilities.capecs?.length || 0})</h6>
              <CListGroup flush style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {enrichedAsset.vulnerabilities.capecs?.slice(0, 5).map((capec, index) => (
                  <CListGroupItem key={index}>
                    <div>
                      <strong>{capec.capec_id}</strong>: {capec.name}
                      <div className="small text-muted mt-1">
                        Severity: {capec.typical_severity}
                      </div>
                    </div>
                  </CListGroupItem>
                )) || <CListGroupItem className="text-muted">No attack patterns found</CListGroupItem>}
              </CListGroup>
            </CCol>
          </CRow>
        </>
      )}
    </CContainer>
  )
}

export default AssetDetail