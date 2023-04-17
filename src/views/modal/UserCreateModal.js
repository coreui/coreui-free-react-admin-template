import React, { useState, useImperativeHandle } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CInputGroupText,
  CFormInput,
  CInputGroup,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilText } from '@coreui/icons'
import axios from 'axios'
import { BACKEND_HOST } from '../../constant'

const UserCreateModal = ({}, ref) => {
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
  }))

  const handleSubmit = () => {
    axios
      .post(`${BACKEND_HOST}/user/create`, {
        username,
        password,
        name,
      })
      .then((res) => {
        setSuccess(true)
      })
      .catch((err) => {
        console.log('Error', err)
        setError(true)
      })
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader closeButton>
        <CModalTitle>Create User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {error && <CAlert color="danger">{'Error'}</CAlert>}
        {success && <CAlert color="success">{'Done'}</CAlert>}
        <CForm>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              autoComplete="username"
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilText} />
            </CInputGroupText>
            <CFormInput
              type="name"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </CInputGroup>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Create
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default React.forwardRef(UserCreateModal)
