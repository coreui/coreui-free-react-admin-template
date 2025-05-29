import React from 'react'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'

const GoldSaving = (props) => {
  const GoldSaving = props.GoldSaving

  return (
    <CCard color="warning" textColor="white" className="mb-3">
      <CCardBody>
        <CCardTitle>Gold saving</CCardTitle>
        <CCardText>{GoldSaving} JOD</CCardText>
      </CCardBody>
    </CCard>
  )
}

export default GoldSaving
