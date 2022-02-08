/* eslint-disable prettier/prettier */
import React from 'react'
import { CContainer, CRow } from '@coreui/react'

const Team = () => {
  return (
    <div id="team" className="text-center section">
      <CContainer data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <CRow className="section-title">
          <h2>Meet the Team</h2>
        </CRow>
        <CRow>
          <div className="col-sm-3 col-xs-6 team">
            <div className="thumbnail">
              {' '}
              <img
                src="https://i.imgur.com/eOWLfEO.png"
                alt="..."
                className="team-img img-fluid"
                style={{
                  borderRadius: '50%',
                }}
              />
              <div className="caption">
                <h4>卓昱辰</h4>
                <p>留學採訪負責人</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-xs-6 team">
            <div className="thumbnail">
              {' '}
              <img
                src="https://i.imgur.com/y6P3fTw.png"
                alt="..."
                className="team-img img-fluid"
                style={{
                  borderRadius: '50%',
                }}
              />
              <div className="caption">
                <h4>王友廷</h4>
                <p>網頁維護負責人</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-xs-6 team">
            <div className="thumbnail">
              {' '}
              <img
                src="https://i.imgur.com/VorzAuV.png"
                alt="..."
                className="team-img img-fluid"
                style={{
                  borderRadius: '50%',
                }}
              />
              <div className="caption">
                <h4>陳亮君</h4>
                <p>網頁維護負責人</p>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-xs-6 team">
            <div className="thumbnail">
              {' '}
              <img
                src="https://i.imgur.com/5psCEQS.png"
                alt="..."
                className="team-img img-fluid"
                style={{
                  borderRadius: '50%',
                }}
              />
              <div className="caption">
                <h4>巫竑儒</h4>
                <p>網頁維護負責人</p>
              </div>
            </div>
          </div>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Team
