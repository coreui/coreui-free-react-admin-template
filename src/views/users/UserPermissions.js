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
  CFormInput,
  CForm,
  CFormCheck,
  CAlert,
  CFormSelect,
  CBadge,
  CAvatar,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilSearch } from '@coreui/icons'
import { userApi } from 'src/services/api'

const defaultAvatar = 'https://via.placeholder.com/40'

const UserPermissions = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [permissions, setPermissions] = useState([])
  const [userPermissions, setUserPermissions] = useState({})

  // Fetch users and permissions on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        
        // Fetch users
        const usersResponse = await userApi.getUsers(1, 100)
        setUsers(usersResponse.data || [])
        
        // Fetch all available permissions
        const permissionsResponse = await userApi.getPermissions()
        setPermissions(permissionsResponse || [])
      } catch (error) {
        setError('Failed to load data. Please refresh the page.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  // Fetch specific user's permissions when a user is selected
  useEffect(() => {
    const fetchUserPermissions = async () => {
      if (!selectedUser) return
      
      try {
        setLoading(true)
        
        // Fetch the full user data including permissions
        const userData = await userApi.getUser(selectedUser.id)
        
        // Transform permissions to a more usable format
        const permissionsMap = {}
        if (userData.permissions) {
          userData.permissions.forEach(perm => {
            permissionsMap[perm.id] = true
          })
        }
        
        setUserPermissions(permissionsMap)
      } catch (error) {
        setError('Failed to load user permissions.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserPermissions()
  }, [selectedUser])

  const handleSearch = (e) => {
    e.preventDefault()
    // Filter users based on search term
    if (!searchTerm.trim()) return
    
    const filteredUsers = users.filter(user => 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    if (filteredUsers.length > 0) {
      setSelectedUser(filteredUsers[0])
    } else {
      setError('No users found matching your search.')
    }
  }

  const handleUserChange = (e) => {
    const userId = e.target.value
    if (!userId) {
      setSelectedUser(null)
      return
    }
    
    const user = users.find(u => u.id === userId)
    setSelectedUser(user || null)
  }

  const handlePermissionChange = (permissionId, checked) => {
    setUserPermissions(prev => ({
      ...prev,
      [permissionId]: checked
    }))
  }

  const handleRoleChange = (role) => {
    if (!selectedUser) return
    
    // Reset permissions
    const defaultPermissions = {}
    
    // Set default permissions based on role
    permissions.forEach(permission => {
      // Admin gets all permissions
      if (role === 'admin') {
        defaultPermissions[permission.id] = true
      }
      // Staff gets most permissions except sensitive ones
      else if (role === 'staff') {
        defaultPermissions[permission.id] = !permission.isAdminOnly
      }
      // Organizer gets event-related permissions
      else if (role === 'organizer') {
        defaultPermissions[permission.id] = permission.isEventRelated
      }
      // Regular users get minimal permissions
      else {
        defaultPermissions[permission.id] = permission.isBasic
      }
    })
    
    setUserPermissions(defaultPermissions)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedUser) {
      setError('Please select a user first')
      return
    }
    
    try {
      setSaving(true)
      setError(null)
      
      // Transform permissions back to array format for API
      const permissionsToSave = Object.entries(userPermissions)
        .filter(([_, isEnabled]) => isEnabled)
        .map(([permId, _]) => permId)
      
      await userApi.updatePermission(selectedUser.id, { permissions: permissionsToSave })
      
      setSuccess('User permissions updated successfully!')
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (error) {
      setError(error.message || 'Failed to update permissions. Please try again.')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const getRoleBadge = (role) => {
    const roleMap = {
      'admin': { color: 'danger', label: 'Admin' },
      'staff': { color: 'warning', label: 'Staff' },
      'organizer': { color: 'info', label: 'Organizer' },
      'user': { color: 'success', label: 'User' },
    }
    
    const roleInfo = roleMap[role] || { color: 'light', label: role }
    
    return (
      <CBadge color={roleInfo.color}>{roleInfo.label}</CBadge>
    )
  }

  // Group permissions by category for better organization
  const groupedPermissions = permissions.reduce((acc, permission) => {
    const category = permission.category || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(permission)
    return acc
  }, {})

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User Permissions</strong>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}
            
            {/* User Selection */}
            <CRow className="mb-4">
              <CCol md={6}>
                <CForm onSubmit={handleSearch} className="d-flex">
                  <CFormInput
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="me-2"
                  />
                  <CButton type="submit" color="primary">
                    <CIcon icon={cilSearch} />
                  </CButton>
                </CForm>
              </CCol>
              <CCol md={6}>
                <CFormSelect
                  value={selectedUser?.id || ''}
                  onChange={handleUserChange}
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} ({user.email})
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>

            {/* User Details */}
            {selectedUser && (
              <CRow className="mb-4">
                <CCol xs={12}>
                  <div className="border rounded p-3 bg-light">
                    <div className="d-flex align-items-center">
                      <CAvatar size="xl" src={selectedUser.avatar || defaultAvatar} className="me-3" />
                      <div>
                        <h4>{selectedUser.firstName} {selectedUser.lastName}</h4>
                        <div>Email: {selectedUser.email}</div>
                        <div>Current Role: {getRoleBadge(selectedUser.role)}</div>
                      </div>
                    </div>
                  </div>
                </CCol>
              </CRow>
            )}

            {/* Role Template Selection */}
            {selectedUser && (
              <CRow className="mb-4">
                <CCol xs={12}>
                  <div className="border rounded p-3">
                    <h5>Apply Role Template</h5>
                    <p className="text-muted small">This will preset permissions based on the selected role.</p>
                    <div className="d-flex gap-2">
                      <CButton color="danger" size="sm" onClick={() => handleRoleChange('admin')}>Admin</CButton>
                      <CButton color="warning" size="sm" onClick={() => handleRoleChange('staff')}>Staff</CButton>
                      <CButton color="info" size="sm" onClick={() => handleRoleChange('organizer')}>Organizer</CButton>
                      <CButton color="success" size="sm" onClick={() => handleRoleChange('user')}>Basic User</CButton>
                    </div>
                  </div>
                </CCol>
              </CRow>
            )}

            {/* Permissions Table */}
            {selectedUser && !loading ? (
              <CForm onSubmit={handleSubmit}>
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category} className="mb-4">
                    <h5>{category}</h5>
                    <CTable hover responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell style={{ width: '50px' }}>Enable</CTableHeaderCell>
                          <CTableHeaderCell>Permission</CTableHeaderCell>
                          <CTableHeaderCell>Description</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {categoryPermissions.map(permission => (
                          <CTableRow key={permission.id}>
                            <CTableDataCell>
                              <CFormCheck
                                id={`perm-${permission.id}`}
                                checked={!!userPermissions[permission.id]}
                                onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              <label htmlFor={`perm-${permission.id}`} className="fw-bold">
                                {permission.name}
                              </label>
                            </CTableDataCell>
                            <CTableDataCell>
                              {permission.description}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </div>
                ))}

                <div className="d-flex justify-content-end">
                  <CButton 
                    type="submit" 
                    color="primary"
                    disabled={saving || !selectedUser}
                  >
                    {saving ? (
                      <>
                        <CSpinner size="sm" className="me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CIcon icon={cilSave} className="me-2" />
                        Save Permissions
                      </>
                    )}
                  </CButton>
                </div>
              </CForm>
            ) : selectedUser && loading ? (
              <div className="text-center my-5">
                <CSpinner color="primary" />
                <p className="mt-2">Loading user permissions...</p>
              </div>
            ) : (
              <div className="text-center my-5 py-5 border rounded">
                <h4 className="text-muted">Select a user to manage permissions</h4>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserPermissions 