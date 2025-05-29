import React from 'react'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'

const MoneySaving = (props) => {
  const moneySaving = props.moneySaving

  return (
    <CCard color="dark" textColor="white" className="mb-3">
      <CCardBody>
        <CCardTitle>Money saving</CCardTitle>
        <CCardText>{moneySaving} JOD</CCardText>
      </CCardBody>
    </CCard>
  )
}

export default MoneySaving
