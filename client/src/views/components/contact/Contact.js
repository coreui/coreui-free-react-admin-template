/* eslint-disable prettier/prettier */
import { CCol, CContainer, CRow, CButton } from '@coreui/react'
import React from 'react'

const Contact = () => {
  return (
    <CContainer className="text-center">
      <h1>Contact Us</h1>
      <CRow className="justify-content-evenly">
        <CCol xs={3}>
          <i className="bi bi-instagram"></i>&emsp;<a href="https://www.instagram.com/ntueeplus/">IG</a>
        </CCol>
        <CCol xs={3}>
          <h5>QRCode</h5>
        </CCol>
      </CRow>
      <CRow className="justify-content-evenly">
        <CCol xs={3}>
          <i className="bi bi-facebook"></i>&emsp;<a href="https://www.facebook.com/groups/ntueeplus">FB</a>
        </CCol>
        <CCol xs={3}>
          <h5>QRCode</h5>
        </CCol>
      </CRow>
      <CRow className="justify-content-evenly">
        <CCol xs={3}>
          <i className="bi bi-github"></i>&emsp;<a href="https://github.com/NTUEE-PLUS/EndOfWeb">Github</a>
        </CCol>
        <CCol xs={3}>
          <h5>QRCode</h5>
        </CCol>
      </CRow>
      
    </CContainer>
  )
}

export default Contact
