/* eslint-disable prettier/prettier */
import React from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'
import ResultBlock from './ResultBlock'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../../slices/loginSlice'

const MatchResult = ({ sdata, jdata, identity }) => {
  const history = useHistory()
  const reFill = (e) => {
    e.preventDefault()
    history.push(`/match_form/${identity}`)
  }
  const { imgSrc } = useSelector(selectLogin)
  return (
    <div className="p-4">
      {(identity === 'senior' && jdata.length) || (identity === 'junior' && sdata.name) ? (
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
          <h3>
            配對結果尚未公佈！
            <br />
            DEADLINE一到，我們便會公佈這一期所有的配對結果～
          </h3>
          <CButton onClick={reFill}>修改表單</CButton>
        </>
      )}
    </div>
  )
}
MatchResult.propTypes = {
  jdata: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  sdata: PropTypes.object,
  identity: PropTypes.string,
}
export default MatchResult
