import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CAlert,
  CInputGroup,
  CInputGroupText,
  CInputGroupAppend,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'
import { useNavigate, useParams } from 'react-router-dom'

// Mock data from API structure
const mockBoxesData = {
  firstBox: {
    btcGivenToday: [
      { type: "points", value: 50000, description: "VND 50,000", probability: 50.0 },
      { type: "points", value: 70000, description: "VND 70,000", probability: 30.0 },
      { type: "points", value: 100000, description: "VND 100,000", probability: 10.0 },
      { type: "points", value: 120000, description: "VND 120,000", probability: 10.0 }
    ],
    btcNotGivenToday: [
      { type: "points", value: 50000, description: "VND 50,000", probability: 50.0 },
      { type: "points", value: 70000, description: "VND 70,000", probability: 30.0 },
      { type: "points", value: 100000, description: "VND 100,000", probability: 10.0 },
      { type: "points", value: 120000, description: "VND 120,000", probability: 9.9 },
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

const GiftBoxForm = () => {
  const navigate = useNavigate()
  // Get parameters from the URL
  const { boxType, scenario, index } = useParams()
  const isEditMode = !!index
  
  const [formData, setFormData] = useState({
    type: 'points',
    value: '',
    description: '',
    probability: '',
  })
  
  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  // If in edit mode, fetch item data
  useEffect(() => {
    if (isEditMode && boxType && scenario) {
      setLoading(true)
      
      // Simulate API call to get existing data
      setTimeout(() => {
        try {
          const itemData = mockBoxesData[boxType][scenario][parseInt(index)]
          if (itemData) {
            setFormData(itemData)
          } else {
            setError('Gift box item not found')
          }
        } catch (err) {
          setError('Failed to load item data')
        } finally {
          setLoading(false)
        }
      }, 500)
    }
  }, [boxType, scenario, index, isEditMode])
  
  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    
    let finalValue = value
    
    // Handle numeric values
    if (name === 'value') {
      finalValue = parseInt(value) || 0
    } else if (name === 'probability') {
      finalValue = parseFloat(value) || 0
    }
    
    setFormData({ ...formData, [name]: finalValue })
  }
  
  const validateForm = () => {
    // Reset error
    setError(null)
    
    // Basic validation
    if (!formData.description) {
      setError('Description is required')
      return false
    }
    
    if (formData.value <= 0) {
      setError('Value must be greater than zero')
      return false
    }
    
    if (formData.probability <= 0 || formData.probability > 100) {
      setError('Probability must be between 0 and 100')
      return false
    }
    
    return true
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess(isEditMode ? 'Gift box item updated successfully!' : 'Gift box item created successfully!')
      
      // Redirect after successful save
      setTimeout(() => {
        navigate('/gift-boxes/list')
      }, 1500)
    } catch (error) {
      setError('Failed to save gift box item. Please try again.')
    } finally {
      setSaving(false)
    }
  }
  
  if (loading) {
    return <div className="text-center py-5">Loading gift box item data...</div>
  }
  
  return (
    <CRow>
      <CCol xs={12} md={8} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{isEditMode ? 'Edit Gift Box Item' : 'Create New Gift Box Item'}</strong>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="boxType">Box Type</CFormLabel>
                  <CFormSelect
                    id="boxType"
                    name="boxType"
                    value={boxType || 'firstBox'}
                    onChange={(e) => navigate(`/gift-boxes/${isEditMode ? 'edit' : 'create'}/${e.target.value}/${scenario || 'btcNotGivenToday'}${isEditMode ? `/${index}` : ''}`)}
                    disabled={isEditMode}
                  >
                    <option value="firstBox">First Box</option>
                    <option value="regularBox">Regular Box</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="scenario">Scenario</CFormLabel>
                  <CFormSelect
                    id="scenario"
                    name="scenario"
                    value={scenario || 'btcNotGivenToday'}
                    onChange={(e) => navigate(`/gift-boxes/${isEditMode ? 'edit' : 'create'}/${boxType || 'firstBox'}/${e.target.value}${isEditMode ? `/${index}` : ''}`)}
                    disabled={isEditMode}
                  >
                    <option value="btcNotGivenToday">BTC Not Given Today</option>
                    <option value="btcGivenToday">BTC Given Today</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="type">Reward Type</CFormLabel>
                  <CFormSelect
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="points">Points</option>
                    <option value="btc">BTC</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="value">Value</CFormLabel>
                  <CFormInput
                    id="value"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
              </CRow>
              
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormInput
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="probability">Probability (%)</CFormLabel>
                  <CInputGroup>
                    <CFormInput
                      id="probability"
                      name="probability"
                      type="number"
                      step="0.0001"
                      min="0"
                      max="100"
                      value={formData.probability}
                      onChange={handleInputChange}
                      required
                    />
                    <CInputGroupText>%</CInputGroupText>
                  </CInputGroup>
                </CCol>
              </CRow>
              
              <div className="d-flex justify-content-end mt-4">
                <CButton
                  color="secondary"
                  variant="outline"
                  className="me-2"
                  onClick={() => navigate('/gift-boxes/list')}
                >
                  <CIcon icon={cilX} className="me-2" />
                  Cancel
                </CButton>
                <CButton
                  type="submit"
                  color="primary"
                  disabled={saving}
                >
                  <CIcon icon={cilSave} className="me-2" />
                  {saving ? 'Saving...' : 'Save Item'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GiftBoxForm 