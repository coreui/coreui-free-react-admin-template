import React, { useState, useEffect, useMemo } from 'react'
import axios from '../axiosConfig'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { FaSort, FaSortUp, FaSortDown, FaDownload } from 'react-icons/fa'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const WatchlistStockTable = ({ onCompanySelect, selectedCompany, refreshKey }) => {
  const [data, setData] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' })

  const fetchWatchlist = () => {
    axios
      .get(process.env.REACT_APP_API_URL + 'watchlist')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to load watchlist', err))
  }

  useEffect(() => {
    fetchWatchlist()
  }, [refreshKey])

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key]
      const bVal = b[sortConfig.key]
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortConfig])

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ms-1" />
    return sortConfig.direction === 'asc' ? (
      <FaSortUp className="ms-1" />
    ) : (
      <FaSortDown className="ms-1" />
    )
  }

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedItems)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Watchlist')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(file, 'Watchlist.xlsx')
  }

  const headers = [
    { label: 'Symbol', key: 'symbol', sortable: false },
    { label: 'Score', key: 'score', sortable: true },
    { label: 'Momentum', key: 'momentum', sortable: true },
    { label: 'RSI', key: 'rsi', sortable: true },
    { label: 'MACD', key: 'macd', sortable: true },
    { label: 'Volume', key: 'volume', sortable: true },
    { label: 'Trend', key: 'trend', sortable: true },
    { label: 'Risk', key: 'risk', sortable: true },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <span>Watchlist</span>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => window.dispatchEvent(new CustomEvent('refresh-watchlist'))}
          >
            🔄 Refresh
          </button>
          <button
            className="btn btn-sm btn-outline-success"
            onClick={downloadExcel}
            title="Download Excel"
          >
            <FaDownload className="me-1" /> Export
          </button>
        </div>
      </CCardHeader>

      <CCardBody className="expensesTable overflow-auto" style={{ minHeight: '327px' }}>
        {sortedItems.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <span className="text-muted">No watchlist companies exist</span>
          </div>
        ) : (
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead
              color="light"
              className="sticky-top bg-light shadow-sm"
              style={{ top: 0, zIndex: 10 }}
            >
              <CTableRow>
                {headers.map(({ label, key, sortable }) => (
                  <CTableHeaderCell
                    key={key}
                    onClick={sortable ? () => toggleSort(key) : undefined}
                    style={{ cursor: sortable ? 'pointer' : 'default' }}
                  >
                    {label} {sortable && renderSortIcon(key)}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sortedItems.map((item, index) => (
                <CTableRow
                  key={index}
                  onClick={() => onCompanySelect(item.symbol)}
                  style={{ cursor: 'pointer' }}
                  className={item.symbol === selectedCompany ? 'table-primary' : ''}
                >
                  <CTableDataCell>{item.symbol}</CTableDataCell>
                  <CTableDataCell>{item.score}</CTableDataCell>
                  <CTableDataCell>{item.momentum}</CTableDataCell>
                  <CTableDataCell>{item.rsi}</CTableDataCell>
                  <CTableDataCell>{item.macd}</CTableDataCell>
                  <CTableDataCell>{item.volume}</CTableDataCell>
                  <CTableDataCell>{item.trend}</CTableDataCell>
                  <CTableDataCell>{item.risk}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  )
}

export default WatchlistStockTable
