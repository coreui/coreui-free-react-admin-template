import React, { useState, useEffect } from 'react'
import '../css/style.css'
import {
  CCardHeader,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'

const ForexStatus = () => {
  const url = process.env.REACT_APP_API_URL
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true)
    const pairs = ['EUR/USD', 'GBP/USD']

    Promise.all(
      pairs.map((pair) =>
        axios
          .get(url + `forex/signal?pair=${encodeURIComponent(pair)}`)
          .then((res) => res.data)
          .catch(() => ({ pair, error: true })),
      ),
    ).then((result) => {
      setData(result)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Forex Status</strong>
            <CButton color="primary" size="sm" onClick={fetchData} disabled={loading}>
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
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Pair</CTableHeaderCell>
                  <CTableHeaderCell>Signal</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>P/L (1 Unit)</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((row, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell style={{ whiteSpace: 'nowrap' }}>{row.pair}</CTableDataCell>
                    <CTableDataCell style={{ whiteSpace: 'nowrap' }}>
                      {row.trade_signal || 'Error'}
                    </CTableDataCell>
                    <CTableDataCell style={{ whiteSpace: 'nowrap' }}>
                      {row.price_in_usd ?? '-'}
                    </CTableDataCell>
                    <CTableDataCell style={{ whiteSpace: 'nowrap' }}>
                      {row.p_l_per_1_unit ?? '-'}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ForexStatus
