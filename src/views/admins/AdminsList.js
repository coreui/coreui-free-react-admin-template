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
import { Link, useNavigate } from 'react-router-dom'

// Default avatar placeholder
const defaultAvatar = 'https://via.placeholder.com/40'

// Mock data for admins
const mockAdmins = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@example.com',
    phone: '+1234567890',
    role: 'super_admin',
    isActive: true,
    avatar: null,
    lastLogin: '2023-09-15T10:30:00Z',
    createdAt: '2023-01-10T08:00:00Z',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+0987654321',
    role: 'admin',
    isActive: true,
    avatar: null,
    lastLogin: '2023-09-14T14:20:00Z',
    createdAt: '2023-02-15T09:30:00Z',
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.j@example.com',
    phone: '+1122334455',
    role: 'editor',
    isActive: false,
    avatar: null, 
    lastLogin: '2023-08-30T11:45:00Z',
    createdAt: '2023-03-20T10:15:00Z',
  },
]

const AdminsList = () => {
  const navigate = useNavigate()
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Load mock data on component mount
  useEffect(() => {
    const fetchAdmins = () => {
      setLoading(true)
      
      // Filter mock data based on filters
      let filtered = [...mockAdmins]
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(admin => 
          `${admin.firstName} ${admin.lastName}`.toLowerCase().includes(term) ||
          admin.email.toLowerCase().includes(term) ||
          (admin.phone && admin.phone.includes(term))
        )
      }
      
      if (filterRole) {
        filtered = filtered.filter(admin => admin.role === filterRole)
      }
      
      if (filterStatus) {
        const isActive = filterStatus === 'active'
        filtered = filtered.filter(admin => admin.isActive === isActive)
      }
      
      setAdmins(filtered)
      setTotalPages(Math.max(1, Math.ceil(filtered.length / 10)))
      setLoading(false)
    }

    fetchAdmins()
  }, [searchTerm, filterRole, filterStatus])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      // For mock data, just filter out the deleted admin
      setAdmins(admins.filter(admin => admin.id !== id))
    }
  }

  const getRoleBadge = (role) => {
    const roleMap = {
      'super_admin': { color: 'danger', label: 'Super Admin' },
      'admin': { color: 'warning', label: 'Admin' },
      'editor': { color: 'info', label: 'Editor' },
      'viewer': { color: 'success', label: 'Viewer' },
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

  // Get paginated admins
  const paginatedAdmins = admins.slice((page - 1) * 10, page * 10)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Admins</strong>
            <CButton 
              color="primary" 
              className="float-end"
              onClick={() => navigate('/admins/create')}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Add Admin
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
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
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

            {/* Admins Table */}
            {loading ? (
              <div className="text-center my-5">Loading admins...</div>
            ) : (
              <>
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Admin</CTableHeaderCell>
                      <CTableHeaderCell>Email</CTableHeaderCell>
                      <CTableHeaderCell>Phone</CTableHeaderCell>
                      <CTableHeaderCell>Role</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Last Login</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {paginatedAdmins.length > 0 ? (
                      paginatedAdmins.map(admin => (
                        <CTableRow key={admin.id}>
                          <CTableDataCell>
                            <div className="d-flex align-items-center">
                              <CAvatar size="md" src={admin.avatar || defaultAvatar} className="me-3" />
                              <div>
                                <div className="fw-bold">{admin.firstName} {admin.lastName}</div>
                                <small className="text-muted">ID: {admin.id}</small>
                              </div>
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>{admin.email}</CTableDataCell>
                          <CTableDataCell>{admin.phone || 'N/A'}</CTableDataCell>
                          <CTableDataCell>
                            {getRoleBadge(admin.role)}
                          </CTableDataCell>
                          <CTableDataCell>
                            {getStatusBadge(admin.isActive)}
                          </CTableDataCell>
                          <CTableDataCell>
                            {admin.lastLogin && new Date(admin.lastLogin).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CDropdown alignment="end">
                              <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                              </CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem 
                                  href={`/admins/${admin.id}`}
                                  component={Link}
                                >
                                  View Details
                                </CDropdownItem>
                                <CDropdownItem 
                                  href={`/admins/edit/${admin.id}`}
                                  component={Link}
                                >
                                  <CIcon icon={cilPencil} className="me-2" />
                                  Edit
                                </CDropdownItem>
                                <CDropdownItem 
                                  onClick={() => handleDelete(admin.id)}
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
                          No admins found
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

export default AdminsList 