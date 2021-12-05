/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CFormCheck } from '@coreui/react'

const OpenMatching = ({ setOpened }) => {
  const [identity, setIdentity] = useState('')
  let tempIdentity = ''
  return (
    <div className="OpenMatching" style={{ color: 'white' }}>
      {identity === '' ? (
        <div>
          <h2>歡迎使用留學交流（原EE Chain）功能！ 您是第一次開通，所以請選擇您的身份</h2>
          <div className="d-flex">
            <div className="col-5">
              <CFormCheck
                type="radio"
                name="identity"
                value="senior"
                id="senior"
                label="我是學長姊"
                onChange={(e) => (tempIdentity = e.target.value)}
              />
              已有申請學校或在國外工作等等的經驗，願意回來幫助學弟妹出國、與其他已畢業學長姐交流。
            </div>
            <div className="col-5">
              <CFormCheck
                type="radio"
                name="identity"
                value="junior"
                id="junior"
                label="我是學弟妹"
                onChange={(e) => (tempIdentity = e.target.value)}
              />
              想申請出國希望能多得到學長姊的經驗，未來出國後將再把經驗流傳給下一屆！
            </div>
          </div>
          <button onClick={() => setIdentity(tempIdentity)}>下一步</button>
        </div>
      ) : identity === 'senior' ? (
        <div>
          學長姐您好，欲開通 EE Chain ，請完成下列事項 請於9/20前填妥 「
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScOJj5lN4sIb_ppYKVT4QiHLZiZ8satlHcd0bln2Kp4PHBnYw/viewform?fbclid=IwAR1X4jzLa1dLyYq1SuVS-TC-F0z77O6h54weANgHLhw5snpaVsV3Gk1CUwM">
            當年留學申請經驗
          </a>
          」 我們才會幫您配對您的學弟妹哦！ 完成後，請按下方『確認送出』
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log('open')
              setOpened(true)
            }}
          >
            確認送出
          </button>
        </div>
      ) : (
        <div>
          學弟妹您好，欲開通 EE Chain ，請完成下列事項 請於9/20前填妥
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP3_IwQIQYiB5yRxNq53c0j77N9EasbdlWbXRhRNTsvxl1CA/viewform?fbclid=IwAR1X4jzLa1dLyYq1SuVS-TC-F0z77O6h54weANgHLhw5snpaVsV3Gk1CUwM">
            留學申請資料
          </a>
          我們才會幫您配對輔導您的學長姐哦！ 完成後，請按下方『確認送出』
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log('open')
              setOpened(true)
            }}
          >
            確認送出
          </button>
        </div>
      )}
    </div>
  )
}
OpenMatching.propTypes = {
  setOpened: PropTypes.func,
}
export default OpenMatching
