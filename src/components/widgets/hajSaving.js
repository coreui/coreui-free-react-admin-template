import React from 'react'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'

const HajSaving = (props) => {
  const HajSaving = props.HajSaving

  return (
    <CCard color="primary" textColor="white" className="mb-3">
      <CCardBody>
        <CCardTitle>Haj saving</CCardTitle>
        <CCardText>{HajSaving} JOD</CCardText>
      </CCardBody>
    </CCard>
  )
}

export default HajSaving
