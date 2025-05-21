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
  CForm,
  CFormInput,
  CFormLabel,
  CProgress,
  CProgressBar,
  CTooltip,
  CAlert,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning, cilSave, cilRedo } from '@coreui/icons'

// Mock data for gift baskets with probabilities
const initialBaskets = [
  {
    id: 1,
    name: 'Premium Gift Basket',
    basePrice: 99.99,
    probability: 0.05,
  },
  {
    id: 2,
    name: 'Standard Gift Basket',
    basePrice: 49.99,
    probability: 0.15,
  },
  {
    id: 3,
    name: 'Basic Gift Basket',
    basePrice: 29.99,
    probability: 0.30,
  },
  {
    id: 4,
    name: 'Seasonal Special',
    basePrice: 69.99,
    probability: 0.10,
  },
  {
    id: 5,
    name: 'Holiday Bundle',
    basePrice: 79.99,
    probability: 0.10,
  },
  {
    id: 6,
    name: 'Mini Gift Basket',
    basePrice: 19.99,
    probability: 0.30,
  },
]

const GiftBasketProbabilities = () => {
  const [baskets, setBaskets] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalProbability, setTotalProbability] = useState(0)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [saving, setSaving] = useState(false)

  // Load mock data on component mount
  useEffect(() => {
    const fetchBaskets = () => {
      setLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        setBaskets(initialBaskets)
        setLoading(false)
      }, 500)
    }

    fetchBaskets()
  }, [])

  // Calculate total probability whenever baskets change
  useEffect(() => {
    const total = baskets.reduce((sum, basket) => sum + parseFloat(basket.probability || 0), 0)
    setTotalProbability(total)
  }, [baskets])

  const handleProbabilityChange = (id, value) => {
    // Convert value to number and ensure it's between 0 and 1
    const probability = Math.min(Math.max(parseFloat(value) || 0, 0), 1)
    
    setBaskets(baskets.map(basket => 
      basket.id === id ? { ...basket, probability } : basket
    ))
  }

  const handleSave = async () => {
    // Validate total probability is close to 1
    if (Math.abs(totalProbability - 1) > 0.01) {
      setError('Total probability must equal 100%. Please adjust the values.')
      return
    }
    
    setSaving(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess('Probability settings saved successfully!')
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (error) {
      setError('Failed to save probability settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset probabilities to default values?')) {
      setBaskets(initialBaskets)
    }
  }

  const distributeEvenly = () => {
    const evenProbability = 1 / baskets.length
    setBaskets(baskets.map(basket => ({ ...basket, probability: evenProbability })))
  }

  const getProgressBarColor = () => {
    if (Math.abs(totalProbability - 1) < 0.01) return 'success'
    if (totalProbability > 1) return 'danger'
    return 'warning'
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Gift Basket Probabilities</strong>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            
            <CCard className="mb-4 border-info">
              <CCardBody>
                <div className="d-flex align-items-center mb-3">
                  <CIcon icon={cilWarning} className="text-info me-2" />
                  <h6 className="mb-0">Probability Distribution</h6>
                </div>
                <p className="text-medium-emphasis small">
                  Adjust the probability of each gift basket being selected. The total probability should equal 100%.
                </p>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <div>Total Probability</div>
                    <div className={totalProbability === 1 ? 'text-success' : 'text-danger'}>
                      {(totalProbability * 100).toFixed(1)}%
                    </div>
                  </div>
                  <CProgress className="mb-3">
                    <CTooltip content={`${(totalProbability * 100).toFixed(1)}%`}>
                      <CProgressBar color={getProgressBarColor()} value={totalProbability * 100} />
                    </CTooltip>
                  </CProgress>
                </div>
                <div className="d-flex gap-2">
                  <CButton color="primary" size="sm" onClick={distributeEvenly}>
                    Distribute Evenly
                  </CButton>
                  <CButton color="secondary" size="sm" onClick={handleReset}>
                    Reset to Default
                  </CButton>
                </div>
              </CCardBody>
            </CCard>

            {loading ? (
              <div className="text-center my-5">Loading gift baskets...</div>
            ) : (
              <CForm>
                <CTable bordered responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Basket Name</CTableHeaderCell>
                      <CTableHeaderCell>Base Price</CTableHeaderCell>
                      <CTableHeaderCell style={{ width: '300px' }}>Probability</CTableHeaderCell>
                      <CTableHeaderCell style={{ width: '120px' }}>Percentage</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {baskets.map(basket => (
                      <CTableRow key={basket.id}>
                        <CTableDataCell>
                          <strong>{basket.name}</strong>
                        </CTableDataCell>
                        <CTableDataCell>
                          ${basket.basePrice.toFixed(2)}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CInputGroup>
                            <CFormInput
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={basket.probability}
                              onChange={(e) => handleProbabilityChange(basket.id, e.target.value)}
                              style={{ flexGrow: 2 }}
                            />
                            <CFormInput
                              type="number"
                              min="0"
                              max="1"
                              step="0.01"
                              value={basket.probability}
                              onChange={(e) => handleProbabilityChange(basket.id, e.target.value)}
                              style={{ width: '80px' }}
                            />
                          </CInputGroup>
                        </CTableDataCell>
                        <CTableDataCell>
                          {(basket.probability * 100).toFixed(1)}%
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                <div className="d-flex justify-content-end mt-4">
                  <CButton 
                    color="secondary" 
                    variant="outline"
                    className="me-2"
                    onClick={handleReset}
                  >
                    <CIcon icon={cilRedo} className="me-2" />
                    Reset
                  </CButton>
                  <CButton 
                    color="primary" 
                    onClick={handleSave}
                    disabled={saving || Math.abs(totalProbability - 1) > 0.01}
                  >
                    <CIcon icon={cilSave} className="me-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </CButton>
                </div>
              </CForm>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GiftBasketProbabilities 