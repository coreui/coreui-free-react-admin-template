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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
  CFormInput,
  CForm,
  CFormSelect,
  CPagination,
  CPaginationItem,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilPencil, cilTrash, cilPlus, cilSearch } from '@coreui/icons'
import { userApi } from 'src/services/api'
import { Link, useNavigate } from 'react-router-dom'

// Default avatar placeholder
const defaultAvatar = 'https://via.placeholder.com/40'

const UsersList = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Fetch users on component mount and when filters change
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const filters = {}
        if (searchTerm) filters.search = searchTerm
        if (filterRole) filters.role = filterRole
        if (filterStatus) filters.status = filterStatus

        const response = await userApi.getUsers(page, 10, filters)
        setUsers(response.data)
        setTotalPages(response.totalPages || 1)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [page, searchTerm, filterRole, filterStatus])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userApi.deleteUser(id)
        // Refresh users after deletion
        setUsers(users.filter(user => user.id !== id))
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
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

  const getStatusBadge = (isActive) => {
    return isActive ? 
      <CBadge color="success">Active</CBadge> : 
      <CBadge color="secondary">Inactive</CBadge>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Users</strong>
            <CButton 
              color="primary" 
              className="float-end"
              onClick={() => navigate('/users/create')}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Add User
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* Search and Filters */}
            <CForm onSubmit={handleSearch} className="mb-4">
              <CRow>
                <CCol md={5}>
                  <CFormInput
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormSelect 
                    value={filterRole}
                    onChange={(e) => {
                      setFilterRole(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="organizer">Organizer</option>
                    <option value="user">User</option>
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CButton type="submit" color="primary" className="w-100">
                    <CIcon icon={cilSearch} className="me-2" />
                    Search
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Users Table */}
            {loading ? (
              <div className="text-center my-5">Loading users...</div>
            ) : (
              <>
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>User</CTableHeaderCell>
                      <CTableHeaderCell>Email</CTableHeaderCell>
                      <CTableHeaderCell>Phone</CTableHeaderCell>
                      <CTableHeaderCell>Role</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Registered</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {users.length > 0 ? (
                      users.map(user => (
                        <CTableRow key={user.id}>
                          <CTableDataCell>
                            <div className="d-flex align-items-center">
                              <CAvatar size="md" src={user.avatar || defaultAvatar} className="me-3" />
                              <div>
                                <div className="fw-bold">{user.firstName} {user.lastName}</div>
                                <small className="text-muted">ID: {user.id}</small>
                              </div>
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>{user.email}</CTableDataCell>
                          <CTableDataCell>{user.phone || 'N/A'}</CTableDataCell>
                          <CTableDataCell>
                            {getRoleBadge(user.role)}
                          </CTableDataCell>
                          <CTableDataCell>
                            {getStatusBadge(user.isActive)}
                          </CTableDataCell>
                          <CTableDataCell>
                            {user.registeredDate && new Date(user.registeredDate).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CDropdown alignment="end">
                              <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                              </CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem 
                                  href={`/users/${user.id}`}
                                  component={Link}
                                >
                                  View Profile
                                </CDropdownItem>
                                <CDropdownItem 
                                  href={`/users/edit/${user.id}`}
                                  component={Link}
                                >
                                  <CIcon icon={cilPencil} className="me-2" />
                                  Edit
                                </CDropdownItem>
                                <CDropdownItem 
                                  href={`/users/permissions/${user.id}`}
                                  component={Link}
                                >
                                  Manage Permissions
                                </CDropdownItem>
                                <CDropdownItem 
                                  onClick={() => handleDelete(user.id)}
                                  style={{ color: 'red' }}
                                >
                                  <CIcon icon={cilTrash} className="me-2" />
                                  Delete
                                </CDropdownItem>
                              </CDropdownMenu>
                            </CDropdown>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center py-5">
                          No users found
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>

                {/* Pagination */}
                {totalPages > 1 && (
                  <CPagination align="center" className="mt-4">
                    <CPaginationItem 
                      disabled={page === 1} 
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </CPaginationItem>
                    
                    {[...Array(totalPages).keys()].map(number => (
                      <CPaginationItem
                        key={number + 1}
                        active={page === number + 1}
                        onClick={() => setPage(number + 1)}
                      >
                        {number + 1}
                      </CPaginationItem>
                    ))}
                    
                    <CPaginationItem 
                      disabled={page === totalPages} 
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </CPaginationItem>
                  </CPagination>
                )}
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UsersList 