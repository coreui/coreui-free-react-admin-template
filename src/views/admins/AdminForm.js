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
  CFormCheck,
  CButton,
  CAlert,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'
import { useNavigate, useParams } from 'react-router-dom'

const AdminForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    isActive: true,
  })
  
  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  // If in edit mode, fetch admin data
  useEffect(() => {
    if (isEditMode) {
      // Mock data for demonstration
      const mockAdmins = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'admin@example.com',
          phone: '+1234567890',
          role: 'super_admin',
          isActive: true,
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '+0987654321',
          role: 'admin',
          isActive: true,
        },
        {
          id: '3',
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'mike.j@example.com',
          phone: '+1122334455',
          role: 'editor',
          isActive: false,
        },
      ]
      
      // Find admin by ID
      const admin = mockAdmins.find(admin => admin.id === id)
      
      if (admin) {
        // Remove password fields for edit mode
        const { password, confirmPassword, ...adminData } = admin
        setFormData(adminData)
      } else {
        setError('Admin not found')
      }
      
      setLoading(false)
    }
  }, [id, isEditMode])
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }
  
  const validateForm = () => {
    // Reset error
    setError(null)
    
    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      setError('First name and last name are required')
      return false
    }
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Valid email is required')
      return false
    }
    
    // Password validation for new admins
    if (!isEditMode) {
      if (!formData.password) {
        setError('Password is required for new admins')
        return false
      }
      
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long')
        return false
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return false
      }
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
      
      setSuccess(isEditMode ? 'Admin updated successfully!' : 'Admin created successfully!')
      
      // Redirect after successful save
      setTimeout(() => {
        navigate('/admins/list')
      }, 1500)
    } catch (error) {
      setError('Failed to save admin. Please try again.')
    } finally {
      setSaving(false)
    }
  }
  
  if (loading) {
    return <div className="text-center py-5">Loading admin data...</div>
  }
  
  return (
    <CRow>
      <CCol xs={12} md={8} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{isEditMode ? 'Edit Admin' : 'Create New Admin'}</strong>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                  <CFormInput
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                  <CFormInput
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
              </CRow>
              
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">Phone</CFormLabel>
                  <CFormInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>
              
              {!isEditMode && (
                <CRow className="mb-3">
                  <CCol md={6}>
                    <CFormLabel htmlFor="password">Password</CFormLabel>
                    <CFormInput
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!isEditMode}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="confirmPassword">Confirm Password</CFormLabel>
                    <CFormInput
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isEditMode}
                    />
                  </CCol>
                </CRow>
              )}
              
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="role">Role</CFormLabel>
                  <CFormSelect
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6} className="d-flex align-items-end">
                  <CFormCheck
                    id="isActive"
                    name="isActive"
                    label="Active Account"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>
              
              <div className="d-flex justify-content-end mt-4">
                <CButton
                  color="secondary"
                  variant="outline"
                  className="me-2"
                  onClick={() => navigate('/admins/list')}
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
                  {saving ? 'Saving...' : 'Save Admin'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AdminForm 