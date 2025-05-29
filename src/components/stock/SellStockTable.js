import React, { useState, useEffect, useMemo } from 'react'
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
import { FaSort, FaSortUp, FaSortDown, FaDollarSign } from 'react-icons/fa'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import axios from '../axiosConfig'
import { Link } from 'react-router-dom'

/* ------------------------------------------------------------------ */
/*  SellStockTable                                                    */
/* ------------------------------------------------------------------ */
const SellStockTable = ({ selectedCompany, onCompanySelect }) => {
  /* ------------------------ state & timers ------------------------ */
  const [data, setData] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: 'symbol', direction: 'asc' })
  const [countdown, setCountdown] = useState(60)

  /* --------------------------- fetch ------------------------------ */
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}investments/analysis`)
      .then((res) => {
        if (Array.isArray(res.data)) setData(res.data)
        setCountdown(60) // reset counter only on success
      })
      .catch((err) => console.error('Failed to load sell stock data', err))
  }

  useEffect(() => {
    fetchData()
    const autoId = setInterval(fetchData, 60_000) // auto-refresh
    const manual = () => fetchData() // 🔄 button / external
    window.addEventListener('refresh-sell', manual)
    return () => {
      clearInterval(autoId)
      window.removeEventListener('refresh-sell', manual)
    }
  }, [])

  /* visible 1-second counter */
  useEffect(() => {
    const t = setInterval(() => setCountdown((p) => (p > 0 ? p - 1 : 0)), 1_000)
    return () => clearInterval(t)
  }, [])

  /* --------------------------- helpers ---------------------------- */
  const toggleSort = (key) =>
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))

  const renderSortIcon = (key) =>
    sortConfig.key !== key ? (
      <FaSort className="ms-1 text-muted" />
    ) : sortConfig.direction === 'asc' ? (
      <FaSortUp className="ms-1 text-primary" />
    ) : (
      <FaSortDown className="ms-1 text-primary" />
    )

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return data
    return [...data].sort((a, b) => {
      const aVal = parseFloat(a[sortConfig.key])
      const bVal = parseFloat(b[sortConfig.key])
      if (isNaN(aVal) || isNaN(bVal)) return 0
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortConfig])

  const formatWithArrow = (value, showPercent = false) => {
    const num = parseFloat(value)
    if (isNaN(num)) return <span>-</span>
    const loss = num < 0
    const arrow = loss ? '↓' : '↑'
    const color = loss ? 'text-danger' : 'text-success'
    return (
      <span className={`${color} fw-bold`}>
        {arrow} {Math.abs(num).toFixed(2)}
        {showPercent ? ' %' : ''}
      </span>
    )
  }

  const renderBreakEvenCell = (be, cur) => {
    if (!be || !cur) return <span>-</span>
    const down = parseFloat(cur) < parseFloat(be)
    const arrow = down ? '↓' : '↑'
    const color = down ? 'text-danger' : 'text-success'
    return (
      <span className={`${color} fw-bold`}>
        {arrow} {parseFloat(be).toFixed(2)}
      </span>
    )
  }

  const renderTargetCell = (buy, cur) => {
    if (!buy || isNaN(buy)) return <CTableDataCell className="text-center">-</CTableDataCell>
    const target = buy * 1.15
    const color = target >= cur ? 'text-danger' : 'text-success'
    return <CTableDataCell className={`text-center ${color}`}>{target.toFixed(2)}</CTableDataCell>
  }

  /* ---------------------------- totals ---------------------------- */
  const totalUnsoldProfit = useMemo(() => {
    const v = data
      .filter((i) => i.sellPrice == null)
      .reduce((s, i) => s + (parseFloat(i.profitWithFees) || 0), 0)
    return v.toFixed(2)
  }, [data])

  const totalPLPercentage = useMemo(() => {
    let currentValue = 0
    let totalCost = 0
    data.forEach((i) => {
      if (i.sellPrice == null) {
        currentValue += (parseFloat(i.currentPrice) || 0) * (parseFloat(i.numberOfStocks) || 0)
        totalCost += parseFloat(i.totalBuyCost) || 0
      }
    })
    if (totalCost === 0) return null
    return parseFloat(((currentValue / totalCost - 1) * 100).toFixed(2))
  }, [data])

  /* ------------------------ Excel export ------------------------- */
  const exportToExcel = () => {
    const rows = data.map((i) => ({
      Symbol: i.symbol,
      'Buy Price': i.buyPrice,
      'Sell Price': i.sellPrice ?? '-',
      Current: i.currentPrice,
      Purchased: i.purchasedDate,
      'Break-Even': i.breakEvenPrice,
      Target: i.buyPrice ? (i.buyPrice * 1.15).toFixed(2) : '-',
      Qty: i.numberOfStocks,
      Fees: i.fees,
      'Total Cost': i.totalBuyCost,
      'Change %': i.stockChangePercentage,
      Profit: i.profitWithFees,
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sell Stocks')
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'sell_stock_report.xlsx')
  }

  /* --------------------------- render ----------------------------- */
  return (
    <CCard className="mb-4">
      {/* ---------- header with timer & buttons ---------- */}
      <CCardHeader className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <span>
          Sellable Stocks <small className="text-muted">(next refresh in {countdown}s)</small>
        </span>
        <div className="d-flex gap-2 align-items-center">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => window.dispatchEvent(new CustomEvent('refresh-sell'))}
          >
            🔄 Refresh
          </button>
          <button className="btn btn-sm btn-success" onClick={exportToExcel}>
            📥 Export Excel
          </button>
        </div>
      </CCardHeader>

      {/* ----------------------------- body ---------------------------- */}
      <CCardBody className="expensesTable overflow-auto" style={{ minHeight: '327px' }}>
        {sortedItems.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <span className="text-muted">No sellable stock data available</span>
          </div>
        ) : (
          <CTable align="middle" className="mb-0 border" hover responsive>
            {/* --------------------------- THEAD -------------------------- */}
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell onClick={() => toggleSort('symbol')}>
                  Symbol {renderSortIcon('symbol')}
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" onClick={() => toggleSort('buyPrice')}>
                  Buy&nbsp;Price {renderSortIcon('buyPrice')}
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center">Sell&nbsp;Price</CTableHeaderCell>
                <CTableHeaderCell
                  className="text-center"
                  onClick={() => toggleSort('currentPrice')}
                >
                  Current {renderSortIcon('currentPrice')}
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center">Purchased</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Break-Even</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Target</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Qty</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Fees</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Total&nbsp;Cost</CTableHeaderCell>
                <CTableHeaderCell
                  className="text-center"
                  onClick={() => toggleSort('stockChangePercentage')}
                >
                  Change&nbsp;% {renderSortIcon('stockChangePercentage')}
                </CTableHeaderCell>
                <CTableHeaderCell
                  className="text-center"
                  onClick={() => toggleSort('profitWithFees')}
                >
                  Profit {renderSortIcon('profitWithFees')}
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            {/* --------------------------- TBODY -------------------------- */}
            <CTableBody>
              {sortedItems.map((item, idx) => (
                <CTableRow
                  key={idx}
                  onClick={() => onCompanySelect(item.symbol)}
                  style={{ cursor: 'pointer' }}
                  className={item.symbol === selectedCompany ? 'table-primary' : ''}
                >
                  {/* Symbol + quick links */}
                  <CTableDataCell>
                    <div className="d-flex flex-column">
                      <span>{item.symbol}</span>
                      <small>
                        <span
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(
                              `https://www.google.com/finance/quote/${item.symbol}:NASDAQ`,
                              '_blank',
                            )
                          }}
                          style={{ color: '#0d6efd', cursor: 'pointer', marginRight: 8 }}
                        >
                          Google
                        </span>
                        |
                        <span
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(`https://finance.yahoo.com/quote/${item.symbol}`, '_blank')
                          }}
                          style={{ color: '#0d6efd', cursor: 'pointer', marginLeft: 8 }}
                        >
                          Yahoo
                        </span>
                      </small>
                    </div>
                  </CTableDataCell>

                  {/* numeric cells */}
                  <CTableDataCell className="text-center">{item.buyPrice}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.sellPrice ?? '-'}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.currentPrice}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.purchasedDate}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {renderBreakEvenCell(item.breakEvenPrice, item.currentPrice)}
                  </CTableDataCell>
                  {renderTargetCell(item.buyPrice, item.currentPrice)}
                  <CTableDataCell className="text-center">{item.numberOfStocks}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.fees}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.totalBuyCost}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {formatWithArrow(item.stockChangePercentage, true)}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {formatWithArrow(item.profitWithFees)}
                  </CTableDataCell>
                  {/* Action */}
                  <CTableDataCell className="text-center">
                    <Link
                      to={`/sell-investment?id=${item.id}&symbol=${item.symbol}&price=${item.buyPrice}&qty=${item.numberOfStocks}&current_price=${item.currentPrice}&fees=${item.fees}`}
                      className="btn btn-sm btn-outline-warning"
                      title="Close Deal"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaDollarSign />
                    </Link>
                  </CTableDataCell>
                </CTableRow>
              ))}

              {/* --------------------- summary row ---------------------- */}
              <CTableRow className="bg-light fw-bold">
                {/* blank through the Total Cost column (index 0-9 inclusive = 10 cells) */}
                <CTableDataCell colSpan={10} className="text-end">
                  Total:
                </CTableDataCell>
                {/* Change % column → portfolio % */}
                <CTableDataCell
                  className={`text-center fw-bold ${
                    totalPLPercentage >= 0 ? 'text-success' : 'text-danger'
                  }`}
                >
                  {totalPLPercentage >= 0 ? '↑' : '↓'} {Math.abs(totalPLPercentage).toFixed(2)} %
                </CTableDataCell>
                {/* Profit column → unsold profit */}
                <CTableDataCell
                  className={`text-center fw-bold ${
                    parseFloat(totalUnsoldProfit) >= 0 ? 'text-success' : 'text-danger'
                  }`}
                >
                  {parseFloat(totalUnsoldProfit) >= 0 ? '↑' : '↓'} {totalUnsoldProfit}
                </CTableDataCell>
                {/* Action col blank */}
                <CTableDataCell />
              </CTableRow>
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  )
}

export default SellStockTable
