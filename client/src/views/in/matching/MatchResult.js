/* eslint-disable prettier/prettier */
import React from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'
import ResultBlock from './ResultBlock'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../../slices/loginSlice'

const MatchResult = ({ sdata, jdata, identity, ended }) => {
  const history = useHistory()
  const reFill = (e) => {
    e.preventDefault()
    history.push(`/match_form/${identity}`)
  }
  const { imgSrc } = useSelector(selectLogin)
  return (
    <div className="p-4">
      {(identity === 'senior' && jdata.length && jdata !== 'unmatched') ||
      (identity === 'junior' && sdata !== 'unmatched') ? (
        identity === 'junior' ? (
          <>
            <ResultBlock data={sdata} />
            <ResultBlock data={{ ...jdata, image: imgSrc }} />
          </>
        ) : (
          <>
            <ResultBlock data={{ ...sdata, image: imgSrc }} />
            <>
              {jdata.map((j) => {
                return <ResultBlock data={j} key={j.name} />
              })}
            </>
          </>
        )
      ) : (
        <>
          {ended ? (
            identity === 'junior' && sdata === 'unmatched' ? (
              <h3>很抱歉我們無法為您配對到適合的學長姐</h3>
            ) : identity === 'senior' && jdata === 'unmatched' ? (
              <h3>感謝您願意提供經驗分享，但目前沒有需要的學弟妹</h3>
            ) : (
              <>
                <h3>配對結果尚未公佈！</h3>
                <h3>請靜待結果</h3>
              </>
            )
          ) : (
            <>
              <h3>配對結果尚未公佈！</h3>
              <h3>DEADLINE一到，我們便會公佈這一期所有的配對結果～</h3>
              <CButton onClick={reFill}>修改表單</CButton>
            </>
          )}
        </>
      )}
    </div>
  )
}
MatchResult.propTypes = {
  jdata: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  sdata: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  identity: PropTypes.string,
  ended: PropTypes.bool,
}
export default MatchResult
