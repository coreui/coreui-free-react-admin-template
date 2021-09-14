/* eslint-disable prettier/prettier */
import React from 'react'
import { CContainer } from '@coreui/react'

const Services = () => {
  return (
    <div id="services" className="text-center section">
      <CContainer data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.</p>
        </div>
        <div className="row">
          <div className="col-md-4">
            {' '}
            <i className="bi bi-alarm"></i>
            <div className="service-desc">
              <h3>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, exercitationem!
              </h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, asperiores
                repellendus maxime numquam quas consequuntur quae quos aperiam qui quo quis libero!
                Autem, magni obcaecati.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            {' '}
            <i className="bi bi-alarm"></i>
            <div className="service-desc">
              <h3>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, exercitationem!
              </h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, asperiores
                repellendus maxime numquam quas consequuntur quae quos aperiam qui quo quis libero!
                Autem, magni obcaecati.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            {' '}
            <i className="bi bi-alarm"></i>
            <div className="service-desc">
              <h3>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, exercitationem!
              </h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, asperiores
                repellendus maxime numquam quas consequuntur quae quos aperiam qui quo quis libero!
                Autem, magni obcaecati.
              </p>
            </div>
          </div>
        </div>
      </CContainer>
    </div>
  )
}

export default Services
