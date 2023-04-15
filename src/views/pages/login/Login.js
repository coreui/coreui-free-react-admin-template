import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  CModal,
  CModalBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios';
import { BACKEND_HOST } from '../../../constant';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import UserCreateModal from "../../modal/UserCreateModal";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = Cookies.get('authToken');
  //   if (token) {
  //     navigate('/dashboard');
  //   }
  // }, []);

  const doLogin = async () => {
    try {
      const response = await axios.post(`${BACKEND_HOST}/auth/login`, {username, password});
      const token = response?.data?.token;
      dispatch({ type: 'set', authToken: token });
      Cookies.set('authToken', token, { expires: 1 });
      navigate('/dashboard');
    } catch (err) {
      setShowErrorModal(true);
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username"
                        autoComplete="username"/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
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
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={doLogin} color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        <CModal
          visible={showErrorModal}
          onClose={() => setShowErrorModal(false)}>
          <CModalBody>
            <p>Incorrect username or password. Please try again.</p>
          </CModalBody>
        </CModal>
      </CContainer>
    </div>
  )
}

export default Login
