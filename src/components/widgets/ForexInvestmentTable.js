import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'

const ForexInvestmentTable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const apiUrl = process.env.REACT_APP_API_URL + 'inv/forex-investments'

  const refreshData = () => {
    setLoading(true)
    axios
      .get(apiUrl)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    refreshData()
  }, [])

  const renderStyled = (value) => {
    const isPositive = value >= 0
    const color = isPositive ? 'green' : 'red'

    return <span style={{ color, whiteSpace: 'nowrap' }}>{value.toFixed(2)}%</span>
  }

  const renderProfit = (profit) => {
    const isPositive = profit >= 0
    const color = isPositive ? 'green' : 'red'

    return <span style={{ color, whiteSpace: 'nowrap' }}>{profit.toFixed(2)} USD</span>
  }

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Current open Forex trading</strong>
            <CButton color="primary" size="sm" onClick={refreshData} disabled={loading}>
              {loading ? (
                <>
                  <CSpinner size="sm" /> Refreshing...
                </>
              ) : (
                'Refresh'
              )}
            </CButton>
          </CCardHeader>

          <CCardBody className="expensesTable overflow-auto">
            {loading ? (
              <CSpinner color="primary" />
            ) : (
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Currency</CTableHeaderCell>
                    <CTableHeaderCell>Amount</CTableHeaderCell>
                    <CTableHeaderCell>Currency Value</CTableHeaderCell>
                    <CTableHeaderCell>Converted Value</CTableHeaderCell>
                    <CTableHeaderCell>Profit</CTableHeaderCell>
                    <CTableHeaderCell>Profit %</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell style={{ whiteSpace: 'nowrap' }}>
                        {item.currency}
                      </CTableDataCell>
                      <CTableDataCell style={{ whiteSpace: 'nowrap' }}>
                        {item.amount.toFixed(2)}
                      </CTableDataCell>
                      <CTableDataCell style={{ whiteSpace: 'nowrap' }}>
                        {item.currency_value.toFixed(2)} {item.currency}
                      </CTableDataCell>
                      <CTableDataCell style={{ whiteSpace: 'nowrap' }}>
                        {item.converted_value.toFixed(2)}
                      </CTableDataCell>
                      <CTableDataCell>{renderProfit(item.profit)}</CTableDataCell>
                      <CTableDataCell>{renderStyled(item.profit_percentage)}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ForexInvestmentTable
