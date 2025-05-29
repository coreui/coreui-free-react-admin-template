import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const TotalLaonsPayments = (props) => {
  return (
    <CCard color="danger" textColor="white">
      <CCardHeader>Total unpaid payments</CCardHeader>
      <CCardBody>
        <h4>{props.amount} JOD</h4>
      </CCardBody>
    </CCard>
  )
}

export default TotalLaonsPayments
