// src/components/dailyStockTable.js

import React, { useState, useMemo, useEffect } from 'react'
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

import CIcon from '@coreui/icons-react'
import { cilCaretTop, cilCaretBottom } from '@coreui/icons'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'

const DailyStockTable = ({ data, onCompanySelect, selectedCompany }) => {
  const items = Array.isArray(data) ? data : []
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return items
    return [...items].sort((a, b) => {
      const aVal = a[sortConfig.key]
      const bVal = b[sortConfig.key]
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [items, sortConfig])

  const handleSort = (key) => {
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

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <span>Today Stock</span>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => window.dispatchEvent(new CustomEvent('refresh-daily'))}
        >
          🔄 Refresh
        </button>
      </CCardHeader>
      <CCardBody className="expensesTable overflow-auto" style={{ minHeight: '327px' }}>
        {sortedItems.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <span className="text-muted">No stock data available</span>
          </div>
        ) : (
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell style={{ width: '388px' }}>Name</CTableHeaderCell>
                <CTableHeaderCell onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                  Price {renderSortIcon('price')}
                </CTableHeaderCell>
                <CTableHeaderCell
                  onClick={() => handleSort('changesPercentage')}
                  style={{ cursor: 'pointer' }}
                >
                  Change {renderSortIcon('changesPercentage')}
                </CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sortedItems.map((value, index) => (
                <CTableRow
                  key={index}
                  onClick={() => onCompanySelect(value.symbol)}
                  style={{ cursor: 'pointer' }}
                  color={value.symbol === selectedCompany ? 'primary' : ''}
                >
                  <CTableDataCell>
                    {value.name.length > 40 ? value.name.substring(0, 40) + '...' : value.name}
                  </CTableDataCell>
                  <CTableDataCell>{value.price}</CTableDataCell>
                  <CTableDataCell>
                    {value.changesPercentage >= 0 ? (
                      <div className="text-success">
                        <CIcon icon={cilCaretTop} size="sm" /> {value.changesPercentage.toFixed(2)}%
                      </div>
                    ) : (
                      <div className="text-danger">
                        <CIcon icon={cilCaretBottom} size="sm" />{' '}
                        {Math.abs(value.changesPercentage).toFixed(2)}%
                      </div>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>{value.type}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  )
}

export default DailyStockTable
