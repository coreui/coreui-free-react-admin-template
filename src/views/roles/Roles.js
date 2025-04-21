import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/api/axiosConfig'
import ProtectedComponent from '../../features/auth/ProtectedComp'
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
  CFormCheck,
  CBadge,
} from '@coreui/react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { checkUserPermission } from '../../features/access/permission'
import { useSelector } from 'react-redux';
const RolesTable = () => {
  const [roles, setRoles] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [actions, setActions] = useState([])
  const currentUser = useSelector((state) => state.auth.user)

  useEffect(() => {
    fetchRoles()
    if (checkUserPermission(currentUser, '/roles', 'Actions')) {
      fetchActions()
    }
  }, [page, pageSize, search])

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get('/api/roles', {
        params: {
          page: page - 1,
          pageSize,
          name: search || undefined,
        },
      })
      if (response.data) {
        setRoles(response.data.data)
      }

      setTotalPages(Math.ceil(response.data.count / pageSize))
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const fetchActions = async () => {
    try {
      const response = await axiosInstance.get('/api/actions')
      setActions(response.data.data || [])
    } catch (error) {
      console.error('Error fetching actions:', error)
    }
  }

  const showDeleteConfirmation = (role) => {
    setSelectedRole(role)
    setDeleteModalVisible(true)
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/roles/${selectedRole.id}`)
      setDeleteModalVisible(false)
      setSuccessMessage('Role deleted successfully')
      fetchRoles()
      setTimeout(() => setSuccessMessage(''), 2000)
    } catch (error) {
      setErrorMessage('Error deleting role')
      console.error('Error deleting role:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const showEditModal = (role) => {
    setSelectedRole({
      ...role,
      actionIds: role.actions.map((action) => action.id),
    })
    setEditModalVisible(true)
  }

  const showAddModal = () => {
    setSelectedRole({
      name: '',
      actionIds: [],
    })
    setAddModalVisible(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.put(`/api/roles/${selectedRole.id}`, {
        name: selectedRole.name,
        actionIds: selectedRole.actionIds,
      })
      setEditModalVisible(false)
      setSuccessMessage('Role updated successfully')
      fetchRoles()
      setTimeout(() => setSuccessMessage(''), 2000)
    } catch (error) {
      setErrorMessage('Error updating role')
      console.error('Error updating role:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/api/roles', {
        name: selectedRole.name,
        actionIds: selectedRole.actionIds,
      })
      setAddModalVisible(false)
      setSuccessMessage('Role added successfully')
      fetchRoles()
      setTimeout(() => setSuccessMessage(''), 2000)
    } catch (error) {
      setErrorMessage('Error adding role')
      console.error('Error adding role:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSelectedRole((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleActionChange = (actionId) => {
    setSelectedRole((prev) => {
      const actionIds = prev.actionIds.includes(actionId)
        ? prev.actionIds.filter((id) => id !== actionId)
        : [...prev.actionIds, actionId]
      return { ...prev, actionIds }
    })
  }

  return (
    <CContainer fluid className="d-flex flex-column mt-4 px-5" style={{ minHeight: '80vh' }}>
      {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
      {successMessage && <CAlert color="success">{successMessage}</CAlert>}

      <div className="bg-body-tertiary p-3 rounded-top shadow-sm">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <CFormInput
            type="text"
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow-1"
          />
          <ProtectedComponent actionName="Role Management">
            <CButton color="primary" onClick={showAddModal} style={{ width: '100px' }}>
              {/* <CIcon icon={cilPlus} className="me-2" /> */}
              Add
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
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
              <ProtectedComponent actionName="Role Management">
                <CTableHeaderCell>Operations</CTableHeaderCell>
              </ProtectedComponent>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {roles
              ? roles.map((role, index) => (
                  <CTableRow key={role.id}>
                    <CTableDataCell>{(page - 1) * pageSize + index + 1}</CTableDataCell>
                    <CTableDataCell>{role.name}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-1 flex-wrap">
                        {role.actions.map((action) => (
                          <CBadge
                            key={action.id}
                            color="info"
                            shape="rounded-pill"
                            className="me-1 mb-1"
                          >
                            {action.name}
                          </CBadge>
                        ))}
                      </div>
                    </CTableDataCell>
                    <ProtectedComponent actionName="Role Management">
                      <CTableDataCell>
                        <CButton color="info" size="sm" onClick={() => showEditModal(role)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => showDeleteConfirmation(role)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </ProtectedComponent>
                  </CTableRow>
                ))
              : null}
          </CTableBody>
        </CTable>
      </div>

      {/* Pagination Section */}
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

      {/* Add Role Modal */}
      <CModal visible={addModalVisible} onClose={() => setAddModalVisible(false)}>
        <CModalHeader onClose={() => setAddModalVisible(false)}>
          <CModalTitle>Add New Role</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddSubmit}>
            <div className="mb-3">
              <CFormInput
                label="Role Name"
                name="name"
                value={selectedRole?.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Actions</label>
              {actions.map((action) => (
                <CFormCheck
                  key={action.id}
                  label={action.name}
                  checked={selectedRole?.actionIds?.includes(action.id)}
                  onChange={() => handleActionChange(action.id)}
                />
              ))}
            </div>
            <div className="d-grid gap-2">
              <CButton type="submit" color="primary">
                Create Role
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Edit Role Modal */}
      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader onClose={() => setEditModalVisible(false)}>
          <CModalTitle>Edit Role</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <CFormInput
                label="Role Name"
                name="name"
                value={selectedRole?.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Actions</label>
              {actions.map((action) => (
                <CFormCheck
                  key={action.id}
                  label={action.name}
                  checked={selectedRole?.actionIds?.includes(action.id)}
                  onChange={() => handleActionChange(action.id)}
                />
              ))}
            </div>
            <div className="d-grid gap-2">
              <CButton type="submit" color="primary">
                Save Changes
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Delete Confirmation Modal */}
      <CModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
        <CModalHeader onClose={() => setDeleteModalVisible(false)}>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete {selectedRole?.name}?</CModalBody>
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

export default RolesTable
