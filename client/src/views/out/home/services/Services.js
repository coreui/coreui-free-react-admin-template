/* eslint-disable prettier/prettier */
import React from 'react'
import { CContainer, CRow, CImage } from '@coreui/react'
import studyabroad from '../../../../assets/images/studyabroad.png'
import column from '../../../../assets/images/column.png'
import communicate from '../../../../assets/images/communicate.png'
import career from '../../../../assets/images/career.png'

const Services = () => {
  return (
    <div id="services" className="text-center section">
      <CContainer
        className="justify-content-center"
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
      >
        <CRow className="section-title">
          <h2>Our Services</h2>
        </CRow>
        <CRow>
          <div className="col-xs-6 col-sm-3">
            {' '}
            <div className="square-img-container">
              <CImage src={communicate} alt="..." className="img img-fluid"></CImage>
            </div>
            <h3>通訊錄</h3>
            <p>
              建立完整系友聯繫網路
              <br />
              加深NTUEErs之間的連結
            </p>
          </div>
          <div className="col-xs-6 col-sm-3">
            {' '}
            <div className="square-img-container">
              <CImage src={career} alt="..." className="img img-fluid"></CImage>
            </div>
            <h3>徵才求職</h3>
            <p></p>
          </div>
          <div className="col-xs-6 col-sm-3">
            {' '}
            <div className="square-img-container">
              <CImage src={studyabroad} alt="..." className="img img-fluid"></CImage>
            </div>
            <h3>留學資訊</h3>
            <p></p>
          </div>
          <div className="col-xs-6 col-sm-3">
            {' '}
            <div className="square-img-container">
              <CImage src={column} alt="..." className="img img-fluid"></CImage>
            </div>
            <h3>採訪文章</h3>
            <p></p>
          </div>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Services
