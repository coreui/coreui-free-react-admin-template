import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin, login } from '../../../slices/loginSlice'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Link, Redirect } from 'react-router-dom'
import { CCol, CContainer, CRow, CImage } from '@coreui/react'

import RegisterAccount from './images/Register_Account.png'
import RegisterFB from './images/Register_Facebook.png'

const RegisterEntry = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector(selectLogin)

  const [needRegister, setNeedRegister] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleFBSubmit = (res) => {
    if (res.status == 'unknown') {
      return
    }
    // try to loginFB
    // check if login success
    // if no redirect to registerFB, then redirect to login
    // if success redirect to inside
    setUserId(res.userID)
    axios
      .post('/api/loginFB', { facebookID: res.userID })
      .then((res) => {
        const { username } = res.data
        alert(`歡迎回來! ${username}`)
        dispatch(login())
      })
      .catch((err) => {
        switch (err.response.status) {
          case 404:
            setNeedRegister(true)
            break
          default:
            alert(err.response.data.description)
            break
        }
      })
  }

  const buttonAccount = (
    <Link className="d-flex justify-content-center" to="/register">
      <CImage fluid src={RegisterAccount} alt="Register by Account" />
    </Link>
  )
  const buttonFB = (
    <div className="d-flex justify-content-center">
      <FacebookLogin
        appId={process.env.REACT_APP_fbAPIid || '571174603253755'}
        autoLoad={false}
        isMobile={false}
        fields="name,email,picture"
        callback={handleFBSubmit}
        textButton=""
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
  if (isLogin) {
    return <Redirect to="/home" />
  } else if (needRegister) {
    return (
      <Redirect
        to={{
          pathname: '/register_fb',
          state: { facebookID: userId },
        }}
      />
    )
  } else {
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
}
export default RegisterEntry
