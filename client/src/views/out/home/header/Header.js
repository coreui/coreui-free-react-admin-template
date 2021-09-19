/* eslint-disable prettier/prettier */
import React from 'react'
import { CButton, CContainer, CRow } from '@coreui/react'
import { NavHashLink } from 'react-router-hash-link'

const Header = () => {
  return (
    <header id="header" data-aos-anchor-placement="bottom-bottom">
      <div className="intro" data-aos="fade-up">
        <div className="overlay">
          <CContainer>
            <CRow className="justify-content-center">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  <span className="header-title">NTUEE+</span>
                  <span></span>
                </h1>
                <h2>系友們專屬的家!</h2>
                {/* <a href="/home/#services" className="btn btn-custom btn-lg page-scroll">
                  Learn More
                </a>{' '} */}
                <NavHashLink to="#services">
                  <CButton className="btn-custom">Learn More</CButton>
                </NavHashLink>
              </div>
            </CRow>
          </CContainer>
        </div>
      </div>
    </header>
  )
}

export default Header
