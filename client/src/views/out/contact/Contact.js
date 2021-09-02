/* eslint-disable prettier/prettier */
import { CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'
import FBQRcode from '../../../assets/images/FBQRcode.png'
import IGQRcode from '../../../assets/images/IGQRcode.png'
import GithubQRcode from '../../../assets/images/GithubQRcode.png'

const Contact = () => {
  return (
    <CContainer className="text-center">
      <h1>Contact Us</h1>
      <CRow className="justify-content-evenly mt-3">
        <CCol className=" col-5 d-flex flex-row justify-content-end">
          <div className="d-flex align-items-center">
            <i className="bi bi-instagram"></i>&emsp;
            <a href="https://www.instagram.com/ntueeplus/" style={{ color: 'white' }}>
              IG
            </a>
          </div>
        </CCol>
        <CCol className="col-5 d-flex justify-content-start">
          <img src={IGQRcode} alt="IG QRcode" style={{ height: '8rem', borderRadius: '1.2rem' }} />
        </CCol>
      </CRow>
      <CRow className="justify-content-evenly mt-3">
        <CCol className=" col-5 d-flex flex-row justify-content-end">
          <div className="d-flex align-items-center">
            <i className="bi bi-facebook"></i>&emsp;
            <a href="https://www.facebook.com/groups/ntueeplus" style={{ color: 'white' }}>
              FB
            </a>
          </div>
        </CCol>
        <CCol className="col-5 d-flex justify-content-start">
          <img src={FBQRcode} alt="IG QRcode" style={{ height: '8rem', borderRadius: '1.2rem' }} />
        </CCol>
      </CRow>
      <CRow className="justify-content-evenly mt-3">
        <CCol className=" col-5 d-flex flex-row justify-content-end">
          <div className="d-flex align-items-center">
            <i className="bi bi-github"></i>&emsp;
            <a href="https://github.com/NTUEE-PLUS/EndOfWeb/" style={{ color: 'white' }}>
              Github
            </a>
          </div>
        </CCol>
        <CCol className="col-5 d-flex justify-content-start">
          <img
            src={GithubQRcode}
            alt="IG QRcode"
            style={{ height: '8rem', borderRadius: '1.2rem' }}
          />
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Contact
