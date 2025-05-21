import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CButton,
  CButtonGroup,
  CListGroup,
  CListGroupItem,
  CBadge,
  CSpinner,
  CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilPencil, cilLockLocked, cilTrash } from '@coreui/icons'

const UserDetail = () => {
  const { id } = useParams()
  const [activeKey, setActiveKey] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  
  // Mock data - would be fetched from API in real application
  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: parseInt(id),
        username: 'admin',
        name: 'Administrator',
        email: 'admin@example.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2023-05-20 14:30:45',
        created: '2023-01-15 08:00:00',
        phone: '+1 (555) 123-4567',
        groups: ['Administrators', 'Content Managers'],
        permissions: [
          'users.view', 'users.create', 'users.edit', 'users.delete',
          'content.view', 'content.create', 'content.edit', 'content.delete',
          'settings.view', 'settings.edit'
        ],
        recentActivity: [
          { date: '2023-05-20 14:30:45', action: 'Logged in', ip: '192.168.1.1' },
          { date: '2023-05-19 16:45:22', action: 'Updated user settings', ip: '192.168.1.1' },
          { date: '2023-05-18 09:12:51', action: 'Created new article', ip: '192.168.1.1' },
          { date: '2023-05-17 11:30:08', action: 'Logged out', ip: '192.168.1.1' },
        ]
      }
      setUser(userData)
      setIsLoading(false)
    }, 800)
  }, [id])

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

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <CSpinner color="primary" />
        <p className="mt-2">Loading user details...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <CCard className="mb-4">
        <CCardBody>
          <div className="text-center my-5">
            <h4>User not found</h4>
            <p>The requested user does not exist or you don't have permission to view it.</p>
            <Link to="/users">
              <CButton color="primary">
                <CIcon icon={cilArrowLeft} className="me-2" />
                Back to Users
              </CButton>
            </Link>
          </div>
        </CCardBody>
      </CCard>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>User Details</strong>
                <small className="ms-1">Viewing user information</small>
              </div>
              <div>
                <CButtonGroup>
                  <Link to="/users">
                    <CButton color="primary" variant="outline">
                      <CIcon icon={cilArrowLeft} className="me-2" />
                      Back
                    </CButton>
                  </Link>
                  <Link to={`/users/${id}/edit`}>
                    <CButton color="warning">
                      <CIcon icon={cilPencil} className="me-2" />
                      Edit
                    </CButton>
                  </Link>
                  <CButton color="danger">
                    <CIcon icon={cilTrash} className="me-2" />
                    Delete
                  </CButton>
                </CButtonGroup>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                  role="tab"
                >
                  Profile
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                  role="tab"
                >
                  Groups & Permissions
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                  role="tab"
                >
                  Activity Log
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent className="pt-3">
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <div className="mb-4">
                  <h4>{user.name}</h4>
                  <CBadge color={getBadgeColor(user.status)} className="me-2">{user.status}</CBadge>
                  <CBadge color="info">{user.role}</CBadge>
                </div>
                
                <CRow>
                  <CCol md={6}>
                    <CListGroup flush>
                      <CListGroupItem>
                        <div className="text-medium-emphasis">Username</div>
                        <div className="fw-bold">{user.username}</div>
                      </CListGroupItem>
                      <CListGroupItem>
                        <div className="text-medium-emphasis">Email</div>
                        <div className="fw-bold">{user.email}</div>
                      </CListGroupItem>
                      <CListGroupItem>
                        <div className="text-medium-emphasis">Phone</div>
                        <div className="fw-bold">{user.phone}</div>
                      </CListGroupItem>
                    </CListGroup>
                  </CCol>
                  <CCol md={6}>
                    <CListGroup flush>
                      <CListGroupItem>
                        <div className="text-medium-emphasis">Last Login</div>
                        <div className="fw-bold">{user.lastLogin}</div>
                      </CListGroupItem>
                      <CListGroupItem>
                        <div className="text-medium-emphasis">Account Created</div>
                        <div className="fw-bold">{user.created}</div>
                      </CListGroupItem>
                      <CListGroupItem>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text-medium-emphasis">Security</div>
                          <CButton size="sm" color="primary" variant="ghost">
                            <CIcon icon={cilLockLocked} className="me-2" />
                            Change Password
                          </CButton>
                        </div>
                      </CListGroupItem>
                    </CListGroup>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                <CRow>
                  <CCol md={6}>
                    <h5 className="mb-3">User Groups</h5>
                    <CListGroup>
                      {user.groups.map((group, index) => (
                        <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                          {group}
                          <CBadge color="primary" shape="rounded-pill">Member</CBadge>
                        </CListGroupItem>
                      ))}
                    </CListGroup>
                    <div className="mt-3">
                      <CButton color="primary" size="sm">Add to Group</CButton>
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <h5 className="mb-3">Permissions</h5>
                    <div className="border rounded p-3 bg-light">
                      {user.permissions.map((permission, index) => (
                        <CBadge key={index} color="info" className="me-2 mb-2">{permission}</CBadge>
                      ))}
                    </div>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane role="tabpanel" visible={activeKey === 3}>
                <h5 className="mb-3">Recent Activity</h5>
                <CListGroup>
                  {user.recentActivity.map((activity, index) => (
                    <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold">{activity.action}</div>
                        <div className="small text-medium-emphasis">IP: {activity.ip}</div>
                      </div>
                      <CBadge color="secondary" shape="rounded-pill">{activity.date}</CBadge>
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </CTabPane>
            </CTabContent>
          </CCardBody>
          <CCardFooter>
            <small className="text-medium-emphasis">
              Last updated: {new Date().toLocaleString()}
            </small>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserDetail 