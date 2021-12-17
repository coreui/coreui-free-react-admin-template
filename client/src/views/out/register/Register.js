import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CListGroupItem,
  CRow,
  CCollapse,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Redirect } from 'react-router-dom'

const RegisterFormTemplate = {
  account: '',
  password: '',
  ConfirmPassword: '',
  username: '',
  Email: '',
  file: null,
}

const Register = () => {
  // for web control
  const [isExpand, setIsExpand] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [previewURL, setPreviewURL] = useState(null)
  const [fileButton, setFileButton] = useState(null)
  const [toLogin, setToLogin] = useState(false)

  // data to backend
  const [registerForm, setRegisterForm] = useState(RegisterFormTemplate)

  const expand = (e) => {
    e.preventDefault()
    setIsExpand(true)
  }
  const constract = (e) => {
    e.preventDefault()
    setIsExpand(false)
  }

  const openModal = (e) => {
    setIsModal(true)
  }

  const closeModal = (e) => {
    setIsModal(false)
  }

  const handleChangeImage = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    setFileButton(e.target)
    setRegisterForm({ ...registerForm, file: file })
    reader.onloadend = () => {
      setPreviewURL(reader.result)
    }
    reader.readAsDataURL(file)
    // call the modal
    setIsModal(true)
  }

  const clearImage = (e) => {
    setIsModal(false)
    setPreviewURL(null)
    setRegisterForm({ ...registerForm, file: null })
    fileButton.value = ''
  }

  const handleInputChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (registerForm.password != registerForm.ConfirmPassword) {
      return alert('密碼不一致')
    } else {
      let data = new FormData()
      for (let key in registerForm) {
        data.append(key, registerForm[key])
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
      // send to backend
      // then redirect to login
      axios
        .post('api/register', data, config)
        .then((res) => {
          alert('註冊成功,跳轉至登入頁面')
          setToLogin(true)
        })
        .catch((err) => {
          switch (err.response.status) {
            default:
              alert(err.response.data.description)
              break
          }
        })
    }
  }

  return toLogin ? (
    <Redirect to="/login" />
  ) : (
    <>
      <CModal visible={isModal} onDismiss={closeModal} alignment="center">
        <CModalHeader onDismiss={closeModal}>
          <CModalTitle>Preview Your Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <img src={previewURL} className="img-fluid container justify-content-center d-flex" />
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={clearImage}>
            Clear
          </CButton>
          <CButton color="dark" onClick={closeModal}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="11" lg="9" xl="8">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Just A Few Steps to Join EE+!</h1>
                    <p className="text-medium-emphasis">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Your Chinese Name"
                        name="username"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-education" />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Student ID"
                        name="account"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        placeholder="Repeat password"
                        name="ConfirmPassword"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormControl placeholder="Email" name="Email" onChange={handleInputChange} />
                    </CInputGroup>
                    <CInputGroup
                      className="mb-3"
                      onMouseEnter={expand}
                      onFocus={expand}
                      onBlur={constract}
                    >
                      <CInputGroupText>
                        <CIcon icon="cil-image" />
                      </CInputGroupText>
                      <CFormControl
                        id="formFile"
                        type="file"
                        onChange={handleChangeImage}
                      ></CFormControl>
                    </CInputGroup>
                    <CCollapse visible={isExpand} onMouseLeave={constract}>
                      <CListGroup>
                        <CListGroupItem color="info">
                          ID photo should contain your <b>full name</b> and{' '}
                          <b>intact, clear face</b>.
                        </CListGroupItem>
                        <CListGroupItem color="success">
                          ID photo is used to confirm your identity, and will be auto deleted after
                          account is activated
                        </CListGroupItem>
                        <CListGroupItem color="warning">
                          The size of photo is at most <b>1MB</b>.
                        </CListGroupItem>
                      </CListGroup>
                      <div className="d-flex justify-content-end">
                        {previewURL ? (
                          <CLink color="link" onClick={openModal} style={{ cursor: 'pointer' }}>
                            Preview Again?
                          </CLink>
                        ) : (
                          <></>
                        )}
                      </div>
                    </CCollapse>
                    <CRow className="justify-content-center mt-3">
                      <div className="d-flex justify-content-center">
                        <CButton color="dark" onClick={handleSubmit}>
                          Create Account
                        </CButton>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Register
