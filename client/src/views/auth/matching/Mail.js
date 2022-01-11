/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { success_icon, mail_sent } from './index'
const Mail = ({ setHasMatched }) => {
  const [hasSent, setHasSent] = useState(false)
  const sendMail = () => {
    setHasSent(true)
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
          <img src={mail_sent} alt="success" className="img-fluid w-50" />
          <h2 className="my-4">信件已全數寄出，謝謝您的幫忙！</h2>
        </>
      ) : (
        <>
          <img src={success_icon} alt="success" className="img-fluid w-50" />
          <h2 className="my-4">配對已完成！趕快發信告訴大家吧！</h2>
          <button className="btn btn-primary" onClick={sendMail}>
            <h5 className="m-0">點我發信</h5>
          </button>
        </>
      )}
    </div>
  )
}
Mail.propTypes = {
  setHasMatched: PropTypes.func,
}
export default Mail
