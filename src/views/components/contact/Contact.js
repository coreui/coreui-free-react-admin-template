/* eslint-disable prettier/prettier */
import { CCol, CRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import left_img from '../../../assets/images/left_minister.png'
import right_img from '../../../assets/images/right_minister.png'

const Contact = () => {
  return (
    <div align="center" className="mt-4">
      <CRow className="justify-content-evenly">
        <CCol xs={3}>
          <img src={left_img} alt="部長 留學組" className="img-fluid mb-4" />
          <h2 className="mb-3">李筠婕</h2>
          <h3>B06901014</h3>
        </CCol>
        <CCol xs={3}>
          <img src={right_img} alt="部長 網頁組" className="img-fluid mb-4" />
          <h2 className="mb-3">鄭謹譯</h2>
          <h3>B06901180</h3>
        </CCol>
      </CRow>
      <div className="container d-flex justify-content-center mt-5 mb-4">
        <Link to="/team">
          <button
            className="px-3 py-2"
            style={{ fontWeight: 'bold', border: '0.2rem solid', borderRadius: '1rem' }}
          >
            Our Team
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Contact
