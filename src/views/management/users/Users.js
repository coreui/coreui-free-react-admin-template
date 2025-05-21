import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CInputGroup,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButtonGroup,
  CBadge,
  CSpinner
} from '@coreui/react'
import { cilPeople, cilSearch, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'

const Users = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock data - would be fetched from API in real application
  const users = [
    {
      id: 1,
      username: 'admin',
      name: 'Administrator',
      email: 'admin@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-05-20 14:30:45'
    },
    {
      id: 2,
      username: 'editor',
      name: 'Content Editor',
      email: 'editor@example.com',
      role: 'Editor',
      status: 'Active',
      lastLogin: '2023-05-19 09:15:22'
    },
    {
      id: 3,
      username: 'moderator',
      name: 'Content Moderator',
      email: 'moderator@example.com',
      role: 'Moderator',
      status: 'Inactive',
      lastLogin: '2023-04-15 16:42:10'
    },
    {
      id: 4,
      username: 'user1',
      name: 'Regular User',
      email: 'user1@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2023-05-18 11:20:33'
    },
  ]

  const getBadgeColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Suspended':
        return 'danger'
      case 'Pending':
        return 'warning'
      default:
        return 'primary'
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Users</strong>
                <small className="ms-1">Manage system users</small>
              </div>
              <div>
                <Link to="/users/new">
                  <CButton color="primary">
                    <CIcon icon={cilPlus} className="me-2" />
                    Add New User
                  </CButton>
                </Link>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-between mb-3">
              <div className="d-flex gap-2">
                <CInputGroup className="w-auto">
                  <CFormInput
                    placeholder="Search users..."
                    aria-label="Search users"
                  />
                  <CButton type="button" color="primary" variant="outline">
                    <CIcon icon={cilSearch} />
                  </CButton>
                </CInputGroup>
                
                <CDropdown>
                  <CDropdownToggle color="primary" variant="outline">Filter</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>All Users</CDropdownItem>
                    <CDropdownItem>Active Users</CDropdownItem>
                    <CDropdownItem>Inactive Users</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              
              <div>
                <CButtonGroup role="group">
                  <CButton color="primary" variant="outline">Export</CButton>
                  <CButton color="primary" variant="outline">Import</CButton>
                </CButtonGroup>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center my-5">
                <CSpinner color="primary" />
                <p className="mt-2">Loading users...</p>
              </div>
            ) : (
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Last Login</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>{user.role}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={getBadgeColor(user.status)}>
                          {user.status}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{user.lastLogin}</CTableDataCell>
                      <CTableDataCell>
                        <CButtonGroup>
                          <Link to={`/users/${user.id}`}>
                            <CButton color="primary" size="sm" variant="outline">
                              View
                            </CButton>
                          </Link>
                          <Link to={`/users/${user.id}/edit`}>
                            <CButton color="warning" size="sm" variant="outline">
                              Edit
                            </CButton>
                          </Link>
                          <CButton color="danger" size="sm" variant="outline">
                            Delete
                          </CButton>
                        </CButtonGroup>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users 