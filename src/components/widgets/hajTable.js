import React from 'react'
import '../css/style.css'
import {
  CCardHeader,
  CCard,
  CCardBody,
  CCardFooter,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilCaretTop, cilCaretBottom } from '@coreui/icons'

const HajTable = ({ data }) => {
  console.log(data)
  return (
    <CCard className="mb-4">
      <CCardHeader>Haj investment details</CCardHeader>
      <CCardBody className="expensesTable overflow-auto">
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Year</CTableHeaderCell>
              <CTableHeaderCell>Month</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.details.map((value, key) => (
              <CTableRow key={key}>
                <CTableDataCell>{value.Year}</CTableDataCell>
                <CTableDataCell>{value.month}</CTableDataCell>
                <CTableDataCell>{value.amount} JOD</CTableDataCell>
              </CTableRow>
            ))}

            <CTableRow>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell>{data.paid} JOD</CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
      <CCardFooter>{/* Footer content can go here if needed */}</CCardFooter>
    </CCard>
  )
}

export default HajTable
