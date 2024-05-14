import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const Login = () => {
  const currentUser = firebase.auth().currentUser
  const [redirectToUpload, setRedirectToUpload] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setRedirectToUpload(true)
    }
  }, [currentUser])

  if (redirectToUpload) {
    return <Navigate to="/dasboard" />
  }

  return (
    <div>
      <div className="blur"></div>
      <LoginForm setRedirectToUpload={setRedirectToUpload} />
    </div>
  )
}

const LoginForm = ({ setRedirectToUpload }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      setSuccessMessage('Başarılı giriş!')
      setRedirectToUpload(true)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      setSuccessMessage('Başarılı kayıt!')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Giriş Yap</h1>
                    <hr></hr>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Password"
                        autoComplete="current-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol md={12}>
                        <CButton
                          color="primary"
                          style={{ width: '100%' }}
                          className="px-4"
                          // onClick={handleLogin}
                          onClick={handleRegister}
                        >
                          Giriş
                        </CButton>
                      </CCol>
                      <CCol xs={12} className="text-right mt-2">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
