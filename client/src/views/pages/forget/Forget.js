import React, { useState } from 'react'
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

const ForgetFormTemplate = {
  studentID: '',
}

const Forget = () => {
  const [forgetForm, setForgetForm] = useState(ForgetFormTemplate)

  const handleInputChange = (e) => {
    setForgetForm({ ...forgetForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // connect with backend
    // and send email to user
    console.log(forgetForm) // for test
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="10" lg="8" xl="7">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Forget Password? Don{"'"}t Worry!</h1>
                  <p>We{"'"}ll help you!</p>
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
                  <CRow className="justify-content-center mt-3">
                    <div className="d-flex justify-content-center">
                      <CButton color="dark" block onClick={handleSubmit}>
                        Send Link to Mail
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

export default Forget
