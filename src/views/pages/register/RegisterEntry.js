import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Link } from 'react-router-dom'
import { CCol, CContainer, CRow, CImage } from '@coreui/react'

import RegisterAccount from './images/Register_Account.png'
import RegisterFB from './images/Register_Facebook.png'

const RegisterEntry = () => {
  const buttonAccount = (
    <Link className="d-flex justify-content-center" to="/">
      <CImage fluid src={RegisterAccount} alt="Register by Account" />
    </Link>
  )
  const buttonFB = (
    <div className="d-flex justify-content-center">
      <FacebookLogin
        appId="571174603253755"
        autoLoad={false}
        isMobile={false}
        // fields="name,email,picture"
        // callback={this.handleFBSubmit}
        textButton=""
        //   cssClass="d-flex justify-content-center w-50"
        render={(renderProps) => (
          <CImage
            src={RegisterFB}
            fluid
            alt="Register by Facebook"
            onClick={renderProps.onClick}
            style={{ cursor: 'pointer' }}
          />
        )}
      />
    </div>
  )
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="align-items-center">
        <CRow className="justify-content-center mt-5 mb-3">
          <p className="text-wrap text-center badge" style={{ fontSize: '1.5rem' }}>
            Please choose one method to register, strongly recommend via Facebook
          </p>
        </CRow>
        {/* for desktop and ipad */}
        <CRow className="justify-content-between d-sm-none d-lg-flex">
          <CCol xs="4">{buttonAccount}</CCol>
          <CCol xs="4">{buttonFB}</CCol>
        </CRow>
        {/* for mobile */}
        <CRow className="justify-content-center d-sm-flex d-lg-none">
          <CRow className="justify-content-center mb-3">{buttonAccount}</CRow>
          <CRow className="justify-content-center mt-3">{buttonFB}</CRow>
        </CRow>
      </CContainer>
    </div>
  )
}
export default RegisterEntry
