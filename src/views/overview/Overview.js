/*import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CSpinner,
  CButton
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const Overview = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navgiate = useNavigate()

  // Function to handle navigation to different dashboards
  
  const handleViewDetails = (itemId) => {
    switch(item.department) {
    case 'Sales': navigate(`/sales-dashboard/${item.id}`); break;
    case 'Marketing': navigate(`/marketing-dashboard/${item.id}`); break;
    case 'IT': navigate(`/tech-dashboard/${item.id}`); break;
    case 'HR': navigate(`/hr-dashboard/${item.id}`); break;
    default: navigate(`/general-dashboard/${item.id}`);
    }
  }

  // Sample data - replace this with your actual data fetching logic
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Replace this with your actual API call
        const sampleData = [
          { id: 1, deviceName: 'Cisco Switch Catalyst', department: 'Sales', numberOfCVEs: 5, riskLevel: 56, info: 'Asset Details' },
          { id: 2, deviceName: 'Cisco Router', department: 'Sales', numberOfCVEs: 14, riskLevel: 40, info: 'Asset Details' },
          { id: 3, deviceName: 'Cisco Switch E4345', department: 'Developement', numberOfCVEs: 2, riskLevel: 90, info: 'Asset Details' },
          { id: 4, deviceName: 'Random Somthing Else', department: 'HR', numberOfCVEs: 8, riskLevel: 12, info: 'Asset Details' },
          { id: 5, deviceName: 'Not The One You Think', department: 'Support', numberOfCVEs: 10, riskLevel: 78, info: 'Asset Details' },
        ]
        
        // Sort by score in descending order
        const sortedData = sampleData.sort((a, b) => b.riskLevel - a.riskLevel)
        setData(sortedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getCVEBadgeColor = (riskLevel) => {
    if (riskLevel >= 12) return 'danger'
    if (riskLevel >= 7) return 'warning'
    return 'success'
  }

  const getRiskLevelBadgeColor = (riskLevel) => {
    if (riskLevel >= 90) return 'danger'
    if (riskLevel >= 70) return 'warning'
    return 'success'
  }

  //const getStatusBadgeColor = (status) => {
  //  return status === 'Active' ? 'success' : 'secondary'
  //}

  if (loading) {
    return (
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardBody className="text-center">
              <CSpinner color="primary" />
              <p className="mt-2">Loading dashboard data...</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Dashboard</strong> <small>Sorted by Score (Descending)</small>
            </CCardHeader>
            <CCardBody>
              <div style={{ 
                maxHeight: '650px',
                overflowY: 'auto',
                //border: '1px solid #e9ecef',
                //borderRadius: '0.375rem'
              }}>
                <CTable hover responsive className="mb-0">
                  <CTableHead style={{ 
                    position: 'sticky', 
                    top: 0, 
                    backgroundColor: '#f8f9fa',
                    zIndex: 10
                  }}>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Device Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                      <CTableHeaderCell scope="col">CVE #</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Risk Level</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Asset Details</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.map((item, index) => (
                      <CTableRow key={item.id}>
                        <CTableDataCell>{item.deviceName}</CTableDataCell>
                        <CTableDataCell>{item.department}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={getCVEBadgeColor(item.numberOfCVEs)}>
                            {item.numberOfCVEs}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={getRiskLevelBadgeColor(item.riskLevel)}>
                            {item.riskLevel}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton 
                            color="primary" 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(item.id)}
                          >
                            Go to Details
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Overview

// <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>*/

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
                <h4 className="mb-0">Assets Overview</h4>
                <CBadge color="info" shape="rounded-pill">
                  {assets.length} Total Assets
                </CBadge>
              </div>
            </CCardHeader>
            <CCardBody>
              {enrichedAssets.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No Assets Found</h5>
                  <p className="text-muted">Start by adding departments and assets using the sidebar buttons.</p>
                </div>
              ) : (
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Device Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                      <CTableHeaderCell scope="col">CVE #</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Risk Level</CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="text-center">Asset Details</CTableHeaderCell>
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
      
      {/* Optional: Summary cards */}
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

export default Overview