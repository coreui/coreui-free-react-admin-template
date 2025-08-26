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