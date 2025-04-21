import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/api/axiosConfig'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CFormSelect,
  CButton,
  CContainer,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CAlert,
} from '@coreui/react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons' // Added cilPlus for the Add button
import CIcon from '@coreui/icons-react'
import ProtectedComponent from '../../features/auth/ProtectedComp'
const UsersTable = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [departments, setDepartments] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false) // State for Add User modal
  const [selectedUser, setSelectedUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [roles, setRoles] = useState([])

  useEffect(() => {
    fetchUsers()
    fetchDepartments()
    fetchRoles()
  }, [page, pageSize, search, roleFilter])

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/api/users', {
        params: {
          page: page - 1,
          pageSize,
          name: search || undefined,
          roleId: roleFilter || undefined,
        },
      })
      setUsers(response.data.data)
      setTotalPages(Math.ceil(response.data.count / pageSize))
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get('/api/departments', {
        params: { page: 0, pageSize: 100 },
      })
      setDepartments(response.data.data)
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }
  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get('/api/roles', {
        params: { page: 0, pageSize: 100 },
      })
      setRoles(response.data.data)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const getDepartmentName = (departmentId) => {
    const department = departments.find((dept) => dept.id === departmentId)
    return department ? department.name : 'N/A'
  }
  const showDeleteConfirmation = (user) => {
    setSelectedUser(user)
    setDeleteModalVisible(true)
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/users/${selectedUser.id}`)
      setDeleteModalVisible(false)
      setSuccessMessage('User deleted successfully')
      fetchUsers()
      setTimeout(() => setSuccessMessage(''), 2000)
    } catch (error) {
      setErrorMessage('Error deleting user')
      console.error('Error deleting user:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const showEditModal = (user) => {
    setSelectedUser({ ...user, departmentId: user.departmentId || '' })
    setEditModalVisible(true)
  }

  const showAddModal = () => {
    setSelectedUser({
      firstName: '',
      lastName: '',
      login: '',
      role: { id: '', name: '' },
      departmentId: '',
    })
    setAddModalVisible(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.put(`/api/users/${selectedUser.id}`, {
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        login: selectedUser.login,
        roleId: selectedUser.role.id,
        departmentId: selectedUser.departmentId,
      })
      setEditModalVisible(false)
      setSuccessMessage('User updated successfully')
      fetchUsers()
      setTimeout(() => setSuccessMessage(''), 2000)
    } catch (error) {
      setErrorMessage('Error updating user')
      console.error('Error updating user:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/api/users', {
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.login,
        password: selectedUser.password,
        roleId: parseInt(selectedUser.role.id, 10),
        departmentId: parseInt(selectedUser.departmentId, 10),
      })
      setAddModalVisible(false)
      setSuccessMessage('User added successfully')
      fetchUsers()
      setTimeout(() => setSuccessMessage(''), 2000)
    } catch (error) {
      setErrorMessage('Error adding user')
      console.error('Error adding user:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <CContainer fluid className="d-flex flex-column mt-4 px-5" style={{ minHeight: '80vh', }}>
      {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
      {successMessage && <CAlert color="success">{successMessage}</CAlert>}

      <div className="bg-body-tertiary p-3 rounded-top shadow-sm">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex gap-3 flex-grow-1">
            <CFormInput
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow-1"
            />
            <CFormSelect
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </CFormSelect>
          </div>
          <ProtectedComponent actionName="Users Management">
          <CButton color="primary" onClick={showAddModal}>
            {/* <CIcon icon={cilPlus} className="me-2" /> */}
            Add User
          </CButton>
          </ProtectedComponent>
        </div>
      </div>

      {/* Table Container */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          border: '1px solid var(--cui-border-color)',
          borderTop: 'none',
          backgroundColor: 'var(--cui-body-bg)',
        }}
      >
        <CTable hover striped className="mb-0">
          <CTableHead
            style={{ backgroundColor: 'var(--cui-body-bg)' }}
            className="position-sticky top-0"
          >
            <CTableRow>
              <CTableHeaderCell>Nº</CTableHeaderCell>
              <CTableHeaderCell>Full Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Role</CTableHeaderCell>
              <CTableHeaderCell>Department</CTableHeaderCell>
              <ProtectedComponent actionName="Users Management">
              <CTableHeaderCell>Actions</CTableHeaderCell>
              </ProtectedComponent>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user, index) => (
              <CTableRow key={user.id}>
                <CTableDataCell>{(page - 1) * pageSize + index + 1}</CTableDataCell>
                <CTableDataCell>
                  {user.firstName} {user.lastName}
                </CTableDataCell>
                <CTableDataCell>{user.login}</CTableDataCell>
                <CTableDataCell>{user.role.name}</CTableDataCell>
                <CTableDataCell>{getDepartmentName(user.departmentId)}</CTableDataCell>
                <ProtectedComponent actionName="Users Management">
                <CTableDataCell>
                  <CButton color="info" size="sm" onClick={() => showEditModal(user)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => showDeleteConfirmation(user)}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
                </ProtectedComponent>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      <div className="bg-body-tertiary p-3 rounded-bottom shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <CFormSelect
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="w-auto"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </CFormSelect>
          <CPagination>
            <CPaginationItem disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </CPaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <CPaginationItem key={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)}>
                {i + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              Next
            </CPaginationItem>
          </CPagination>
        </div>
      </div>

      <CModal visible={addModalVisible} onClose={() => setAddModalVisible(false)}>
        <CModalHeader onClose={() => setAddModalVisible(false)}>
          <CModalTitle>Add New User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddSubmit}>
            <div className="mb-3">
              <CFormInput
                label="First Name"
                name="firstName"
                value={selectedUser?.firstName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                label="Last Name"
                name="lastName"
                value={selectedUser?.lastName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                label="Email"
                type="email"
                name="login"
                value={selectedUser?.login || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                label="Password"
                type="text"
                name="password"
                value={selectedUser?.password || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormSelect
                label="Role"
                value={selectedUser?.role?.id || ''}
                onChange={(e) =>
                  setSelectedUser((prev) => ({
                    ...prev,
                    role: {
                      id: e.target.value,
                      name: e.target.options[e.target.selectedIndex].text,
                    },
                  }))
                }
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormSelect
                label="Department"
                name="departmentId"
                value={selectedUser?.departmentId || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="d-grid gap-2">
              <CButton type="submit" color="primary">
                Create User
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader onClose={() => setEditModalVisible(false)}>
          <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <CFormInput
                label="First Name"
                name="firstName"
                value={selectedUser?.firstName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                label="Last Name"
                name="lastName"
                value={selectedUser?.lastName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                label="Email"
                type="email"
                name="login"
                value={selectedUser?.login || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <CFormSelect
                label="Role"
                value={selectedUser?.role?.id || ''}
                onChange={(e) =>
                  setSelectedUser((prev) => ({
                    ...prev,
                    role: {
                      id: e.target.value,
                      name: e.target.options[e.target.selectedIndex].text,
                    },
                  }))
                }
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormSelect
                label="Department"
                name="departmentId"
                value={selectedUser?.departmentId || ''}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="d-grid gap-2">
              <CButton type="submit" color="primary">
                Save Changes
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
        <CModalHeader onClose={() => setDeleteModalVisible(false)}>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete {selectedUser?.firstName} {selectedUser?.lastName}?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default UsersTable
