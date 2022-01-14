/* eslint-disable prettier/prettier */
import React from 'react'
import { CButton } from '@coreui/react'
import PropTypes from 'prop-types'
import { default_male } from './index'

const ResultBlock = ({ data }) => {
  return data.identity === 'senior' ? (
    <div className="d-flex align-items-center m-4 justify-content-around p-2 result-block">
      <div className="col-3 d-flex flex-column justify-content-center align-items-center">
        <CButton
          color="info"
          shape="rounded-pill"
          style={{ width: 'fit-content', color: 'white' }}
          disabled
        >
          學長姐
        </CButton>
        <br />
        <h1>{data.name}</h1>
      </div>
      <div className="col-3">
        {data.image === 'default' ? (
          <img src={default_male} alt="senior" className="img-fluid match-result-image" />
        ) : (
          <img src={data.image} alt="senior" className="img-fluid match-result-image" />
        )}
      </div>
      <div className="col-5 match-result-detail">
        學校：{data.school}
        <br />
        研究領域：{data.major.join('、')}
        <br />
        GPA @ NTUEE BS: {data.gpa}
        <br />
        Mail: {data.email}
      </div>
    </div>
  ) : (
    <div className="d-flex align-items-center m-4 justify-content-around p-2 result-block">
      <div className="col-3 d-flex flex-column justify-content-center align-items-center">
        <CButton color="primary" shape="rounded-pill" style={{ width: 'fit-content' }} disabled>
          學弟妹
        </CButton>
        <br />
        <h1>{data.name}</h1>
      </div>
      <div className="col-3">
        {data.image === 'default' ? (
          <img src={default_male} alt="senior" className="img-fluid match-result-image" />
        ) : (
          <img src={data.image} alt="senior" className="img-fluid match-result-image" />
        )}
      </div>
      <div className="col-5 match-result-detail">
        預計申請領域：{data.major.join('、')}
        <br />
        GPA @ NTUEE BS: {data.gpa}
        <br />
        Mail: {data.email}
      </div>
    </div>
  )
}

ResultBlock.propTypes = {
  data: PropTypes.object,
}
export default ResultBlock
