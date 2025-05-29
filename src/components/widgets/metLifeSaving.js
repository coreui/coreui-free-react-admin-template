import React from 'react'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'

const MetLifeSaving = (props) => {
  const metLifeSaving = props.metLifeSaving

  return (
    <CCard color="danger" textColor="white" className="mb-3">
      <CCardBody>
        <CCardTitle>Metlife saving</CCardTitle>
        <CCardText>{metLifeSaving} JOD</CCardText>
      </CCardBody>
    </CCard>
  )
}

export default MetLifeSaving
