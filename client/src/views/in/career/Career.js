/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'
import { CCol, CRow, CContainer, CImage } from '@coreui/react'
import Recruitment_image from '../../../assets/images/Recruitment.png'
import Recommendation_image from '../../../assets/images/Recommendation.png'

const Career = () => {
  return (
    <div className="d-flex flex-row align-items-center career">
      <CContainer className="align-items-center">
        {/* for desktop and ipad */}
        <CRow className="justify-content-around d-sm-none d-lg-flex">
          <CCol xs="4">
            <Link className="d-flex justify-content-center" to="/recruitment">
              <CImage
                fluid
                src={Recruitment_image}
                alt="Register by Account"
                className="career_img"
              />
            </Link>
          </CCol>
          <CCol xs="4">
            <Link className="d-flex justify-content-center" to="/recommendation">
              <CImage
                fluid
                src={Recommendation_image}
                alt="Register by Account"
                className="career_img  "
              />
            </Link>
          </CCol>
        </CRow>
        {/* for mobile */}
        <CRow className="justify-content-center d-sm-flex d-lg-none">
          <CRow className="justify-content-center mb-3">
            <Link className="d-flex justify-content-center" to="/recruitment">
              <CImage
                fluid
                src={Recruitment_image}
                alt="Register by Account"
                className="career_img  "
              />
            </Link>
          </CRow>
          <CRow className="justify-content-center mt-3">
            <Link className="d-flex justify-content-center" to="/recommendation">
              <CImage
                fluid
                src={Recommendation_image}
                alt="Register by Account"
                className="career_img  "
              />
            </Link>
          </CRow>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Career
