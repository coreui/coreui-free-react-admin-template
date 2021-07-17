import React from 'react'
import FacebookLogin from 'react-facebook-login'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="align-items-center">
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                      <CFormControl placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="link" className="px-0">
                          Create a new account?
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="d-flex justify-content-end">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="mt-3">
                      <CCol className="d-flex justify-content-center">
                        <CButton color="dark" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center">
                      <div
                        className="w-75 text-center mt-3 pt-3"
                        style={{ borderTop: '1px solid gray' }}
                      >
                        or login with...
                      </div>
                    </CRow>
                    <CRow className="justify-content-center">
                      <div style={{ width: '5rem' }}>
                        <FacebookLogin
                          appId="571174603253755"
                          autoLoad={false}
                          isMobile={false}
                          // fields="name,email,picture"
                          // callback={this.handleFBSubmit}
                          cssClass="btnFacebook d-flex justify-content-center mt-2"
                          icon="fa-facebook"
                          textButton=""
                        />
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
