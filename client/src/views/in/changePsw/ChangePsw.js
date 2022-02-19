import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../slices/loginSlice'
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

const ChangeFormTemplate = {
  oldPsw: '',
  newPsw: '',
}

const ChangePsw = () => {
  const dispatch = useDispatch()
  const [changeForm, setChangeForm] = useState(ChangeFormTemplate)

  const handleInputChange = (e) => {
    setChangeForm({ ...changeForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // connect with backend
    axios
      .post('/api/chPassword', changeForm)
      .then((res) => {
        alert(`密碼已更改 \n請使用新密碼登入`)
        axios
          .post('/api/logout')
          .then((res) => {
            dispatch(logout())
          })
          .catch((err) => {
            alert(err.response.data.description)
          })
      })
      .catch((err) => {
        alert(err.response.data.description)
      })
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="10" lg="8" xl="7">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Wanna Change Your Password ?</h1>
                  <p> </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" name="cil-education" />
                    </CInputGroupText>
                    <CFormControl
                      placeholder="Old Password"
                      name="oldPsw"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" name="cil-education" />
                    </CInputGroupText>
                    <CFormControl
                      placeholder="New Password"
                      name="newPsw"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CRow className="justify-content-center mt-3">
                    <div className="d-flex justify-content-center">
                      <CButton color="dark" block onClick={handleSubmit}>
                        Change
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

export default ChangePsw
