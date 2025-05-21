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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormCheck,
  CInputGroup,
  CInputGroupText,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import { ticketApi } from 'src/services/api'

const TicketTypes = () => {
  const [ticketTypes, setTicketTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [currentType, setCurrentType] = useState({
    name: '',
    description: '',
    basePrice: '',
    isLimited: false,
    maxPerOrder: '',
    color: '#28a745',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Fetch ticket types on component mount
  useEffect(() => {
    fetchTicketTypes()
  }, [])

  const fetchTicketTypes = async () => {
    try {
      setLoading(true)
      const response = await ticketApi.getTicketTypes()
      setTicketTypes(response)
    } catch (error) {
      setError('Failed to load ticket types. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (ticketType = null) => {
    if (ticketType) {
      setCurrentType(ticketType)
      setIsEditing(true)
    } else {
      setCurrentType({
        name: '',
        description: '',
        basePrice: '',
        isLimited: false,
        maxPerOrder: '',
        color: '#28a745',
      })
      setIsEditing(false)
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setError(null)
    setSuccess(null)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setCurrentType({ ...currentType, [name]: checked })
    } else {
      setCurrentType({ ...currentType, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (isEditing) {
        await ticketApi.updateTicketType(currentType.id, currentType)
        setSuccess('Ticket type updated successfully!')
      } else {
        await ticketApi.createTicketType(currentType)
        setSuccess('Ticket type created successfully!')
      }
      
      // Refresh ticket types list
      fetchTicketTypes()
      
      // Close modal after short delay
      setTimeout(() => {
        handleCloseModal()
      }, 1500)
    } catch (error) {
      setError(error.message || 'Failed to save ticket type. Please try again.')
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket type? This may affect existing tickets.')) {
      try {
        await ticketApi.deleteTicketType(id)
        setTicketTypes(ticketTypes.filter(type => type.id !== id))
      } catch (error) {
        setError('Failed to delete ticket type. It may be in use by existing tickets.')
        console.error(error)
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Ticket Types</strong>
            <CButton 
              color="primary" 
              className="float-end"
              onClick={() => handleOpenModal()}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Add Ticket Type
            </CButton>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            
            {loading ? (
              <div className="text-center my-5">Loading ticket types...</div>
            ) : (
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Base Price</CTableHeaderCell>
                    <CTableHeaderCell>Max Per Order</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {ticketTypes.length > 0 ? (
                    ticketTypes.map(type => (
                      <CTableRow key={type.id}>
                        <CTableDataCell>
                          <div className="fw-bold" style={{ color: type.color || '#000' }}>
                            {type.name}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {type.description || 'No description'}
                        </CTableDataCell>
                        <CTableDataCell>
                          ${parseFloat(type.basePrice).toFixed(2)}
                        </CTableDataCell>
                        <CTableDataCell>
                          {type.isLimited ? type.maxPerOrder || 'Limited' : 'Unlimited'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {type.isActive !== false ? (
                            <span className="text-success">Active</span>
                          ) : (
                            <span className="text-danger">Inactive</span>
                          )}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                            color="info"
                            variant="ghost"
                            size="sm"
                            className="me-2"
                            onClick={() => handleOpenModal(type)}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton
                            color="danger"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(type.id)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="6" className="text-center py-5">
                        No ticket types found
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Ticket Type Modal */}
      <CModal visible={showModal} onClose={handleCloseModal}>
        <CModalHeader onClose={handleCloseModal}>
          <CModalTitle>{isEditing ? 'Edit Ticket Type' : 'Add New Ticket Type'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {error && <CAlert color="danger">{error}</CAlert>}
          {success && <CAlert color="success">{success}</CAlert>}
          
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="name">Name</CFormLabel>
              <CFormInput
                id="name"
                name="name"
                value={currentType.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <CFormLabel htmlFor="description">Description</CFormLabel>
              <CFormTextarea
                id="description"
                name="description"
                rows={3}
                value={currentType.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-3">
              <CFormLabel htmlFor="basePrice">Base Price</CFormLabel>
              <CInputGroup>
                <CInputGroupText>$</CInputGroupText>
                <CFormInput
                  type="number"
                  step="0.01"
                  min="0"
                  id="basePrice"
                  name="basePrice"
                  value={currentType.basePrice}
                  onChange={handleInputChange}
                  required
                />
              </CInputGroup>
            </div>

            <div className="mb-3">
              <CFormCheck
                id="isLimited"
                name="isLimited"
                label="Limit quantity per order"
                checked={currentType.isLimited}
                onChange={handleInputChange}
              />
            </div>

            {currentType.isLimited && (
              <div className="mb-3">
                <CFormLabel htmlFor="maxPerOrder">Maximum Per Order</CFormLabel>
                <CFormInput
                  type="number"
                  min="1"
                  id="maxPerOrder"
                  name="maxPerOrder"
                  value={currentType.maxPerOrder}
                  onChange={handleInputChange}
                  required={currentType.isLimited}
                />
              </div>
            )}
            
            <div className="mb-3">
              <CFormLabel htmlFor="color">Display Color</CFormLabel>
              <div className="d-flex">
                <CFormInput
                  type="color"
                  id="color"
                  name="color"
                  value={currentType.color}
                  onChange={handleInputChange}
                  style={{ width: '60px' }}
                />
                <CFormInput
                  type="text"
                  name="color"
                  value={currentType.color}
                  onChange={handleInputChange}
                  className="ms-2"
                />
              </div>
            </div>

            <CModalFooter className="px-0 pb-0">
              <CButton color="secondary" onClick={handleCloseModal}>
                Cancel
              </CButton>
              <CButton type="submit" color="primary">
                {isEditing ? 'Update' : 'Create'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </CRow>
  )
}

export default TicketTypes 