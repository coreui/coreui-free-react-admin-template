/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { success_icon, mail_sent } from './index'
import axios from 'axios'
const Mail = ({ hasSent, setHasSent, setHasMatched }) => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const inputRef = useRef(null)

  const handleUpload = () => {
    inputRef.current?.click()
  }
  const handleInputFile = () => {
    inputRef.current?.files && setUploadedFile(inputRef.current.files[0])
    console.log(inputRef.current.files[0])
  }
  const sendMail = () => {
    const config = { 'content-type': 'multipart/form-data' }
    let data = new FormData()
    data.append('result', uploadedFile)
    axios.post('/api/study/sendMail', data, config).then(() => {
      console.log('mails sent!!')
      setHasSent(true)
    })
  }
  return (
    <div className="d-flex flex-column align-items-center">
      {hasSent ? (
        <>
          <button
            className="align-self-baseline btn btn-ghost-info"
            onClick={() => setHasMatched(false)}
          >
            <CIcon name="cil-home" size="lg" />
          </button>
          <img src={mail_sent} alt="success" className="img-fluid w-25" />
          <h2 className="my-4">信件已全數寄出，謝謝您的幫忙！</h2>
        </>
      ) : (
        <>
          <button
            className="align-self-baseline btn btn-ghost-info"
            onClick={() => setHasMatched(false)}
          >
            <CIcon name="cil-home" size="lg" />
          </button>
          <h2 className="my-4">配對已完成！趕快發信告訴大家吧！</h2>
          <img src={success_icon} alt="success" className="img-fluid w-25" />
          <div className="m-3">
            <label className="h3 mt-1 mx-3">上傳配對結果:</label>
            <input ref={inputRef} onChange={handleInputFile} className="d-none" type="file" />
            <button
              onClick={handleUpload}
              className={`btn btn-outline-${uploadedFile ? 'success' : 'primary'}`}
            >
              {uploadedFile ? uploadedFile.name : 'Upload'}
            </button>
          </div>
          <button disabled={!uploadedFile} className="btn btn-primary" onClick={sendMail}>
            <h5 className="m-0">點我發信</h5>
          </button>
        </>
      )}
    </div>
  )
}
Mail.propTypes = {
  hasSent: PropTypes.bool,
  setHasSent: PropTypes.func,
  setHasMatched: PropTypes.func,
}
export default Mail
