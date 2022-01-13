/* eslint-disable prettier/prettier */
import React from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'
import ResultBlock from './ResultBlock'
const MatchResult = ({ sdata, jdata, identity }) => {
  const history = useHistory()
  const reFill = (e) => {
    e.preventDefault()
    history.push(`/match_form/${identity}`)
  }
  return (
    <div className="p-4">
      {jdata.name && sdata.name ? (
        <>
          <ResultBlock data={jdata} />
          <ResultBlock data={sdata} />
        </>
      ) : (
        <>
          <h3>
            配對結果尚未公佈！
            <br />
            DEADLINE一到，我們便會公佈這一期所有的配對結果～
          </h3>
          <CButton onClick={reFill}>重填表單</CButton>
        </>
      )}
    </div>
  )
}
MatchResult.propTypes = {
  jdata: PropTypes.object,
  sdata: PropTypes.object,
  identity: PropTypes.string,
}
export default MatchResult
