import React from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'

const DeviceView = () => {
  const { id } = useParams()

  return (
    <CContainer fluid>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Device Details</strong>
            </CCardHeader>
            <CCardBody>
              <p>Device ID: {id}</p>
              <p>This is where you'll display device-specific information.</p>
              <p>You can customize this component based on the device data you want to show.</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default DeviceView