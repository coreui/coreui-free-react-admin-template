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
  CFormTextarea,
  CFormSelect,
  CButton,
  CAlert,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX, cilPlus, cilTrash } from '@coreui/icons'
import { useNavigate, useParams } from 'react-router-dom'

// Mock gift basket data
const mockBaskets = [
  {
    id: '1',
    name: 'Premium Gift Basket',
    description: 'A luxury gift basket with premium items',
    basePrice: 99.99,
    totalItems: 10,
    probability: 0.05,
    status: 'active',
    items: [
      { id: 1, name: 'Luxury Chocolate Box', quantity: 1, value: 25.99 },
      { id: 2, name: 'Premium Wine Bottle', quantity: 1, value: 40.00 },
      { id: 3, name: 'Gourmet Cheese Selection', quantity: 1, value: 18.50 },
      { id: 4, name: 'Artisan Crackers', quantity: 2, value: 7.99 },
    ]
  },
  {
    id: '2',
    name: 'Standard Gift Basket',
    description: 'A balanced gift basket with standard items',
    basePrice: 49.99,
    totalItems: 8,
    probability: 0.15,
    status: 'active',
    items: [
      { id: 1, name: 'Chocolate Box', quantity: 1, value: 12.99 },
      { id: 2, name: 'Wine Bottle', quantity: 1, value: 20.00 },
      { id: 3, name: 'Cheese Selection', quantity: 1, value: 9.50 },
      { id: 4, name: 'Crackers', quantity: 1, value: 3.99 },
    ]
  },
]

const GiftBasketForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    probability: 0.1,
    status: 'active',
    items: [],
  })
  
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    value: '',
  })
  
  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  // If in edit mode, fetch basket data
  useEffect(() => {
    if (isEditMode) {
      // Find basket by ID
      const basket = mockBaskets.find(basket => basket.id === id)
      
      if (basket) {
        setFormData(basket)
      } else {
        setError('Gift basket not found')
      }
      
      setLoading(false)
    }
  }, [id, isEditMode])
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    let finalValue = value
    
    // Handle numeric values
    if (name === 'basePrice' || name === 'probability') {
      finalValue = parseFloat(value) || 0
    }
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: finalValue })
    }
  }
  
  const handleNewItemChange = (e) => {
    const { name, value } = e.target
    
    let finalValue = value
    
    // Handle numeric values
    if (name === 'quantity') {
      finalValue = parseInt(value) || 1
    } else if (name === 'value') {
      finalValue = parseFloat(value) || 0
    }
    
    setNewItem({ ...newItem, [name]: finalValue })
  }
  
  const addItem = () => {
    // Validate
    if (!newItem.name || !newItem.value) {
      setError('Item name and value are required')
      return
    }
    
    // Add item with a unique ID
    const newId = formData.items.length > 0 
      ? Math.max(...formData.items.map(item => item.id)) + 1 
      : 1
      
    const items = [...formData.items, { ...newItem, id: newId }]
    
    // Update form data
    setFormData({ ...formData, items })
    
    // Reset new item form
    setNewItem({
      name: '',
      quantity: 1,
      value: '',
    })
    
    // Clear any error
    setError(null)
  }
  
  const removeItem = (id) => {
    const items = formData.items.filter(item => item.id !== id)
    setFormData({ ...formData, items })
  }
  
  const calculateTotalValue = () => {
    return formData.items.reduce((total, item) => {
      return total + (parseFloat(item.value) * item.quantity)
    }, 0)
  }
  
  const validateForm = () => {
    // Reset error
    setError(null)
    
    // Basic validation
    if (!formData.name) {
      setError('Basket name is required')
      return false
    }
    
    if (formData.basePrice <= 0) {
      setError('Base price must be greater than zero')
      return false
    }
    
    if (formData.probability < 0 || formData.probability > 1) {
      setError('Probability must be between 0 and 1')
      return false
    }
    
    if (formData.items.length === 0) {
      setError('At least one item is required in the basket')
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
      
      setSuccess(isEditMode ? 'Gift basket updated successfully!' : 'Gift basket created successfully!')
      
      // Redirect after successful save
      setTimeout(() => {
        navigate('/gift-baskets/list')
      }, 1500)
    } catch (error) {
      setError('Failed to save gift basket. Please try again.')
    } finally {
      setSaving(false)
    }
  }
  
  if (loading) {
    return <div className="text-center py-5">Loading gift basket data...</div>
  }
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{isEditMode ? 'Edit Gift Basket' : 'Create New Gift Basket'}</strong>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={8}>
                  <CFormLabel htmlFor="name">Basket Name</CFormLabel>
                  <CFormInput
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="status">Status</CFormLabel>
                  <CFormSelect
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              
              <div className="mb-3">
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormTextarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="basePrice">Base Price</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>$</CInputGroupText>
                    <CFormInput
                      id="basePrice"
                      name="basePrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      required
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="probability">
                    Probability (0-1)
                    <span className="text-muted ms-2">
                      {formData.probability && `${(formData.probability * 100).toFixed(1)}%`}
                    </span>
                  </CFormLabel>
                  <CFormInput
                    id="probability"
                    name="probability"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.probability}
                    onChange={handleInputChange}
                    required
                  />
                  <small className="text-muted">
                    Note: Overall probabilities can be adjusted in the Probabilities page
                  </small>
                </CCol>
              </CRow>
              
              <hr className="my-4" />
              
              <h5 className="mb-3">Basket Items</h5>
              
              <CCard className="mb-4 border">
                <CCardBody>
                  <CRow className="mb-3 align-items-end">
                    <CCol md={5}>
                      <CFormLabel htmlFor="item-name">Item Name</CFormLabel>
                      <CFormInput
                        id="item-name"
                        name="name"
                        value={newItem.name}
                        onChange={handleNewItemChange}
                      />
                    </CCol>
                    <CCol md={2}>
                      <CFormLabel htmlFor="item-quantity">Quantity</CFormLabel>
                      <CFormInput
                        id="item-quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        value={newItem.quantity}
                        onChange={handleNewItemChange}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel htmlFor="item-value">Value</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>$</CInputGroupText>
                        <CFormInput
                          id="item-value"
                          name="value"
                          type="number"
                          step="0.01"
                          min="0"
                          value={newItem.value}
                          onChange={handleNewItemChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={2}>
                      <CButton 
                        color="success" 
                        className="w-100"
                        onClick={addItem}
                      >
                        <CIcon icon={cilPlus} className="me-2" />
                        Add
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              
              <CTable bordered responsive className="mb-4">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell width="50">#</CTableHeaderCell>
                    <CTableHeaderCell>Item Name</CTableHeaderCell>
                    <CTableHeaderCell width="100">Quantity</CTableHeaderCell>
                    <CTableHeaderCell width="120">Value</CTableHeaderCell>
                    <CTableHeaderCell width="120">Total</CTableHeaderCell>
                    <CTableHeaderCell width="80">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {formData.items.length > 0 ? (
                    <>
                      {formData.items.map((item, index) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell>{item.name}</CTableDataCell>
                          <CTableDataCell>{item.quantity}</CTableDataCell>
                          <CTableDataCell>${parseFloat(item.value).toFixed(2)}</CTableDataCell>
                          <CTableDataCell>${(item.quantity * parseFloat(item.value)).toFixed(2)}</CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CButton
                              color="danger"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                      <CTableRow className="fw-bold">
                        <CTableDataCell colSpan={4} className="text-end">
                          Total Value:
                        </CTableDataCell>
                        <CTableDataCell>${calculateTotalValue().toFixed(2)}</CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                      </CTableRow>
                    </>
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={6} className="text-center py-3">
                        No items added yet
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
              
              <div className="d-flex justify-content-end mt-4">
                <CButton
                  color="secondary"
                  variant="outline"
                  className="me-2"
                  onClick={() => navigate('/gift-baskets/list')}
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
                  {saving ? 'Saving...' : 'Save Gift Basket'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GiftBasketForm 