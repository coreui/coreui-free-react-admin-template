/* eslint-disable prettier/prettier */
import { CButton, CCol, CContainer, CRow, CTable, CTableHeaderCell, CTableRow } from '@coreui/react'
import React from 'react'
export default function Actions() {
  return (
    <CRow>
      <CCol sm="auto">edit</CCol>
      <CCol sm="auto">delete</CCol>
      <CCol sm="auto">change password</CCol>
    </CRow>

    // <div className="row">
    //   <CCol sm="auto">edit</CCol>
    //   <CCol sm="auto">delete</CCol>
    //   <CCol sm="auto">change password</CCol>
    // </div>
  )
}
