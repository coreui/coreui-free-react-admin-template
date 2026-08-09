import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { apple } from 'src/assets/brand/apple'
import { google } from 'src/assets/brand/google'
import { logo } from 'src/assets/brand/logo'
import { eye } from 'src/assets/icons/eye'

const Register = () => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/authentication/check-email')
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <div className="d-flex flex-column gap-4 text-center">
              <div>
                <CIcon icon={logo} height={48} />
              </div>
              <CCard className="p-4">
                <CCardBody className="d-flex flex-column gap-4">
                  <h2 className="h5 text-center mb-0">Create new account</h2>
                  <CForm className="row gy-3 text-start" onSubmit={handleSubmit}>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="name">Name</CFormLabel>
                      <CFormInput id="name" placeholder="Your name" autoComplete="name" />
                    </CCol>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="email">Email address</CFormLabel>
                      <CFormInput
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="password">Password</CFormLabel>
                      <CInputGroup>
                        <CFormInput
                          id="password"
                          type="password"
                          placeholder="Your password"
                          autoComplete="new-password"
                        />
                        <CInputGroupText>
                          <CTooltip content="Show password">
                            <CButton
                              type="button"
                              color="link"
                              className="p-0 link-secondary"
                              aria-label="Show password"
                            >
                              <CIcon icon={eye} size="sm" />
                            </CButton>
                          </CTooltip>
                        </CInputGroupText>
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      <CFormCheck
                        id="acceptTerms"
                        label={
                          <>
                            I accept the <a href="#">terms and conditions</a>
                          </>
                        }
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" className="w-100">
                        Create new account
                      </CButton>
                    </CCol>
                  </CForm>
                  <div className="position-relative">
                    <hr />
                    <div className="position-absolute top-50 start-50 translate-middle bg-body px-2 text-body-tertiary text-uppercase small">
                      or
                    </div>
                  </div>
                  <CRow>
                    <CCol>
                      <CButton type="button" variant="outline" className="w-100">
                        <CIcon icon={google} className="me-1" />
                        Login with Google
                      </CButton>
                    </CCol>
                    <CCol>
                      <CButton type="button" variant="outline" className="w-100">
                        <CIcon icon={apple} className="me-1" />
                        Login with Apple
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <div className="text-body-secondary">
                Already have an account? <Link to="/authentication/login">Sign in</Link>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
