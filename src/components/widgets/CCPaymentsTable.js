import React, { useState, useEffect } from 'react'
import '../css/style.css'
import {
  CCardHeader,
  CRow,
  CCol,
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

import axios from 'axios'
import { cilCaretTop, cilCaretBottom } from '@coreui/icons'

const CCPaymentsTable = (props) => {
  const year = props.year
  const url = process.env.REACT_APP_API_URL
  const month = props.month
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(url + 'credit_card_payments/payments/' + year + '/' + month)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [year, url])
  if (data.details) {
    return (
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Credit Card payments</CCardHeader>
            <CCardBody className="expensesTable overflow-auto">
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Month</CTableHeaderCell>
                    <CTableHeaderCell>Paid</CTableHeaderCell>
                    <CTableHeaderCell>Expenses</CTableHeaderCell>
                    <CTableHeaderCell>Net</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.details.map((value, key) => (
                    <CTableRow key={key}>
                      <CTableDataCell>{key + 1}</CTableDataCell>
                      <CTableDataCell>{value.month}</CTableDataCell>
                      <CTableDataCell>
                        <div>{value.payments}</div>
                      </CTableDataCell>
                      <CTableDataCell>{value.expenses}</CTableDataCell>
                      <CTableDataCell>
                        {value.net >= 0 ? (
                          <div className="text-success">
                            <CIcon icon={cilCaretTop} size="sm" /> {value.net}
                          </div>
                        ) : (
                          <div className="text-danger">
                            <CIcon icon={cilCaretBottom} size="sm" /> {value.net}
                          </div>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}

                  <CTableRow>
                    <CTableDataCell>
                      <strong>Total Dept</strong>
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell>
                      <strong>{data.net}</strong>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>{/* Footer content */}</CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default CCPaymentsTable
