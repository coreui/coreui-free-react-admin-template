/* eslint-disable prettier/prettier */
import React from 'react'
import { CContainer, CRow } from '@coreui/react'

const Features = () => {
  return (
    <div id="features" className="text-center section">
      <CContainer
        className="justify-content-center"
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
      >
        {/* <div className="col-md-10 col-md-offset-1 section-title"> */}

        <CRow className="section-title">
          <h2>Features</h2>
        </CRow>
        <CRow>
          <div className="col-xs-6 col-sm-3">
            {' '}
            <i className="bi bi-arrow-up-circle-fill"></i>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ex eius sint nobis
              veritatis vel commodi alias impedit?
            </p>
          </div>
          <div className="col-xs-6 col-sm-3">
            {' '}
            <i className="bi bi-arrow-up-circle-fill"></i>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ex eius sint nobis
              veritatis vel commodi alias impedit?
            </p>
          </div>
          <div className="col-xs-6 col-sm-3">
            {' '}
            <i className="bi bi-arrow-up-circle-fill"></i>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ex eius sint nobis
              veritatis vel commodi alias impedit?
            </p>
          </div>
          <div className="col-xs-6 col-sm-3">
            {' '}
            <i className="bi bi-arrow-up-circle-fill"></i>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ex eius sint nobis
              veritatis vel commodi alias impedit?
            </p>
          </div>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Features
