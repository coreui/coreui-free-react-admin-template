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
import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ProtectedComponent from '../../features/auth/ProtectedComp'
const DepartmentsTable = () => {
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchDepartments()
  }, [page, pageSize, search])

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get('/api/departments', {
        params: {
          page: page - 1,
          pageSize,
          name: search || undefined,
        },
      })
      if (response.data) {
        setDepartments(response.data.data)
        setTotalPages(Math.ceil(response.data.count / pageSize))
      }
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }

  const showDeleteConfirmation = (department) => {
    setSelectedDepartment(department)
    setDeleteModalVisible(true)
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/departments/${selectedDepartment.id}`)
      setDeleteModalVisible(false)
      setSuccessMessage('Department deleted successfully')
      fetchDepartments()
      setTimeout(() => setSuccessMessage(''), 2000)
    } catch (error) {
      setErrorMessage('Error deleting department')
      console.error('Error deleting department:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const showEditModal = (department) => {
    setSelectedDepartment(department)
    setEditModalVisible(true)
  }

  const showAddModal = () => {
    setSelectedDepartment({ name: '' })
    setAddModalVisible(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.put(`/api/departments/${selectedDepartment.id}`, {
        name: selectedDepartment.name,
      })
      setEditModalVisible(false)
      setSuccessMessage('Department updated successfully')
      fetchDepartments()
      setTimeout(() => setSuccessMessage(''), 2000)
    } catch (error) {
      setErrorMessage('Error updating department')
      console.error('Error updating department:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/api/departments', {
        name: selectedDepartment.name,
      })
      setAddModalVisible(false)
      setSuccessMessage('Department added successfully')
      fetchDepartments()
      setTimeout(() => setSuccessMessage(''), 2000)
    } catch (error) {
      setErrorMessage('Error adding department')
      console.error('Error adding department:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSelectedDepartment((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <CContainer fluid className="d-flex flex-column mt-4 px-5" style={{ minHeight: '80vh' }}>
      {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
      {successMessage && <CAlert color="success">{successMessage}</CAlert>}

      <div className="bg-body-tertiary p-3 rounded-top shadow-sm">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <CFormInput
            type="text"
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow-1"
          />
          <ProtectedComponent actionName="Departments Management">
          <CButton color="primary" onClick={showAddModal} style={{width:"100px"}}>

            Add
          </CButton>
          </ProtectedComponent>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          border: '1px solid var(--cui-border-color)',
          borderTop: 'none',
          backgroundColor: 'var(--cui-body-bg)',
        }}
      >
        <CTable hover striped className="mb-0 ">
          <CTableHead
            style={{ backgroundColor: 'var(--cui-body-bg)' }}
            className="position-sticky top-0"
          >
            <CTableRow >
              <CTableHeaderCell style={{ width: '60px',  }}>№</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '80%' }}>Name</CTableHeaderCell>
              <ProtectedComponent actionName="Departments Management">
              <CTableHeaderCell style={{ width: '200px' }}>Operations</CTableHeaderCell>
              </ProtectedComponent>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {departments.map((department, index) => (
              <CTableRow key={department.id}>
                <CTableDataCell style={{ width: '60px' }}>{(page - 1) * pageSize + index + 1}</CTableDataCell>
                <CTableDataCell style={{ width: '80%' }}>{department.name}</CTableDataCell>
                <ProtectedComponent actionName="Departments Management">
                <CTableDataCell style={{ width: '200px' }}>
                  <CButton color="info" size="sm" onClick={() => showEditModal(department)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => showDeleteConfirmation(department)}
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

      {/* Add Department Modal */}
      <CModal visible={addModalVisible} onClose={() => setAddModalVisible(false)}>
        <CModalHeader onClose={() => setAddModalVisible(false)}>
          <CModalTitle>Add New Department</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddSubmit}>
            <div className="mb-3">
              <CFormInput
                label="Department Name"
                name="name"
                value={selectedDepartment?.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <CButton type="submit" color="primary">
                Create Department
              </CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Edit Department Modal */}
      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader onClose={() => setEditModalVisible(false)}>
          <CModalTitle>Edit Department</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <CFormInput
                label="Department Name"
                name="name"
                value={selectedDepartment?.name || ''}
                onChange={handleInputChange}
                required
              />
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
        <CModalBody>Are you sure you want to delete {selectedDepartment?.name}?</CModalBody>
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

export default DepartmentsTable