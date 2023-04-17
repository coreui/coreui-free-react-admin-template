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
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilText } from '@coreui/icons'
import axios from 'axios'
import { BACKEND_HOST } from '../../constant'
import * as PropTypes from 'prop-types'

function CFormGroup(props) {
  return null
}

CFormGroup.propTypes = { children: PropTypes.node }

function CLabel(props) {
  return null
}

CLabel.propTypes = { children: PropTypes.node }

function CInputFile(props) {
  return null
}

CInputFile.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
}
const UploadFileModal = ({}, ref) => {
  const [visible, setVisible] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
  }))

  const handleUpload = () => {
    setUploading(true)
    axios
      .post(
        `${BACKEND_HOST}/file/upload`,
        {
          file,
        },
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percentCompleted)
          },
        },
      )
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
        <CModalTitle>Upload file</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <CFormInput
            onChange={(event) => setFile(event.target.files[0])}
            type="file"
            id="formFile"
            label="Choose file"
          />
        </div>
        {uploading && (
          <CProgress value={progress} max="100" animated color="primary" className="mt-3 mb-0" />
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleUpload}>
          Create
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default React.forwardRef(UploadFileModal)
