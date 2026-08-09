import React from 'react'
import { Link } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'

const CheckEmail = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="mx-4 text-center">
              <CCardBody className="p-4">
                <h1>Check your email</h1>
                <p className="text-body-secondary">
                  Please click the link sent to <span className="fw-semibold">your@email.com</span>{' '}
                  to verify your account. Thank you!
                </p>
                <div className="d-grid">
                  <Link to="/">
                    <CButton color="primary" className="w-100">
                      Back to Home
                    </CButton>
                  </Link>
                </div>
                <p className="text-body-secondary mt-3 mb-0">
                  Didn&rsquo;t receive an email? <Link to="/authentication/login">Resend</Link>
                </p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default CheckEmail
