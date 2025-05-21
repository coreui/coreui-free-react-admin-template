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
  CAlert,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import { eventApi } from 'src/services/api'

const EventCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState({ name: '', description: '', color: '#3399ff' })
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await eventApi.getCategories()
      setCategories(response)
    } catch (error) {
      setError('Failed to load categories. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (category = null) => {
    if (category) {
      setCurrentCategory(category)
      setIsEditing(true)
    } else {
      setCurrentCategory({ name: '', description: '', color: '#3399ff' })
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
    const { name, value } = e.target
    setCurrentCategory({ ...currentCategory, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (isEditing) {
        await eventApi.updateCategory(currentCategory.id, currentCategory)
        setSuccess('Category updated successfully!')
      } else {
        await eventApi.createCategory(currentCategory)
        setSuccess('Category created successfully!')
      }
      
      // Refresh categories list
      fetchCategories()
      
      // Close modal after short delay
      setTimeout(() => {
        handleCloseModal()
      }, 1500)
    } catch (error) {
      setError(error.message || 'Failed to save category. Please try again.')
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await eventApi.deleteCategory(id)
        setCategories(categories.filter(category => category.id !== id))
      } catch (error) {
        setError('Failed to delete category. It may be in use by existing events.')
        console.error(error)
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Event Categories</strong>
            <CButton 
              color="primary" 
              className="float-end"
              onClick={() => handleOpenModal()}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Add Category
            </CButton>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            
            {loading ? (
              <div className="text-center my-5">Loading categories...</div>
            ) : (
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Color</CTableHeaderCell>
                    <CTableHeaderCell>Events Count</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {categories.length > 0 ? (
                    categories.map(category => (
                      <CTableRow key={category.id}>
                        <CTableDataCell>
                          <div className="fw-bold">{category.name}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {category.description || 'No description'}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color="light" style={{ backgroundColor: category.color }}>
                            {category.color}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          {category.eventsCount || 0} events
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                            color="info"
                            variant="ghost"
                            size="sm"
                            className="me-2"
                            onClick={() => handleOpenModal(category)}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton
                            color="danger"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(category.id)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center py-5">
                        No categories found
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Category Modal */}
      <CModal visible={showModal} onClose={handleCloseModal}>
        <CModalHeader onClose={handleCloseModal}>
          <CModalTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</CModalTitle>
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
                value={currentCategory.name}
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
                value={currentCategory.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-3">
              <CFormLabel htmlFor="color">Color</CFormLabel>
              <div className="d-flex">
                <CFormInput
                  type="color"
                  id="color"
                  name="color"
                  value={currentCategory.color}
                  onChange={handleInputChange}
                  style={{ width: '60px' }}
                />
                <CFormInput
                  type="text"
                  name="color"
                  value={currentCategory.color}
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

export default EventCategories 