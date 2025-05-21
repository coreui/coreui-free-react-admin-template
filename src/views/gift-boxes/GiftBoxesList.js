import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
  CFormInput,
  CForm,
  CFormSelect,
  CPagination,
  CPaginationItem,
  CProgress,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilSearch } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

// Mock data based on the new API structure
const mockBoxesData = {
  firstBox: {
    btcGivenToday: [
      { type: "points", value: 50000, description: "VND 50.000", probability: 50.0 },
      { type: "points", value: 70000, description: "VND 70.000", probability: 30.0 },
      { type: "points", value: 100000, description: "VND 100.000", probability: 10.0 },
      { type: "points", value: 120000, description: "VND 120.000", probability: 10.0 }
    ],
    btcNotGivenToday: [
      { type: "points", value: 50000, description: "VND 50.000", probability: 50.0 },
      { type: "points", value: 70000, description: "VND 70.000", probability: 30.0 },
      { type: "points", value: 100000, description: "VND 100.000", probability: 10.0 },
      { type: "points", value: 120000, description: "VND 120.000", probability: 9.9 },
      { type: "btc", value: 1, description: "BTC", probability: 0.1 }
    ]
  },
  regularBox: {
    btcGivenToday: [
      { type: "points", value: 1000, description: "VND 1.000", probability: 31.65 },
      { type: "points", value: 20000, description: "VND 20.000", probability: 25.32 },
      { type: "points", value: 30000, description: "VND 30.000", probability: 18.99 },
      { type: "points", value: 50000, description: "VND 50.000", probability: 12.66 },
      { type: "points", value: 70000, description: "VND 70.000", probability: 6.33 },
      { type: "points", value: 100000, description: "VND 100.000", probability: 3.16 },
      { type: "points", value: 120000, description: "VND 120.000", probability: 1.90 }
    ],
    btcNotGivenToday: [
      { type: "points", value: 10000, description: "VND 10.000", probability: 31.64 },
      { type: "points", value: 20000, description: "VND 20.000", probability: 25.31 },
      { type: "points", value: 30000, description: "VND 30.000", probability: 18.98 },
      { type: "points", value: 50000, description: "VND 50.000", probability: 12.65 },
      { type: "points", value: 70000, description: "VND 70.000", probability: 6.33 },
      { type: "points", value: 100000, description: "VND 100.000", probability: 3.16 },
      { type: "points", value: 120000, description: "VND 120.000", probability: 1.90 },
      { type: "btc", value: 1, description: "BTC", probability: 0.0063 }
    ]
  }
}

const GiftBoxesList = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [boxesData, setBoxesData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState(1)
  const [activeScenario, setActiveScenario] = useState('btcNotGivenToday')

  // Load mock data on component mount
  useEffect(() => {
    const fetchBoxes = () => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        setBoxesData(mockBoxesData)
        setLoading(false)
      }, 500)
    }

    fetchBoxes()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    // Could implement client-side filtering here
  }

  const handleEditItem = (boxType, scenario, index) => {
    // Navigate to edit view with necessary params
    navigate(`/gift-boxes/edit/${boxType}/${scenario}/${index}`)
  }

  const handleDeleteItem = (boxType, scenario, index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // Create a deep copy of boxesData
      const updatedBoxesData = JSON.parse(JSON.stringify(boxesData))
      // Remove the item at the specified index
      updatedBoxesData[boxType][scenario].splice(index, 1)
      // Update state
      setBoxesData(updatedBoxesData)
    }
  }

  const getProbabilityBadge = (probability) => {
    let color = 'success'
    
    if (probability < 1) color = 'danger'
    else if (probability < 10) color = 'warning'
    
    return (
      <div>
        <div className="small text-medium-emphasis">{probability.toFixed(4)}%</div>
        <CProgress thin color={color} value={probability} max={100} />
      </div>
    )
  }

  const getTypeBadge = (type) => {
    return type === 'btc' ? 
      <CBadge color="warning">BTC</CBadge> : 
      <CBadge color="info">Points</CBadge>
  }

  const calculateTotalProbability = (items) => {
    return items?.reduce((sum, item) => sum + item.probability, 0) || 0
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Gift Boxes</strong>
          </CCardHeader>
          <CCardBody>

            {/* Box Type Tabs */}
            <CNav variant="tabs" className="mb-3">
              <CNavItem>
                <CNavLink 
                  active={activeTab === 1}
                  onClick={() => setActiveTab(1)}
                >
                  First Box
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink 
                  active={activeTab === 2}
                  onClick={() => setActiveTab(2)}
                >
                  Regular Box
                </CNavLink>
              </CNavItem>
            </CNav>

            {/* Scenario Selection */}
            <div className="mb-3">
              <CFormSelect 
                value={activeScenario}
                onChange={(e) => setActiveScenario(e.target.value)}
              >
                <option value="btcNotGivenToday">Scenario: BTC Not Given Today</option>
                <option value="btcGivenToday">Scenario: BTC Given Today</option>
              </CFormSelect>
            </div>

            {/* Box Content */}
            <CTabContent>
              <CTabPane visible={activeTab === 1}>
                {loading ? (
                  <div className="text-center my-5">Loading gift box items...</div>
                ) : (
                  <>
                    <div className="d-flex justify-content-between mb-2">
                      <h5>First Box Items</h5>
                      <div>
                        <strong>Total Probability:</strong>{' '}
                        <CBadge color={
                          Math.abs(calculateTotalProbability(boxesData?.firstBox?.[activeScenario]) - 100) < 0.01 
                            ? 'success' 
                            : 'danger'
                        }>
                          {calculateTotalProbability(boxesData?.firstBox?.[activeScenario]).toFixed(2)}%
                        </CBadge>
                      </div>
                    </div>
                    <CTable hover responsive bordered>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell width="60">#</CTableHeaderCell>
                          <CTableHeaderCell>Type</CTableHeaderCell>
                          <CTableHeaderCell>Value</CTableHeaderCell>
                          <CTableHeaderCell>Description</CTableHeaderCell>
                          <CTableHeaderCell width="250">Probability (%)</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {boxesData?.firstBox?.[activeScenario]?.length > 0 ? (
                          boxesData.firstBox[activeScenario].map((item, index) => (
                            <CTableRow key={`first-${index}`}>
                              <CTableDataCell>{index + 1}</CTableDataCell>
                              <CTableDataCell>{getTypeBadge(item.type)}</CTableDataCell>
                              <CTableDataCell>{item.value}</CTableDataCell>
                              <CTableDataCell>{item.description}</CTableDataCell>
                              <CTableDataCell>{getProbabilityBadge(item.probability)}</CTableDataCell>
                            </CTableRow>
                          ))
                        ) : (
                          <CTableRow>
                            <CTableDataCell colSpan={5} className="text-center py-4">
                              No gift box items found
                            </CTableDataCell>
                          </CTableRow>
                        )}
                      </CTableBody>
                    </CTable>
                  </>
                )}
              </CTabPane>
              
              <CTabPane visible={activeTab === 2}>
                {loading ? (
                  <div className="text-center my-5">Loading gift box items...</div>
                ) : (
                  <>
                    <div className="d-flex justify-content-between mb-2">
                      <h5>Regular Box Items</h5>
                      <div>
                        <strong>Total Probability:</strong>{' '}
                        <CBadge color={
                          Math.abs(calculateTotalProbability(boxesData?.regularBox?.[activeScenario]) - 100) < 0.01 
                            ? 'success' 
                            : 'danger'
                        }>
                          {calculateTotalProbability(boxesData?.regularBox?.[activeScenario]).toFixed(2)}%
                        </CBadge>
                      </div>
                    </div>
                    <CTable hover responsive bordered>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell width="60">#</CTableHeaderCell>
                          <CTableHeaderCell>Type</CTableHeaderCell>
                          <CTableHeaderCell>Value</CTableHeaderCell>
                          <CTableHeaderCell>Description</CTableHeaderCell>
                          <CTableHeaderCell width="250">Probability (%)</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {boxesData?.regularBox?.[activeScenario]?.length > 0 ? (
                          boxesData.regularBox[activeScenario].map((item, index) => (
                            <CTableRow key={`regular-${index}`}>
                              <CTableDataCell>{index + 1}</CTableDataCell>
                              <CTableDataCell>{getTypeBadge(item.type)}</CTableDataCell>
                              <CTableDataCell>{item.value}</CTableDataCell>
                              <CTableDataCell>{item.description}</CTableDataCell>
                              <CTableDataCell>{getProbabilityBadge(item.probability)}</CTableDataCell>
                            </CTableRow>
                          ))
                        ) : (
                          <CTableRow>
                            <CTableDataCell colSpan={5} className="text-center py-4">
                              No gift box items found
                            </CTableDataCell>
                          </CTableRow>
                        )}
                      </CTableBody>
                    </CTable>
                  </>
                )}
              </CTabPane>
            </CTabContent>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GiftBoxesList 