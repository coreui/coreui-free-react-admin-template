import React from 'react'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'

const totalEarning = (props) => {
  const totalEarning = props.totalEarning

  return (
    <CCard color="muted" textColor="dark" className="mb-3">
      <CCardBody>
        <CCardTitle>Total Earning</CCardTitle>
        <CCardText>{totalEarning} JOD</CCardText>
      </CCardBody>
    </CCard>
  )
}

export default totalEarning
