import React from 'react'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'

const TotalSaving = (props) => {
  const totalSaving = props.totalSaving

  return (
    <CCard color="success" textColor="white" className="mb-3">
      <CCardBody>
        <CCardTitle>Total saving</CCardTitle>
        <CCardText>{totalSaving} JOD</CCardText>
      </CCardBody>
    </CCard>
  )
}

export default TotalSaving
