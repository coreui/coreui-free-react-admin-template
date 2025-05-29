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

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number)
}

const SummaryTable = ({ data }) => {
  console.log(data)
  return (
    <CCard className="mb-4">
      <CCardHeader>Summary</CCardHeader>
      <CCardBody className="expensesTable overflow-auto">
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Cost</CTableHeaderCell>
              <CTableHeaderCell>Profit</CTableHeaderCell>
              <CTableHeaderCell>Revenue</CTableHeaderCell>
              <CTableHeaderCell>ROI</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Gold</CTableDataCell>
              <CTableDataCell>{formatNumber(data.physicalGold.cost)} JOD</CTableDataCell>
              <CTableDataCell>{formatNumber(data.physicalGold.saving)} JOD</CTableDataCell>
              <CTableDataCell>
                {data.gold.profit >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {formatNumber(data.physicalGold.profit)}{' '}
                    JOD
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" />{' '}
                    {formatNumber(data.physicalGold.profit)} JOD
                  </div>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {data.physicalGold.ROI >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {data.physicalGold.ROI}%
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {data.physicalGold.ROI}%
                  </div>
                )}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell>Silver</CTableDataCell>
              <CTableDataCell>{formatNumber(data.silver.cost)} JOD</CTableDataCell>
              <CTableDataCell>{formatNumber(data.silver.saving)} JOD</CTableDataCell>
              <CTableDataCell>
                {data.silver.profit >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {formatNumber(data.silver.profit)} JOD
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {formatNumber(data.silver.profit)} JOD
                  </div>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {data.silver.ROI >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {data.silver.ROI}%
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {data.silver.ROI}%
                  </div>
                )}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell>Etihad Gold</CTableDataCell>
              <CTableDataCell>{formatNumber(data.EtihadGold.cost)} JOD</CTableDataCell>
              <CTableDataCell>{formatNumber(data.EtihadGold.saving)} JOD</CTableDataCell>
              <CTableDataCell>
                {data.EtihadGold.profit >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {formatNumber(data.EtihadGold.profit)}{' '}
                    JOD
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {formatNumber(data.EtihadGold.profit)}{' '}
                    JOD
                  </div>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {data.EtihadGold.ROI >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {data.EtihadGold.ROI}%
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {data.EtihadGold.ROI}%
                  </div>
                )}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell>Haj</CTableDataCell>
              <CTableDataCell>{formatNumber(data.haj.paid)} JOD</CTableDataCell>
              <CTableDataCell>{formatNumber(data.haj.revenu)} JOD</CTableDataCell>
              <CTableDataCell>
                {data.haj.profit >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {formatNumber(data.haj.profit)} JOD
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {formatNumber(data.haj.profit)} JOD
                  </div>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {data.haj.ROI >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {data.haj.ROI}%
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {data.haj.ROI}%
                  </div>
                )}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell>Metlife</CTableDataCell>
              <CTableDataCell>{formatNumber(data.inv.paid)} JOD</CTableDataCell>
              <CTableDataCell>{formatNumber(data.inv.cash)} JOD</CTableDataCell>
              <CTableDataCell>
                {data.inv.revenu >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {formatNumber(data.inv.revenu)} JOD
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {formatNumber(data.inv.revenu)} JOD
                  </div>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {data.inv.ROI >= 0 ? (
                  <div className="text-success">
                    <CIcon icon={cilCaretTop} size="sm" /> {data.inv.ROI}%
                  </div>
                ) : (
                  <div className="text-danger">
                    <CIcon icon={cilCaretBottom} size="sm" /> {data.inv.ROI}%
                  </div>
                )}
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
      <CCardFooter>{/* Footer content can go here if needed */}</CCardFooter>
    </CCard>
  )
}

export default SummaryTable
