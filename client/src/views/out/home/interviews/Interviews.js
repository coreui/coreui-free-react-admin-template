/* eslint-disable prettier/prettier */
import React from 'react'
import { CContainer } from '@coreui/react'

const Interviews = () => {
  return (
    <div id="interviews" className="text-center section">
      <CContainer data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <div className="section-title">
          <h2>Interviews</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.</p>
        </div>
        <div className="d-flex flex-row">
          <div className="col-xs-6 col-sm-4">
            <div className="portfolio-item">
              <div className="hover-bg">
                {' '}
                <a
                  href="https://picsum.photos/350/200"
                  title="Project Title"
                  data-lightbox-gallery="gallery1"
                >
                  <div className="hover-text">
                    <h4>Lorem Ipsum</h4>
                  </div>
                  <img
                    src="https://picsum.photos/350/200"
                    className="img-responsive"
                    alt="Project Title"
                  />{' '}
                </a>{' '}
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="portfolio-item">
              <div className="hover-bg">
                {' '}
                <a
                  href="https://picsum.photos/350/200"
                  title="Project Title"
                  data-lightbox-gallery="gallery1"
                >
                  <div className="hover-text">
                    <h4>Adipiscing Elit</h4>
                  </div>
                  <img
                    src="https://picsum.photos/350/200"
                    className="img-responsive"
                    alt="Project Title"
                  />{' '}
                </a>{' '}
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="portfolio-item">
              <div className="hover-bg">
                {' '}
                <a
                  href="https://picsum.photos/350/200"
                  title="Project Title"
                  data-lightbox-gallery="gallery1"
                >
                  <div className="hover-text">
                    <h4>Lorem Ipsum</h4>
                  </div>
                  <img
                    src="https://picsum.photos/350/200"
                    className="img-responsive"
                    alt="Project Title"
                  />{' '}
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </CContainer>
    </div>
  )
}

export default Interviews
