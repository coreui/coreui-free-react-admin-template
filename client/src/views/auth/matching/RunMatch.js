/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
const RunMatch = ({ sdata, jdata, result, setHasMatched }) => {
  const [isModal, setIsModal] = useState(false)
  const match = () => {
    if (sdata && jdata) {
      console.log('start matching')
      setHasMatched(true)
    }
  }
  const clearFormDB = () => {}
  return (
    <>
      <CModal size="lg" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>重啟一期配對</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h3>
            重新開始一期配對會將舊的配對資料庫中的<b className="text-danger">所有資料刪除</b>
            ，您確定要重新開啟一期的配對嗎？
          </h3>
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={() => setIsModal(false)}>
            Cancel
          </CButton>
          <CButton color="dark" onClick={clearFormDB}>
            Yes
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="run-match">
        <h2>
          本期的配對截止日為<b className="text-danger">2/10</b>，請在期限內配對學長姐與學弟妹
          <br />
          目前共有{12}名學弟妹以及{10}名學長姐在等待您的配對結果
        </h2>
        <button className="btn btn-primary mt-3" onClick={match}>
          <h5 className="m-0">點我開始配對</h5>
        </button>
        <br />
        <br />
        <h2>若要重開一期配對，請點下方按鈕</h2>
        <button className="btn btn-danger mt-3" onClick={() => setIsModal(true)}>
          <h5 className="m-0">我要重開一期</h5>
        </button>
      </div>
    </>
  )
}
RunMatch.propTypes = {
  sdata: PropTypes.object,
  jdata: PropTypes.object,
  result: PropTypes.object,
  setHasMatched: PropTypes.func,
}
export default RunMatch
