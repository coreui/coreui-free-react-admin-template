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
  CFormSelect,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CProgress,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CBadge,
  CProgressBar,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'

// Mock data based on the new API structure - same as GiftBoxesList.js
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
      { type: "points", value: 120000, description: "VND 120.000", probability: 1.89 }
    ],
    btcNotGivenToday: [
      { type: "points", value: 10000, description: "VND 10.000", probability: 31.64 },
      { type: "points", value: 20000, description: "VND 20.000", probability: 25.31 },
      { type: "points", value: 30000, description: "VND 30.000", probability: 18.98 },
      { type: "points", value: 50000, description: "VND 50.000", probability: 12.65 },
      { type: "points", value: 70000, description: "VND 70.000", probability: 6.33 },
      { type: "points", value: 100000, description: "VND 100.000", probability: 3.16 },
      { type: "points", value: 120000, description: "VND 120.000", probability: 1.9 },
      { type: "btc", value: 1, description: "BTC", probability: 0.0063 }
    ]
  }
}

const GiftBoxProbabilities = () => {
  const [boxesData, setBoxesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(1)
  const [activeScenario, setActiveScenario] = useState('btcNotGivenToday')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Load mock data on component mount
  useEffect(() => {
    const fetchBoxes = () => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        setBoxesData(JSON.parse(JSON.stringify(mockBoxesData)))
        setLoading(false)
      }, 500)
    }

    fetchBoxes()
  }, [])

  const getBoxType = () => {
    return activeTab === 1 ? 'firstBox' : 'regularBox'
  }

  const calculateTotalProbability = (items) => {
    return items?.reduce((sum, item) => sum + item.probability, 0) || 0
  }

  const getTypeBadge = (type) => {
    return type === 'btc' ? 
      <CBadge color="warning">BTC</CBadge> : 
      <CBadge color="info">Points</CBadge>
  }

  const handleValueChange = (boxType, scenario, index, field, value) => {
    if (!boxesData) return
    
    const updatedBoxesData = {...boxesData}
    
    if (field === 'probability') {
      // Convert value to number and limit to valid range
      let newProbability = parseFloat(value)
      if (isNaN(newProbability)) newProbability = 0
      if (newProbability < 0) newProbability = 0
      if (newProbability > 100) newProbability = 100
      
      // Round to 4 decimal places
      newProbability = parseFloat(newProbability.toFixed(4))
      
      const oldProbability = updatedBoxesData[boxType][scenario][index].probability
      const difference = newProbability - oldProbability
      
      // Update the changed item
      updatedBoxesData[boxType][scenario][index].probability = newProbability
      
      // Auto-balance other probabilities
      if (difference !== 0) {
        const otherItems = updatedBoxesData[boxType][scenario].filter((_, i) => i !== index)
        const totalOtherProbability = otherItems.reduce((sum, item) => sum + item.probability, 0)
        
        if (totalOtherProbability > 0) {
          // Distribute the difference proportionally
          updatedBoxesData[boxType][scenario].forEach((item, i) => {
            if (i !== index) {
              const ratio = item.probability / totalOtherProbability
              let adjustedProbability = Math.max(0, item.probability - (difference * ratio))
              // Round to 4 decimal places
              adjustedProbability = parseFloat(adjustedProbability.toFixed(4))
              updatedBoxesData[boxType][scenario][i].probability = adjustedProbability
            }
          })
        }
      }
      
      // Ensure total is exactly 100%
      const total = calculateTotalProbability(updatedBoxesData[boxType][scenario])
      if (Math.abs(total - 100) > 0.0001) {
        // Find the item with the highest probability (that's not the current one) to adjust
        const itemsToAdjust = updatedBoxesData[boxType][scenario]
          .map((item, i) => ({ index: i, probability: item.probability }))
          .filter(item => item.index !== index)
          .sort((a, b) => b.probability - a.probability)
        
        if (itemsToAdjust.length > 0) {
          const adjustIndex = itemsToAdjust[0].index
          const adjustment = 100 - total
          const newValue = parseFloat((updatedBoxesData[boxType][scenario][adjustIndex].probability + adjustment).toFixed(4))
          updatedBoxesData[boxType][scenario][adjustIndex].probability = newValue
        }
      }
    } else if (field === 'value') {
      // Update numeric value
      updatedBoxesData[boxType][scenario][index].value = parseInt(value) || 0
    } else {
      // Update other fields normally
      updatedBoxesData[boxType][scenario][index][field] = value
    }
    
    setBoxesData(updatedBoxesData)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Gift Box Probabilities</strong>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            
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
                          Math.abs(calculateTotalProbability(boxesData?.firstBox?.[activeScenario]) - 100) < 0.0001 
                            ? 'success' 
                            : 'danger'
                        }>
                          {calculateTotalProbability(boxesData?.firstBox?.[activeScenario]).toFixed(4)}%
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
                              <CTableDataCell>
                                <CFormInput
                                  type="number"
                                  value={item.value}
                                  onChange={(e) => handleValueChange('firstBox', activeScenario, index, 'value', e.target.value)}
                                  min="0"
                                />
                              </CTableDataCell>
                              <CTableDataCell>
                                <CFormInput
                                  type="text"
                                  value={item.description}
                                  onChange={(e) => handleValueChange('firstBox', activeScenario, index, 'description', e.target.value)}
                                />
                              </CTableDataCell>
                              <CTableDataCell>
                                <CInputGroup>
                                  <CFormInput
                                    type="number"
                                    value={item.probability.toFixed(4)}
                                    onChange={(e) => handleValueChange('firstBox', activeScenario, index, 'probability', e.target.value)}
                                    min="0"
                                    max="100"
                                    step="0.0001"
                                  />
                                  <CInputGroupText>%</CInputGroupText>
                                </CInputGroup>
                                <CProgress thin className="mt-2">
                                  <CProgressBar 
                                    color={item.probability < 1 ? 'danger' : item.probability < 10 ? 'warning' : 'success'} 
                                    value={item.probability} 
                                  />
                                </CProgress>
                              </CTableDataCell>
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
                          Math.abs(calculateTotalProbability(boxesData?.regularBox?.[activeScenario]) - 100) < 0.0001 
                            ? 'success' 
                            : 'danger'
                        }>
                          {calculateTotalProbability(boxesData?.regularBox?.[activeScenario]).toFixed(4)}%
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
                              <CTableDataCell>
                                <CFormInput
                                  type="number"
                                  value={item.value}
                                  onChange={(e) => handleValueChange('regularBox', activeScenario, index, 'value', e.target.value)}
                                  min="0"
                                />
                              </CTableDataCell>
                              <CTableDataCell>
                                <CFormInput
                                  type="text"
                                  value={item.description}
                                  onChange={(e) => handleValueChange('regularBox', activeScenario, index, 'description', e.target.value)}
                                />
                              </CTableDataCell>
                              <CTableDataCell>
                                <CInputGroup>
                                  <CFormInput
                                    type="number"
                                    value={item.probability.toFixed(4)}
                                    onChange={(e) => handleValueChange('regularBox', activeScenario, index, 'probability', e.target.value)}
                                    min="0"
                                    max="100"
                                    step="0.0001"
                                  />
                                  <CInputGroupText>%</CInputGroupText>
                                </CInputGroup>
                                <CProgress thin className="mt-2">
                                  <CProgressBar 
                                    color={item.probability < 1 ? 'danger' : item.probability < 10 ? 'warning' : 'success'} 
                                    value={item.probability} 
                                  />
                                </CProgress>
                              </CTableDataCell>
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

            {/* Submit Button */}
            <div className="d-flex justify-content-end mt-4">
              <CButton
                color="primary"
                onClick={() => setSuccess('Changes saved successfully!')}
              >
                <CIcon icon={cilSave} className="me-2" />
                Save Changes
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GiftBoxProbabilities
 