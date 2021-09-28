/* eslint-disable prettier/prettier */
import React from 'react'
import { CContainer } from '@coreui/react'
import { Link } from 'react-router-dom'
import columnOutline1999 from '../../../../assets/images/1999_column_outline.jpg'
import columnOutline2008 from '../../../../assets/images/2008_column_outline.jpg'
import columnOutline2012 from '../../../../assets/images/2012_column_outline.jpg'

const Interviews = () => {
  return (
    <div id="interviews" className="text-center section">
      <CContainer data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <div className="section-title">
          <h2>Interviews</h2>
          <p>底下是我們節錄的一些採訪介紹，一起看看吧！</p>
        </div>
        <div className="d-flex flex-row">
          <div className="col-xs-12 col-sm-4">
            <div className="portfolio-item">
              <div className="hover-bg">
                {' '}
                <Link
                  to="/interview/interview_1"
                  title="Project Title"
                  data-lightbox-gallery="gallery1"
                >
                  <div className="hover-text">
                    <h3>2012級 李昀樵 </h3>
                    <h4>17直播 技術副總</h4>
                    <p className="mx-3">
                      李昀樵曾是李琳山教授語音實驗室的研究生，研究所時期除了研究外，更有進行小型創業，開發出新聞摘要軟件及搜尋公共腳踏車的APP，前者以兩萬元售出，後者成為該領域當時市占率最高的APP。
                    </p>
                  </div>
                  <img
                    src={columnOutline2012}
                    className="img-fluid p-2 rounded"
                    alt="Project Title"
                  />{' '}
                </Link>{' '}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="portfolio-item">
              <div className="hover-bg">
                {' '}
                <Link
                  to="/interview/interview_2"
                  title="Project Title"
                  data-lightbox-gallery="gallery1"
                >
                  <div className="hover-text">
                    <h3>1999級 簡韶逸</h3>
                    <h4> (CEO/ Founder @ Ganzin Technology, Prof. @ NTUEE)</h4>
                    <p className="mx-3">
                      簡韶逸教授任職於台大電子所長達16年，致力於多媒體訊號處理系統、多媒體積體電路設計、晶片系統設計方法的研究。
                      多年來，「媒體晶片系統實驗室」不斷研發出優異的技術。
                    </p>
                  </div>
                  <img src={columnOutline1999} className="img-fluid rounded" alt="Project Title" />{' '}
                </Link>{' '}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="portfolio-item">
              <div className="hover-bg">
                {' '}
                <Link
                  to="/interview/interview_3"
                  title="Project Title"
                  data-lightbox-gallery="gallery1"
                >
                  <div className="hover-text">
                    <h3>2008級 鄭恆之</h3>
                    <h4> (Technical Lead Manager @ Google Brain)</h4>
                    <p className="mx-3">
                      目前任職於 Google Brain
                      的團隊技術領導者和軟體主管工程師的鄭恆之，從事大規模機器學習的研究與軟體開發。
                    </p>
                  </div>
                  <img
                    src={columnOutline2008}
                    className="img-fluid p-2 rounded"
                    alt="Project Title"
                  />{' '}
                </Link>{' '}
              </div>
            </div>
          </div>
        </div>
      </CContainer>
    </div>
  )
}

export default Interviews
