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

const GoldTable = ({ data }) => {
  console.log(data)
  return (
    <CCard className="mb-4">
      <CCardHeader>Gold investment details</CCardHeader>
      <CCardBody className="expensesTable overflow-auto">
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Cost</CTableHeaderCell>
              <CTableHeaderCell>Saving</CTableHeaderCell>
              <CTableHeaderCell>Gram</CTableHeaderCell>
              <CTableHeaderCell>Revenue</CTableHeaderCell>
              <CTableHeaderCell>ROI</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.details.map((value, key) => (
              <CTableRow key={key}>
                <CTableDataCell>{value.date}</CTableDataCell>
                <CTableDataCell>{value.cost}</CTableDataCell>
                <CTableDataCell>{value.saving}</CTableDataCell>
                <CTableDataCell>{value.gram}</CTableDataCell>
                <CTableDataCell>
                  {value.revenue >= 0 ? (
                    <div className="text-success">
                      <CIcon icon={cilCaretTop} size="sm" /> {value.revenue} JOD
                    </div>
                  ) : (
                    <div className="text-danger">
                      <CIcon icon={cilCaretBottom} size="sm" /> {value.revenue} JOD
                    </div>
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {value.ROI >= 0 ? (
                    <div className="text-success">
                      <CIcon icon={cilCaretTop} size="sm" /> {value.ROI}%
                    </div>
                  ) : (
                    <div className="text-danger">
                      <CIcon icon={cilCaretBottom} size="sm" /> {value.ROI}%
                    </div>
                  )}
                </CTableDataCell>
                <CTableDataCell>{value.type}</CTableDataCell>
              </CTableRow>
            ))}

            <CTableRow>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell>{data.cost}</CTableHeaderCell>
              <CTableHeaderCell>{data.saving}</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell>
                {data.profit >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {data.profit} JOD
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {data.profit} JOD
                  </div>
                )}
              </CTableHeaderCell>
              <CTableHeaderCell>
                {data.ROI >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {data.ROI}%
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {data.ROI}%
                  </div>
                )}
              </CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
      <CCardFooter>{/* Footer content can go here if needed */}</CCardFooter>
    </CCard>
  )
}

export default GoldTable
