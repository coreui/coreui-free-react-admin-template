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
  CAlert,
  CSpinner
} from '@coreui/react'
import { useNavigation } from '../../contexts/NavigationContext'

const AssetDetail = () => {
  const { assetId } = useParams()
  const navigate = useNavigate()
  const { assets, updateAsset, removeAsset } = useNavigation()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})
  const [activeTab, setActiveTab] = useState('cves')
  const [isEditing, setIsEditing] = useState(false)

//  const asset = assets.find(a => a.id === assetId)

  // Find asset from the central state
  const asset = useMemo(() => {
    return assets.find(a => a.id === assetId)
  }, [assets, assetId])

  // Generate enriched asset data based on current asset
  const enrichedAsset = useMemo(() => {
    if (!asset) return null
    
    const hasVulnerabilities = asset.vulnerabilities && (
      (asset.vulnerabilities.cves?.length > 0) ||
      (asset.vulnerabilities.cwes?.length > 0) ||
      (asset.vulnerabilities.capecs?.length > 0) ||
      (asset.vulnerabilities.attacks?.length > 0)
    )
    
    const seed = asset.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    const serialNumber = `SN${(seed % 999999).toString().padStart(6, '0')}`
    const ipAddress = `192.168.${(seed % 255) + 1}.${((seed * 7) % 255) + 1}`
    const macAddress = `00:${((seed % 255).toString(16).padStart(2, '0'))}:${(((seed * 3) % 255).toString(16).padStart(2, '0'))}:${(((seed * 5) % 255).toString(16).padStart(2, '0'))}:${(((seed * 7) % 255).toString(16).padStart(2, '0'))}:${(((seed * 11) % 255).toString(16).padStart(2, '0'))}`
    const lastScanDate = asset.last_updated ? new Date(asset.last_updated).toLocaleDateString() : new Date().toLocaleDateString()
    const osVersion = asset.version || `${asset.vendor || 'Generic'} OS v${(seed % 5) + 1}.${(seed % 10)}`
    
    const deviceRiskLevel = asset.risk_level || 0
    let riskLevel = 'Secure'
    if (deviceRiskLevel >= 100) riskLevel = 'Critical'
    else if (deviceRiskLevel >= 75) riskLevel = 'High'
    else if (deviceRiskLevel >= 50) riskLevel = 'Medium'
    else if (deviceRiskLevel > 0) riskLevel = 'Low'
    
    return {
      ...asset,
      hasVulnerabilities,
      serialNumber,
      ipAddress,
      macAddress,
      lastScanDate,
      osVersion,
      osFamily: asset.os_family || '',
      riskLevel,
      deviceRiskLevel
    }
  }, [asset])

  useEffect(() => {
    if(!enrichedAsset) return
    const defaultTab = enrichedAsset.vulnerabilities.cves?.length ? 'cves'
      : enrichedAsset.vulnerabilities.cwes?.length ? 'cwes'
      : enrichedAsset.vulnerabilities.capecs?.length ? 'capecs'
      : enrichedAsset.vulnerabilities.attacks?.length ? 'attacks'
      : 'cves'
    setActiveTab(defaultTab)
  }, [enrichedAsset])

  // Initialize editable fields based on enriched asset
  const [editableFields, setEditableFields] = useState({
    ipAddress: '',
    macAddress: '',
    osVersion: '',
    osFamily: ''
  })

  // Update editable fields when enriched asset changes
  useEffect(() => {
    if (enrichedAsset) {
      setEditableFields({
        ipAddress: enrichedAsset.ipAddress,
        macAddress: enrichedAsset.macAddress,
        osVersion: enrichedAsset.version || enrichedAsset.osVersion,
        osFamily: enrichedAsset.os_family || enrichedAsset.osFamily || ''
      })
    }
  }, [enrichedAsset])

  // Update active tab when vulnerabilities change
  useEffect(() => {
    if (!enrichedAsset) return
    const defaultTab = enrichedAsset.vulnerabilities?.cves?.length ? 'cves'
      : enrichedAsset.vulnerabilities?.cwes?.length ? 'cwes'
      : enrichedAsset.vulnerabilities?.capecs?.length ? 'capecs'
      : enrichedAsset.vulnerabilities?.attacks?.length ? 'attacks'
      : 'cves'
    setActiveTab(defaultTab)
  }, [enrichedAsset?.vulnerabilities])

  const toggleItemExpansion = (type, index) => {
    const key = `${type}-${index}`
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = async () => {
    if (!enrichedAsset) return
    
    setIsSaving(true)
    
    const originalOsVersion = enrichedAsset.version || enrichedAsset.osVersion
    const originalOsFamily = enrichedAsset.os_family || enrichedAsset.osFamily || ''
    
    const osVersionChanged = editableFields.osVersion !== originalOsVersion
    const osFamilyChanged = editableFields.osFamily !== originalOsFamily
    
    if (osVersionChanged || osFamilyChanged) {
      try {
        const requestBody = {
          device_name: enrichedAsset.scan_params?.device_name || enrichedAsset.name,
          h_cpe: enrichedAsset.h_cpe || enrichedAsset.scan_params?.h_cpe || '',
          vendor: enrichedAsset.vendor || enrichedAsset.scan_params?.vendor || '',
          model: enrichedAsset.model || enrichedAsset.scan_params?.model || '',
          os_family: editableFields.osFamily || '',
          version: editableFields.osVersion || '',
          department: enrichedAsset.department || ''
        }
        
        const response = await fetch('http://localhost:8000/api/v1/security/scan-by-os', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
        }

        const apiResponse = await response.json()
        if (apiResponse.success) {
          // CRITICAL: Pass the FULL apiResponse, not partial data
          updateAsset(enrichedAsset.id, apiResponse)
          
          alert('Asset updated successfully!')
        } else {
          throw new Error(apiResponse.error_message || 'Update failed')
        }
      } catch (error) {
        console.error('Error updating asset:', error)
        alert(`Failed to update: ${error.message}`)
      }
    }
    
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!enrichedAsset) return
    
    if (!window.confirm(`Are you sure you want to delete ${enrichedAsset.name}?`)) {
      return
    }
    
    setIsDeleting(true)
    
    try {
      // Remove the asset using central state management
      removeAsset(enrichedAsset.id)
      
      // Navigate back to overview
      navigate('/overview')
      
      // Show success feedback
      alert('Asset deleted successfully!')
    } catch (error) {
      console.error('Error deleting asset:', error)
      alert(`Failed to delete: ${error.message}`)
      setIsDeleting(false)
    }
  }

  // Add this to the header section (after the Back to Overview button):
  const headerButtons = (
    <div className="d-flex gap-2">
      <CButton 
        color="danger" 
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <CSpinner size="sm" className="me-1" />
            Deleting...
          </>
        ) : 'Delete Asset'}
      </CButton>
      <CButton 
        color="secondary" 
        variant="outline"
        onClick={() => navigate('/overview')}
      >
        Back to Overview
      </CButton>
    </div>
  )

  // Early return if asset not found
  if (!enrichedAsset) {
    return (
      <CContainer fluid>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Asset Not Found</h4>
                  {headerButtons}
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
                {headerButtons}
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
                      <span>{enrichedAsset.name + enrichedAsset.id}</span>
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
                          handleSave()
                        } else {
                          setIsEditing(true)
                        }
                      }}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <CSpinner size="sm" className="me-1" />
                          Updating...
                        </>
                      ) : isEditing ? "Save" : "Edit"}
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
                      <strong>OS Family:</strong>
                      {isEditing ? (
                        <CFormInput
                          size="sm"
                          value={editableFields.osFamily}
                          onChange={(e) => setEditableFields(prev => ({...prev, osFamily: e.target.value}))}
                          style={{ width: '150px' }}
                        />
                      ) : (
                        <span>{editableFields.osFamily || 'Not specified'}</span>
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
                      <strong>✅ No Vulnerabilities Found</strong> - This device appears to be secure with no known critical vulnerabilities.
                    </CAlert>
                  )}
                </CCol>
              </CRow>

              {/* Vulnerability Details Section - Only show if vulnerabilities exist */}
              {enrichedAsset.hasVulnerabilities && (
                <CRow className="mb-4">
                  <CCol xs={12}>
                    <h5>Vulnerability Details</h5>
                    <CTabs activeItemKey={activeTab} onChange={(newKey) => setActiveTab(newKey)}>
                      <CTabList variant="pills" className="mb-3">
                        {enrichedAsset.vulnerabilities.cves?.length > 0 && (
                          <CTab itemKey='cves'>
                            CVEs ({enrichedAsset.vulnerabilities.cves.length})
                          </CTab>
                        )}
                        {enrichedAsset.vulnerabilities.cwes?.length > 0 && (
                          <CTab itemKey='cwes'>
                            CWEs ({enrichedAsset.vulnerabilities.cwes.length})
                          </CTab>
                        )}
                        {enrichedAsset.vulnerabilities.capecs?.length > 0 && (
                          <CTab itemKey='capecs'>
                            CAPECs ({enrichedAsset.vulnerabilities.capecs.length})
                          </CTab>
                        )}
                        {enrichedAsset.vulnerabilities.attacks?.length > 0 && (
                          <CTab itemKey='attacks'>
                            ATT&CK ({enrichedAsset.vulnerabilities.attacks.length})
                          </CTab>
                        )}
                      </CTabList>
                      
                      <CTabContent>
                        {enrichedAsset.vulnerabilities.cves?.length > 0 && (
                          <CTabPanel className="py-3" itemKey='cves'>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              <CListGroup>
                                {enrichedAsset.vulnerabilities.cves.map((cve, index) => {
                                  const isExpanded = expandedItems[`cve-${index}`]
                                  return (
                                    <CListGroupItem key={index} className="border-0 border-bottom">
                                      <div 
                                        className="d-flex justify-content-between align-items-start cursor-pointer"
                                        onClick={() => toggleItemExpansion('cve', index)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <div className="flex-grow-1">
                                          <div className="d-flex align-items-center gap-2 mb-2">
                                            <code className="text-primary fw-bold">{cve.cve_id}</code>
                                            
                                            {/* CVSS Score Badge */}
                                            <CBadge 
                                              color={
                                                cve.cvss >= 9.0 ? 'danger' : 
                                                cve.cvss >= 7.0 ? 'warning' : 
                                                cve.cvss >= 4.0 ? 'info' : 'secondary'
                                              }
                                            >
                                              CVSS: {cve.cvss || 'N/A'}
                                            </CBadge>
                                            
                                            {/* Risk Level Badge - Fix the field name */}
                                            {(cve.risk_level !== undefined && cve.risk_level !== null) && (
                                              <CBadge color="danger" className="text-white">
                                                Risk Level: {cve.risk_level.toFixed(2)}
                                              </CBadge>
                                            )}
                                            
                                            {/* EPSS Badge */}
                                            {(cve.epss !== undefined && cve.epss !== null) && (
                                              <CBadge color="warning">
                                                EPSS: {(cve.epss * 100).toFixed(2)}%
                                              </CBadge>
                                            )}
                                            
                                            {/* Impact Score Badge - Fix the field name */}
                                            {(cve.impact_score !== undefined && cve.impact_score !== null) && (
                                              <CBadge color="info">
                                                Impact: {cve.impact_score.toFixed(2)}
                                              </CBadge>
                                            )}
                                            
                                            {/* Exploitability Score Badge - Add this missing field */}
                                            {(cve.exploitability_score !== undefined && cve.exploitability_score !== null) && (
                                              <CBadge color="light" className="text-dark">
                                                Exploitability: {cve.exploitability_score.toFixed(2)}
                                              </CBadge>
                                            )}
                                            
                                            <CButton size="sm" color="link" className="p-0 ms-auto">
                                              {isExpanded ? 'Less' : 'More'}
                                            </CButton>
                                          </div>
                                          
                                          <p className="mb-1 small text-muted">
                                            {isExpanded 
                                              ? cve.description 
                                              : `${cve.description?.substring(0, 200)}${cve.description?.length > 200 ? '...' : ''}`
                                            }
                                          </p>
                                          
                                          {isExpanded && (
                                            <div className="mt-3 p-3 bg-dark rounded">
                                              <CRow>
                                                <CCol md={6}>
                                                  <strong>CVE ID:</strong> <code>{cve.cve_id}</code><br/>
                                                  <strong>CVSS Score:</strong> {cve.cvss || 'N/A'}<br/>
                                                  {/* Fix field names to match backend */}
                                                  <strong>Risk Level:</strong> {cve.risk_level?.toFixed(2) || 'N/A'}<br/>
                                                  <strong>EPSS:</strong> {cve.epss ? `${(cve.epss * 100).toFixed(2)}%` : 'N/A'}<br/>
                                                  <strong>Impact Score:</strong> {cve.impact_score?.toFixed(2) || 'N/A'}<br/>
                                                  <strong>Exploitability Score:</strong> {cve.exploitability_score?.toFixed(2) || 'N/A'}<br/>
                                                  
                                                  {cve.cvss_vector && (
                                                    <>
                                                      <strong>CVSS Vector:</strong> <code className="small">{cve.cvss_vector}</code><br/>
                                                    </>
                                                  )}
                                                </CCol>
                                                <CCol md={6}>
                                                  {cve.published_date && (
                                                    <>
                                                      <strong>Published:</strong> {new Date(cve.published_date).toLocaleDateString()}<br/>
                                                    </>
                                                  )}
                                                  {cve.last_modified_date && (
                                                    <>
                                                      <strong>Last Modified:</strong> {new Date(cve.last_modified_date).toLocaleDateString()}<br/>
                                                    </>
                                                  )}
                                                  {cve.source && (
                                                    <>
                                                      <strong>Source:</strong> {cve.source}<br/>
                                                    </>
                                                  )}
                                                </CCol>
                                              </CRow>
                                              {cve.references && cve.references.length > 0 && (
                                                <div className="mt-2">
                                                  <strong>References:</strong>
                                                  <ul className="small mt-1">
                                                    {cve.references.slice(0, 5).map((ref, refIndex) => (
                                                      <li key={refIndex}>
                                                        <a href={ref} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                                          {ref.length > 60 ? `${ref.substring(0, 60)}...` : ref}
                                                        </a>
                                                      </li>
                                                    ))}
                                                    {cve.references.length > 5 && (
                                                      <li className="text-muted">... and {cve.references.length - 5} more</li>
                                                    )}
                                                  </ul>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </CListGroupItem>
                                  )
                                })}
                              </CListGroup>
                            </div>
                          </CTabPanel>
                        )}
                        
                        {enrichedAsset.vulnerabilities.cwes?.length > 0 && (
                          <CTabPanel className="py-3" itemKey='cwes'>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              <CListGroup>
                                {enrichedAsset.vulnerabilities.cwes.map((cwe, index) => {
                                  const isExpanded = expandedItems[`cwe-${index}`]
                                  return (
                                    <CListGroupItem key={index} className="border-0 border-bottom">
                                      <div 
                                        className="cursor-pointer"
                                        onClick={() => toggleItemExpansion('cwe', index)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                          <code className="text-info fw-bold">{cwe.cwe_id}</code>
                                          <span className="fw-semibold">{cwe.name}</span>
                                          <CButton size="sm" color="link" className="p-0 ms-auto">
                                            {isExpanded ? 'Less' : 'More'}
                                          </CButton>
                                        </div>
                                        <p className="mb-0 small text-muted">
                                          {isExpanded 
                                            ? cwe.description 
                                            : `${cwe.description?.substring(0, 150)}${cwe.description?.length > 150 ? '...' : ''}`
                                          }
                                        </p>
                                        
                                        {isExpanded && (
                                          <div className="mt-3 p-3 bg-dark rounded">
                                            <strong>CWE ID:</strong> <code>{cwe.cwe_id}</code><br/>
                                            <strong>Name:</strong> {cwe.name}<br/>
                                            {cwe.weakness_abstraction && (
                                              <>
                                                <strong>Abstraction:</strong> {cwe.weakness_abstraction}<br/>
                                              </>
                                            )}
                                            {cwe.status && (
                                              <>
                                                <strong>Status:</strong> {cwe.status}<br/>
                                              </>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </CListGroupItem>
                                  )
                                })}
                              </CListGroup>
                            </div>
                          </CTabPanel>
                        )}
                        
                        {enrichedAsset.vulnerabilities.capecs?.length > 0 && (
                          <CTabPanel className="py-3" itemKey='capecs'>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              <CListGroup>
                                {enrichedAsset.vulnerabilities.capecs.map((capec, index) => {
                                  const isExpanded = expandedItems[`capec-${index}`]
                                  return (
                                    <CListGroupItem key={index} className="border-0 border-bottom">
                                      <div 
                                        className="cursor-pointer"
                                        onClick={() => toggleItemExpansion('capec', index)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <div className="d-flex justify-content-between align-items-start">
                                          <div className="flex-grow-1">
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                              <code className="text-warning fw-bold">{capec.capec_id}</code>
                                              <span className="fw-semibold">{capec.name}</span>
                                              <CButton size="sm" color="link" className="p-0 ms-auto">
                                                {isExpanded ? 'Less' : 'More'}
                                              </CButton>
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
                                              {isExpanded 
                                                ? capec.description 
                                                : `${capec.description?.substring(0, 150)}${capec.description?.length > 150 ? '...' : ''}`
                                              }
                                            </p>
                                            
                                            {isExpanded && (
                                              <div className="mt-3 p-3 bg-dark rounded">
                                                <CRow>
                                                  <CCol md={6}>
                                                    <strong>CAPEC ID:</strong> <code>{capec.capec_id}</code><br/>
                                                    <strong>Name:</strong> {capec.name}<br/>
                                                    <strong>Abstraction:</strong> {capec.abstraction || 'N/A'}<br/>
                                                  </CCol>
                                                  <CCol md={6}>
                                                    <strong>Severity:</strong> {capec.typical_severity || 'Unknown'}<br/>
                                                    <strong>Likelihood:</strong> {capec.likelihood_of_attack || 'Unknown'}<br/>
                                                    <strong>Status:</strong> {capec.status || 'N/A'}<br/>
                                                  </CCol>
                                                </CRow>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </CListGroupItem>
                                  )
                                })}
                              </CListGroup>
                            </div>
                          </CTabPanel>
                        )}
                        
                        {enrichedAsset.vulnerabilities.attacks?.length > 0 && (
                          <CTabPanel className="py-3" itemKey='attacks'>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                              <CListGroup>
                                {enrichedAsset.vulnerabilities.attacks.map((attack, index) => {
                                  const isExpanded = expandedItems[`attack-${index}`]
                                  return (
                                    <CListGroupItem key={index} className="border-0 border-bottom">
                                      <div 
                                        className="cursor-pointer"
                                        onClick={() => toggleItemExpansion('attack', index)}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        <div className="d-flex justify-content-between align-items-start">
                                          <div className="flex-grow-1">
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                              <code className="text-danger fw-bold">{attack.technique_id}</code>
                                              <span className="fw-semibold">{attack.name}</span>
                                              <CButton size="sm" color="link" className="p-0 ms-auto">
                                                {isExpanded ? 'Less' : 'More'}
                                              </CButton>
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
                                              {isExpanded 
                                                ? attack.description 
                                                : `${attack.description?.substring(0, 150)}${attack.description?.length > 150 ? '...' : ''}`
                                              }
                                            </p>
                                            
                                            {isExpanded && (
                                              <div className="mt-3 p-3 bg-dark rounded">
                                                <CRow>
                                                  <CCol md={6}>
                                                    <strong>Technique ID:</strong> <code>{attack.technique_id}</code><br/>
                                                    <strong>Name:</strong> {attack.name}<br/>
                                                    <strong>Tactics:</strong> {attack.tactics || 'N/A'}<br/>
                                                  </CCol>
                                                  <CCol md={6}>
                                                    <strong>Platforms:</strong> {attack.platforms || 'N/A'}<br/>
                                                    {attack.data_sources && (
                                                      <>
                                                        <strong>Data Sources:</strong> {attack.data_sources}<br/>
                                                      </>
                                                    )}
                                                    {attack.detection && (
                                                      <>
                                                        <strong>Detection:</strong> {attack.detection.substring(0, 100)}...<br/>
                                                      </>
                                                    )}
                                                  </CCol>
                                                </CRow>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </CListGroupItem>
                                  )
                                })}
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