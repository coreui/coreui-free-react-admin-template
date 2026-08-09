import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'

const ChangePassword = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Reset password</h1>
                  <p className="text-body-secondary">Enter your new password and confirm it.</p>
                  <div className="mb-3">
                    <CFormLabel htmlFor="new-password">New password</CFormLabel>
                    <CFormInput
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="mb-4">
                    <CFormLabel htmlFor="confirm-password">Confirm new password</CFormLabel>
                    <CFormInput
                      id="confirm-password"
                      type="password"
                      placeholder="Re-enter new password"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="d-grid">
                    <CButton color="primary" type="submit">
                      Set new password
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ChangePassword
