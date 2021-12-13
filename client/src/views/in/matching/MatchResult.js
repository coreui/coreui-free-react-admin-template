/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

const MatchResult = ({ jdata, sdata }) => {
  return (
    <div className="p-4">
      {jdata.name && sdata.name ? (
        <>
          <div className="d-flex align-items-center m-4 justify-content-around p-2 result-block">
            <div className="col-3 d-flex justify-content-center">
              {sdata.num + ' ' + sdata.name}
            </div>
            <div className="col-3">
              <img src={sdata.image} alt="senior" className="img-fluid" />
            </div>
            <div className="col-5">
              學校：{sdata.school}
              <br />
              科系：{sdata.department}
              <br />
              研究領域：{sdata.field.join('、')}
              <br />
              GPA @ NTUEE BS: {sdata.gpa}
              <br />
              Mail:{sdata.mail}
            </div>
          </div>
          <div className="d-flex align-items-center m-4 justify-content-around p-2 result-block">
            <div className="col-3 d-flex justify-content-center">
              {jdata.num + ' ' + jdata.name}
            </div>
            <div className="col-3">
              <img src={jdata.image} alt="junior" className="img-fluid" />
            </div>
            <div className="col-5">
              預計申請領域：{jdata.field.join('、')}
              <br />
              GPA @ NTUEE BS: {jdata.gpa}
              <br />
              Mail:{jdata.mail}
            </div>
          </div>
        </>
      ) : (
        <h3>
          配對結果尚未公佈！
          <br />
          DEADLINE一到，我們便會公佈這一期所有的配對結果～
        </h3>
      )}
    </div>
  )
}
MatchResult.propTypes = {
  jdata: PropTypes.object,
  sdata: PropTypes.object,
}
export default MatchResult
