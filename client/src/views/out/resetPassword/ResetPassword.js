import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
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
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const ResetPasswordFormTemplate = {
  account: '',
  active: '',
  password: '',
  ConfirmPassword: '',
}

const ResetPassword = () => {
  const [toLogin, setToLogin] = useState(false)

  const { account, active } = useParams()
  const [resetPasswordForm, setResetPasswordForm] = useState(ResetPasswordFormTemplate)

  useEffect(() => {
    setResetPasswordForm({ ...resetPasswordForm, account: account, active: active })
  }, [])

  const handleInputChange = (e) => {
    setResetPasswordForm({ ...resetPasswordForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // connect with backend
    // and send email to user
    if (resetPasswordForm.password != resetPasswordForm.ConfirmPassword) {
      return alert('密碼不一致')
    } else {
      let r = window.confirm('確認修改密碼？')
      if (r) {
        // send to backend
        // then redirect to login
        axios
          .post('api/activation', resetPasswordForm)
          .then((res) => {
            alert('修改密碼成功,跳轉至登入頁面')
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
  }

  return toLogin ? (
    <Redirect to="/login" />
  ) : (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="10" lg="8" xl="7">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Let&apos;s Reset Your Password!</h1>
                  <CInputGroup className="my-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" name="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormControl
                      type="password"
                      placeholder="New Password"
                      name="password"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" name="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormControl
                      type="password"
                      placeholder="Repeat password"
                      name="ConfirmPassword"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CRow className="justify-content-center mt-3">
                    <div className="d-flex justify-content-center">
                      <CButton color="dark" block onClick={handleSubmit}>
                        Reset Password
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
  )
}

export default ResetPassword
