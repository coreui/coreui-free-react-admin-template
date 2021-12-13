/* eslint-disable prettier/prettier */
import React from 'react'

const Experience = () => {
  return (
    <div className="aboard-experience d-flex flex-column align-items-center p-3">
      <h2>此處為精華區，收錄歷年申請結果及心得，請點下方連結</h2>
      <img
        src="https://ssl.gstatic.com/images/branding/product/2x/hh_drive_96dp.png"
        alt="Google Drive"
        className="img-fluid my-3"
      />
      <button className="btn btn-primary h3" onClick="location.href='#'">
        點此進入GDrive精華區
      </button>
    </div>
  )
}

export default Experience
