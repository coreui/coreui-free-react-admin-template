import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput
} from '@coreui/react'

const EditUserModal = ({ user, show, handleClose, handleSave }) => {
  const [editedUser, setEditedUser] = useState(user)

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedUser({ ...editedUser, [name]: value })
  }

  return (
    <CModal visible={show} onClose={handleClose}>
      <CModalHeader>
        <CModalTitle>Edit User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormLabel>Name</CFormLabel>
          <CFormInput
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
          />
          <CFormLabel>Email</CFormLabel>
          <CFormInput
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
          />
          <CFormLabel>Role</CFormLabel>
          <CFormInput
            type="text"
            name="role"
            value={editedUser.role}
            onChange={handleChange}
          />
          <CFormLabel>Country</CFormLabel>
          <CFormInput
            type="text"
            name="country"
            value={editedUser.country}
            onChange={handleChange}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>Cancel</CButton>
        <CButton color="primary" onClick={() => handleSave(editedUser)}>Save changes</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditUserModal
