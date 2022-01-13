/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

const ResultBlock = ({ data }) => {
  return data.identity === 'senior' ? (
    <div className="d-flex align-items-center m-4 justify-content-around p-2 result-block">
      <div className="col-3 d-flex justify-content-center">{data.num + ' ' + data.name}</div>
      <div className="col-3">
        <img src={data.image} alt="senior" className="img-fluid" />
      </div>
      <div className="col-5">
        學校：{data.school}
        <br />
        科系：{data.department}
        <br />
        研究領域：{data.field.join('、')}
        <br />
        GPA @ NTUEE BS: {data.gpa}
        <br />
        Mail:{data.mail}
      </div>
    </div>
  ) : (
    <div className="d-flex align-items-center m-4 justify-content-around p-2 result-block">
      <div className="col-3 d-flex justify-content-center">{data.num + ' ' + data.name}</div>
      <div className="col-3">
        <img src={data.image} alt="junior" className="img-fluid" />
      </div>
      <div className="col-5">
        預計申請領域：{data.field.join('、')}
        <br />
        GPA @ NTUEE BS: {data.gpa}
        <br />
        Mail:{data.mail}
      </div>
    </div>
  )
}

ResultBlock.propTypes = {
  data: PropTypes.object,
}
export default ResultBlock
