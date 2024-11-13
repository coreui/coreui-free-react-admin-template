import React, { useState, useEffect } from 'react'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilUser } from '@coreui/icons'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    country: '',
  })
  const [visible, setVisible] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)  // מצב עריכה
  const [currentUserId, setCurrentUserId] = useState(null)  // מזהה המשתמש הנוכחי לעריכה

  useEffect(() => {
    // קריאת כל המשתמשים מה-backend
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/users')
      const data = await response.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isEditMode) {
      // עריכת משתמש קיים
      const response = await fetch(`http://localhost:3001/users/${currentUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const updatedUser = await response.json()

      // עדכון המשתמש ברשימת המשתמשים
      setUsers(users.map(user => (user.id === currentUserId ? updatedUser : user)))
    } else {
      // יצירת משתמש חדש
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const newUser = await response.json()

      // הוספת המשתמש החדש לרשימה
      setUsers([...users, newUser])
    }

    // סגירת המודל ואיפוס הטופס
    setVisible(false)
    setIsEditMode(false)
    setCurrentUserId(null)
    setFormData({
      name: '',
      email: '',
      role: '',
      country: '',
    })
  }

  const handleEditClick = (user) => {
    // הגדרת מצב עריכה
    setIsEditMode(true)
    setCurrentUserId(user.id)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country,
    })
    setVisible(true)
  }

  const handleDelete = async (id) => {
    // מחיקת משתמש מהשרת
    await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    })

    // עדכון רשימת המשתמשים לאחר המחיקה
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User Management</strong>
            <CButton color="primary" className="float-end" onClick={() => {
              setVisible(true)
              setIsEditMode(false)
              setFormData({
                name: '',
                email: '',
                role: '',
                country: '',
              })
            }}>
              Create User
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilUser} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="avatar_placeholder.png" status="success" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{user.name}</div>
                      <div className="small text-body-secondary">
                        <span>{user.email}</span>
                        <br />
                        Registered: {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{user.country}</CTableDataCell>
                    <CTableDataCell>{user.role}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton color="warning" size="sm" className="me-2" onClick={() => handleEditClick(user)}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(user.id)}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>{isEditMode ? 'Edit User' : 'Create New User'}</CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="name">Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="role">Role</CFormLabel>
                <CFormInput
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter role"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="country">Country</CFormLabel>
                <CFormInput
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  required
                />
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancel
            </CButton>
            <CButton color="primary" type="submit">
              {isEditMode ? 'Save Changes' : 'Create User'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CRow>
  )
}

export default UserManagement
