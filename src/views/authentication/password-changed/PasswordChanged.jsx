import React from 'react'
import { Link } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'

const PasswordChanged = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="mx-4 text-center">
              <CCardBody className="p-4">
                <h1>Your password has been changed</h1>
                <p className="text-body-secondary">
                  Your password has been successfully changed. You can now log in with your new
                  password.
                </p>
                <div className="d-grid">
                  <Link to="/authentication/login">
                    <CButton color="primary" className="w-100">
                      Back to Login
                    </CButton>
                  </Link>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default PasswordChanged
