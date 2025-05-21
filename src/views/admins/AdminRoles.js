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
  CFormCheck,
  CAlert,
  CForm,
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash, cilSave } from '@coreui/icons'

// Mock data for roles
const initialRoles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to all features and settings',
    permissions: ['users_manage', 'admins_manage', 'roles_manage', 'system_settings', 'logs_view', 'gift_baskets_manage'],
    isSystem: true,
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Access to most administration features',
    permissions: ['users_manage', 'gift_baskets_manage', 'logs_view'],
    isSystem: false,
  },
  {
    id: 3,
    name: 'Editor',
    description: 'Can edit content but not access sensitive settings',
    permissions: ['gift_baskets_manage'],
    isSystem: false,
  },
  {
    id: 4,
    name: 'Viewer',
    description: 'View-only access to dashboard and reports',
    permissions: [],
    isSystem: false,
  },
]

// Mock data for available permissions
const availablePermissions = [
  { id: 'users_manage', name: 'Manage Users', description: 'Create, edit, and delete users' },
  { id: 'admins_manage', name: 'Manage Admins', description: 'Create, edit, and delete admins' },
  { id: 'roles_manage', name: 'Manage Roles', description: 'Create, edit, and delete roles' },
  { id: 'system_settings', name: 'System Settings', description: 'Access to system configuration' },
  { id: 'logs_view', name: 'View Logs', description: 'Access to system and user logs' },
  { id: 'gift_boxes_manage', name: 'Manage Gift Boxes', description: 'Create, edit, and delete gift boxes' },
]

const AdminRoles = () => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentRole, setCurrentRole] = useState({
    name: '',
    description: '',
    permissions: [],
  })
  const [isEditing, setIsEditing] = useState(false)

  // Load mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRoles(initialRoles)
      setLoading(false)
    }, 500)
  }, [])

  const handleOpenModal = (role = null) => {
    if (role) {
      setCurrentRole({ ...role })
      setIsEditing(true)
    } else {
      setCurrentRole({
        name: '',
        description: '',
        permissions: [],
      })
      setIsEditing(false)
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setError(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentRole({ ...currentRole, [name]: value })
  }

  const handlePermissionChange = (permissionId) => {
    const permissions = [...currentRole.permissions]
    
    if (permissions.includes(permissionId)) {
      // Remove permission
      const index = permissions.indexOf(permissionId)
      permissions.splice(index, 1)
    } else {
      // Add permission
      permissions.push(permissionId)
    }
    
    setCurrentRole({ ...currentRole, permissions })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!currentRole.name) {
      setError('Role name is required')
      return
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      if (isEditing) {
        // Update existing role
        setRoles(roles.map(role => 
          role.id === currentRole.id ? currentRole : role
        ))
        setSuccess('Role updated successfully!')
      } else {
        // Create new role
        const newRole = {
          ...currentRole,
          id: Math.max(...roles.map(role => role.id)) + 1,
          isSystem: false,
        }
        setRoles([...roles, newRole])
        setSuccess('Role created successfully!')
      }
      
      // Close modal after short delay
      setTimeout(() => {
        handleCloseModal()
        setSuccess(null)
      }, 1500)
    } catch (error) {
      setError('Failed to save role. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    // Check if it's a system role
    const role = roles.find(role => role.id === id)
    
    if (role && role.isSystem) {
      setError('System roles cannot be deleted')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Remove role
        setRoles(roles.filter(role => role.id !== id))
        setSuccess('Role deleted successfully!')
        
        // Clear success message after delay
        setTimeout(() => {
          setSuccess(null)
        }, 3000)
      } catch (error) {
        setError('Failed to delete role. Please try again.')
        setTimeout(() => setError(null), 3000)
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Admin Roles</strong>
            <CButton
              color="primary"
              className="float-end"
              onClick={() => handleOpenModal()}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Create Role
            </CButton>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            
            {loading ? (
              <div className="text-center my-5">Loading roles...</div>
            ) : (
              <CTable bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Role Name</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Permissions</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: '150px' }}>Type</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: '120px' }}>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {roles.map(role => (
                    <CTableRow key={role.id}>
                      <CTableDataCell className="fw-bold">{role.name}</CTableDataCell>
                      <CTableDataCell>{role.description}</CTableDataCell>
                      <CTableDataCell>
                        {role.permissions.length > 0 ? (
                          <div className="d-flex flex-wrap gap-1">
                            {role.permissions.map(permId => {
                              const permission = availablePermissions.find(p => p.id === permId)
                              return (
                                <CBadge key={permId} color="info" className="me-1 mb-1">
                                  {permission ? permission.name : permId}
                                </CBadge>
                              )
                            })}
                          </div>
                        ) : (
                          <span className="text-muted">No permissions</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {role.isSystem ? (
                          <CBadge color="danger">System</CBadge>
                        ) : (
                          <CBadge color="light">Custom</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          variant="ghost"
                          size="sm"
                          className="me-1"
                          onClick={() => handleOpenModal(role)}
                          title="Edit"
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          color="danger"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(role.id)}
                          disabled={role.isSystem}
                          title={role.isSystem ? 'System roles cannot be deleted' : 'Delete'}
                        >
                          <CIcon icon={cilTrash} />
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
      
      {/* Role Modal */}
      <CModal visible={showModal} onClose={handleCloseModal}>
        <CModalHeader onClose={handleCloseModal}>
          <CModalTitle>{isEditing ? 'Edit Role' : 'Create New Role'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {error && <CAlert color="danger">{error}</CAlert>}
          
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="name">Role Name</CFormLabel>
              <CFormInput
                id="name"
                name="name"
                value={currentRole.name}
                onChange={handleInputChange}
                disabled={isEditing && currentRole.isSystem}
                required
              />
            </div>
            
            <div className="mb-3">
              <CFormLabel htmlFor="description">Description</CFormLabel>
              <CFormTextarea
                id="description"
                name="description"
                rows={2}
                value={currentRole.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-3">
              <CFormLabel>Permissions</CFormLabel>
              {availablePermissions.map(permission => (
                <div key={permission.id} className="mb-2">
                  <CFormCheck
                    id={`perm-${permission.id}`}
                    label={permission.name}
                    checked={currentRole.permissions.includes(permission.id)}
                    onChange={() => handlePermissionChange(permission.id)}
                    disabled={isEditing && currentRole.isSystem}
                  />
                  <div className="text-muted small ms-4">{permission.description}</div>
                </div>
              ))}
            </div>
            
            {isEditing && currentRole.isSystem && (
              <CAlert color="warning" className="mb-3">
                System roles can be viewed but not modified.
              </CAlert>
            )}
            
            <CModalFooter className="px-0 pb-0">
              <CButton color="secondary" onClick={handleCloseModal}>
                Cancel
              </CButton>
              <CButton
                type="submit"
                color="primary"
                disabled={isEditing && currentRole.isSystem}
              >
                <CIcon icon={cilSave} className="me-2" />
                {isEditing ? 'Update Role' : 'Create Role'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </CRow>
  )
}

export default AdminRoles 