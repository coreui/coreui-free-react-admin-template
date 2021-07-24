import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
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

const LoginFormTemplate = {
  studentID: '',
  password: '',
}

const Login = () => {
  const [loginForm, setLoginForm] = useState(LoginFormTemplate)
  const [isLogin, setIsLogin] = useState(false) // delete if redux is setting

  useEffect(() => {
    // check login status
    setIsLogin(false) // for test
  }, [])

  const handleInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // connect with backend
    // check if login
    // if success then redirect inside
    setIsLogin(true)
  }

  return isLogin ? (
    <Redirect to="/"></Redirect>
  ) : (
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
                        <CIcon name="cil-education" />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Student ID"
                        name="studentID"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <Link to="/register_entry" color="link" className="px-0">
                          Create a new account?
                        </Link>
                      </CCol>
                      <CCol xs="6" className="d-flex justify-content-end">
                        <Link to="/forget" color="link" className="px-0">
                          Forgot password?
                        </Link>
                      </CCol>
                    </CRow>
                    <CRow className="mt-3">
                      <CCol className="d-flex justify-content-center">
                        <CButton color="dark" className="px-4" onClick={handleSubmit}>
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
