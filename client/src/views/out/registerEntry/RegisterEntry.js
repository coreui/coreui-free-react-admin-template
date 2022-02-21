import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin, login } from '../../../slices/loginSlice'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Link, Redirect } from 'react-router-dom'
import { CCol, CContainer, CRow, CImage } from '@coreui/react'
import FB from 'fb-react-sdk'

import Alumnus from './images/Alumnus.png'
import Student from './images/Student.png'

const RegisterEntry = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector(selectLogin)

  const [needRegister, setNeedRegister] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleFBSubmit = async (res) => {
    if (res.status == 'unknown') {
      return
    }
    const { email, userID, accessToken } = res
    const imgUrl = await new Promise((resolve, reject) => {
      FB.setAccessToken(accessToken)
      const url = `${userID}/picture`
      FB.get(
        url,
        { redirect: false, height: 720 }, //type:"large"},
        function (err, res) {
          console.log(res)
          if (err) {
            console.log('error occurred', err)
            return reject(false)
          }
          console.log(res.data.url)
          resolve({ url: res.data.url })
        },
      )
    })
    console.log('img', imgUrl.url)
    // try to loginFB
    // check if login success
    // if no redirect to registerFB, then redirect to login
    // if success redirect to inside

    setUserId(res.userID)
    axios
      .post('/api/loginFB', { facebookID: res.userID })
      .then((res) => {
        const { username, isAuth } = res.data
        alert(`歡迎回來! ${username}`)
        dispatch(login(isAuth))
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
  if (isLogin) {
    return <Redirect to="/home" />
  } else {
    return (
      <div className="min-vh-100 d-flex flex-row align-items-center">
        <CContainer className="align-items-center">
          <CRow className="justify-content-center mt-5 mb-3">
            <p className="text-wrap text-center badge" style={{ fontSize: '1.5rem' }}>
              Please choose your identity to sign up by different method
            </p>
          </CRow>
          {/* for desktop and ipad */}
          <CRow className="justify-content-around d-flex">
            <CCol md="4" sm="8">
              <Link
                to="register/student"
                className="d-flex justify-content-center display-3 text-white"
              >
                <CImage src={Student} alt="Register as Student" className="img-fluid" />
              </Link>
              <h3 className="text-light text-center mt-4">我是未畢業學生!</h3>
            </CCol>
            <CCol md="4" sm="8">
              <Link
                to="register/alumni"
                className="d-flex justify-content-center display-3 text-white"
              >
                <CImage src={Alumnus} alt="Register as Alumnus" className="img-fluid" />
              </Link>
              <h3 className="text-light text-center mt-4">我是已畢業系友!</h3>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}
export default RegisterEntry
