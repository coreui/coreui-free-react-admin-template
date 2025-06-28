/*import React from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const AssetView = ({ assets }) => {
  const { assetId } = useParams()
  const asset = assets?.find(a => a.id === assetId)

  if (!asset) {
    return (
      <CCard>
        <CCardHeader>Asset Not Found</CCardHeader>
        <CCardBody>The requested asset could not be found.</CCardBody>
      </CCard>
    )
  }

  return (
    <CCard>
      <CCardHeader>
        <h4>{asset.name}</h4>
      </CCardHeader>
      <CCardBody>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Vendor:</strong> {asset.vendor}</p>
            <p><strong>Device Type:</strong> {asset.deviceType}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Model:</strong> {asset.model}</p>
            <p><strong>Department:</strong> {asset.department}</p>
          </div>
        </div>
        { Add more asset details here }
      </CCardBody>
    </CCard>
  )
}

export default AssetView*/

/*
import React from 'react'
import { useParams } from 'react-router-dom'
import { 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CRow, 
  CCol,
  CBreadcrumb,
  CBreadcrumbItem,
  CAlert
} from '@coreui/react'

const AssetDetail = () => {
  const { assetId } = useParams()
  
  // Get asset data from localStorage (for now)
  const getAssetData = () => {
    try {
      const savedAssets = localStorage.getItem('coreui_assets')
      const assets = savedAssets ? JSON.parse(savedAssets) : []
      return assets.find(asset => asset.id === assetId)
    } catch (error) {
      console.error('Error loading asset data:', error)
      return null
    }
  }

  const asset = getAssetData()

  if (!asset) {
    return (
      <div>
        <CBreadcrumb>
          <CBreadcrumbItem href="/dashboard">Home</CBreadcrumbItem>
          <CBreadcrumbItem active>Asset Not Found</CBreadcrumbItem>
        </CBreadcrumb>
        
        <CAlert color="danger">
          <h4>Asset Not Found</h4>
          <p>The requested asset could not be found or may have been removed.</p>
        </CAlert>
      </div>
    )
  }

  return (
    <div>
      <CBreadcrumb>
        <CBreadcrumbItem href="/dashboard">Home</CBreadcrumbItem>
        <CBreadcrumbItem active>{asset.name}</CBreadcrumbItem>
      </CBreadcrumb>

      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <h4>{asset.name}</h4>
              <small className="text-muted">Asset Details</small>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <div className="mb-3">
                    <strong>Vendor:</strong>
                    <div>{asset.vendor}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Device Type:</strong>
                    <div>{asset.deviceType}</div>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="mb-3">
                    <strong>Model:</strong>
                    <div>{asset.model}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Department:</strong>
                    <div>{asset.department}</div>
                  </div>
                </CCol>
              </CRow>

              { Add more sections as needed }
              <CRow className="mt-4">
                <CCol xs={12}>
                  <CCard>
                    <CCardHeader>
                      <h5>Additional Information</h5>
                    </CCardHeader>
                    <CCardBody>
                      <p>Add more asset-specific content here such as:</p>
                      <ul>
                        <li>Serial numbers</li>
                        <li>Purchase date</li>
                        <li>Warranty information</li>
                        <li>Location details</li>
                        <li>Maintenance history</li>
                        <li>Usage statistics</li>
                      </ul>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default AssetDetail*/


import React, { useMemo } from 'react'
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
  CListGroupItem
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
    
    const seed = asset.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    const cveYear = 2020 + (seed % 5)
    const cveNumber = (seed % 9999) + 1000
    const cve = `CVE-${cveYear}-${cveNumber}`
    
    const riskLevels = ['Low', 'Medium', 'High', 'Critical']
    const riskIndex = seed % 4
    const riskLevel = riskLevels[riskIndex]
    
    // Generate additional mock data for detailed view
    const serialNumber = `SN${(seed % 999999).toString().padStart(6, '0')}`
    const ipAddress = `192.168.${(seed % 255) + 1}.${((seed * 7) % 255) + 1}`
    const macAddress = `00:${((seed % 255).toString(16).padStart(2, '0'))}:${(((seed * 3) % 255).toString(16).padStart(2, '0'))}:${(((seed * 5) % 255).toString(16).padStart(2, '0'))}:${(((seed * 7) % 255).toString(16).padStart(2, '0'))}:${(((seed * 11) % 255).toString(16).padStart(2, '0'))}`
    const lastScanDate = new Date(Date.now() - (seed % 30) * 24 * 60 * 60 * 1000).toLocaleDateString()
    const osVersion = `OS v${(seed % 5) + 1}.${(seed % 10)}.${(seed % 100)}`
    
    return {
      ...asset,
      cve,
      riskLevel,
      serialNumber,
      ipAddress,
      macAddress,
      lastScanDate,
      osVersion
    }
  }, [asset])

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
                  <h4 className="mb-1">{enrichedAsset.name}</h4>
                  <CBadge color="secondary">{enrichedAsset.department}</CBadge>
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
              <CRow>
                <CCol md={6}>
                  <h5>Basic Information</h5>
                  <CListGroup flush>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Vendor:</strong>
                      <span>{enrichedAsset.vendor}</span>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Device Type:</strong>
                      <span>{enrichedAsset.deviceType}</span>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Model:</strong>
                      <span>{enrichedAsset.model}</span>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Department:</strong>
                      <CBadge color="secondary">{enrichedAsset.department}</CBadge>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Serial Number:</strong>
                      <code>{enrichedAsset.serialNumber}</code>
                    </CListGroupItem>
                  </CListGroup>
                </CCol>
                
                <CCol md={6}>
                  <h5>Network Information</h5>
                  <CListGroup flush>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>IP Address:</strong>
                      <code>{enrichedAsset.ipAddress}</code>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>MAC Address:</strong>
                      <code>{enrichedAsset.macAddress}</code>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>OS Version:</strong>
                      <span>{enrichedAsset.osVersion}</span>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <strong>Last Scan:</strong>
                      <span>{enrichedAsset.lastScanDate}</span>
                    </CListGroupItem>
                  </CListGroup>
                </CCol>
              </CRow>
              
              <hr className="my-4" />
              
              <CRow>
                <CCol md={6}>
                  <h5>Security Information</h5>
                  <CListGroup flush>
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <strong>CVE Number:</strong>
                      <code className="text-primary">{enrichedAsset.cve}</code>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between align-items-center">
                      <strong>Risk Level:</strong>
                      <CBadge color={getRiskBadgeVariant(enrichedAsset.riskLevel)} size="lg">
                        {enrichedAsset.riskLevel}
                      </CBadge>
                    </CListGroupItem>
                  </CListGroup>
                </CCol>
                
                <CCol md={6}>
                  <h5>Actions</h5>
                  <div className="d-grid gap-2">
                    <CButton color="primary" variant="outline">
                      Run Security Scan
                    </CButton>
                    <CButton color="info" variant="outline">
                      Update Asset Info
                    </CButton>
                    <CButton color="warning" variant="outline">
                      Generate Report
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AssetDetail