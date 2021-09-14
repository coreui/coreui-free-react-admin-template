import React from 'react'
import { CContainer, CRow } from '@coreui/react'

const About = () => {
  return (
    <div id="about" className="section">
      <CContainer data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <CRow>
          <div className="col-xs-12 col-md-6">
            {' '}
            <img src="https://picsum.photos/520/380" className="img-responsive" alt="" />{' '}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>
                試著回想18歲的自己，未來的人脈往往成為促使我們選擇台大電機的原因，然而曾經我們引以為傲的人脈資產，現在卻如此凋零。
                一瞥世界上知名大學，他們都擁有一個共通點：人脈網絡。哈佛大學的老爺爺願意為了甫錄取的學弟妹提點長談，史丹佛大學的前輩也不遺餘力提拔後進。相比之下，我們認為系上一直缺乏專屬平台供系友建立緊密的網路，遂使人脈日益薄弱。
                近年創立的NTUEE Chain已經輔導眾多學生申請上國外一流大學，我們更希望延續EE
                Chain的初衷，讓這份互相傳承聯絡的心拓展到所有系友。繼承著B03~B06學長姐們的意志，我們希望這個聯絡網能成為一個整合式的社群網路，讓NTUEErs聚在一起；秉持著恢復人脈網的精神，讓NTUEE能在世界上有更大的影響力；建立一個連結電機系的共同回憶，讓系友們有專屬的家！
              </p>
              {/* <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => <li key={`${d}-${i}`}>{d}</li>)
                      : 'loading'}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => <li key={`${d}-${i}`}> {d}</li>)
                      : 'loading'}
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </CRow>
      </CContainer>
    </div>
  )
}

export default About
