import React from 'react'
import { CButton, CContainer, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
//import './NotFound.css'

const NotFound = () => {
  return (
    <CContainer className="vh-100 d-flex align-items-center justify-content-center">
      <CRow className="text-center">
        <CCol>
          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">Oops! Page not found</h2>
          <p className="notfound-text">
            We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t exist. It might have
            <br />
            been removed or is temporarily unavailable.
          </p>
          <CButton color="primary" href="/dashboard#/dashboard" className="notfound-btn">
            <CIcon icon={cilArrowLeft} className="me-2" /> Back to Home
          </CButton>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default NotFound
