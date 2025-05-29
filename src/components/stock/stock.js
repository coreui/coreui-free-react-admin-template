// src/components/stock.js

import React, { useState, useEffect } from 'react'
import axios from '../axiosConfig'
import { AppFooter, AppHeader } from '../index'
import '../css/style.css'
import { CContainer, CRow, CCol } from '@coreui/react'

import DailyStockTable from './dailyStockTable'
import CompanyStockChart from './companyChart'
import WatchlistStockTable from './WatchlistStockTable'

const Stock = () => {
  const url = process.env.REACT_APP_API_URL
  const [stock, setStockData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [refreshDaily, setRefreshDaily] = useState(0)
  const [refreshWatchlist, setRefreshWatchlist] = useState(0)
  const [searchSymbol, setSearchSymbol] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stockResponse] = await Promise.all([axios.get(url + 'stock/daily')])

        if (stockResponse.data) {
          setStockData(stockResponse.data)
          if (stockResponse.data.length > 0) {
            setSelectedCompany(stockResponse.data[0].symbol)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, refreshDaily])

  useEffect(() => {
    const handleDailyRefresh = () => setRefreshDaily((prev) => prev + 1)
    const handleWatchlistRefresh = () => setRefreshWatchlist((prev) => prev + 1)

    window.addEventListener('refresh-daily', handleDailyRefresh)
    window.addEventListener('refresh-watchlist', handleWatchlistRefresh)

    return () => {
      window.removeEventListener('refresh-daily', handleDailyRefresh)
      window.removeEventListener('refresh-watchlist', handleWatchlistRefresh)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            {/* 🔍 Search Bar */}
            <CRow className="my-4">
              <CCol sm={12} md={10}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter stock symbol (e.g., AAPL)"
                  value={searchSymbol}
                  onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSelectedCompany(searchSymbol)
                    }
                  }}
                />
              </CCol>
              <CCol sm={12} md={2}>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => setSelectedCompany(searchSymbol)}
                >
                  Show Chart
                </button>
              </CCol>
            </CRow>

            <CRow>
              <CCol sm={6} lg={6}>
                {stock && (
                  <DailyStockTable
                    data={stock}
                    selectedCompany={selectedCompany}
                    onCompanySelect={(symbol) => {
                      setSelectedCompany(symbol)
                    }}
                  />
                )}
              </CCol>

              <CCol sm={6} lg={6}>
                <WatchlistStockTable
                  onCompanySelect={(symbol) => setSelectedCompany(symbol)}
                  selectedCompany={selectedCompany}
                  refreshKey={refreshWatchlist}
                />
              </CCol>
            </CRow>

            {/* 📈 Chart Section */}
            <CRow>
              <CCol sm={12} lg={12}>
                {selectedCompany && (
                  <CompanyStockChart
                    company={selectedCompany}
                    onWatchlistChange={() => setRefreshWatchlist((prev) => prev + 1)}
                  />
                )}
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Stock
