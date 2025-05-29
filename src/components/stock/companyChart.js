import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { CCard, CCardHeader, CCardBody, CButton, CCol, CRow, CTooltip } from '@coreui/react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'

const url = process.env.REACT_APP_API_URL
const ranges = ['1M', '6M', 'YTD', '1Y', '5Y']

const safeNumber = (value) => {
  const num = Number(value)
  return !isNaN(num) ? num.toFixed(2) : 'N/A'
}

const generateDynamicTooltip = (key, metrics) => {
  switch (key) {
    case 'M1':
      return `1-week momentum: ${safeNumber(
        metrics.details?.momentumPercentage?.momentum_percentage,
      )}% → Score: ${metrics.M1 ?? 'N/A'}`
    case 'M2':
      return `RSI today: ${safeNumber(metrics.details?.RSI?.RSI_today)} → Score: ${
        metrics.M2 ?? 'N/A'
      }`
    case 'M3':
      return `MACD crossover: ${metrics.details?.MACD?.bullish_crossover ? 'Yes' : 'No'} → Score: ${
        metrics.M3 ?? 'N/A'
      }`
    case 'V1':
      return `Relative volume: ${safeNumber(
        metrics.details?.volumeSurgeScore?.relative_volume,
      )} → Score: ${metrics.V1 ?? 'N/A'}`
    case 'T1':
      return `Price: ${safeNumber(metrics.details?.trendScore?.price_today)}, MA20: ${safeNumber(
        metrics.details?.trendScore?.MA_20,
      )}, MA50: ${safeNumber(metrics.details?.trendScore?.MA_50)} → Score: ${metrics.T1 ?? 'N/A'}`
    case 'R1':
      return `Volatility: ${safeNumber(
        metrics.details?.riskFactorScore?.volatility_ratio,
      )}, Gap down: ${safeNumber(metrics.details?.riskFactorScore?.gap_down_percent)}% → Score: ${
        metrics.R1 ?? 'N/A'
      }`
    default:
      return ''
  }
}

const CompanyStockChart = ({ company, onWatchlistChange }) => {
  const [range, setRange] = useState('1M')
  const [stockData, setStockData] = useState([])
  const [loading, setLoading] = useState(true)
  const [finalScore, setFinalScore] = useState(null)
  const [price, setPrice] = useState(null)
  const [metrics, setMetrics] = useState({})
  const [watchlistId, setWatchlistId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}stock/company/${company}`)
        if (res.data) {
          const chart = res.data.data || []
          setStockData(chart)
          setFinalScore(res.data.final_score || 0)
          setPrice(res.data.price || chart?.[0]?.price || null)
          setMetrics({
            M1: res.data.momentumPercentage?.score || 0,
            M2: res.data.RSI?.RSI_score || 0,
            M3: res.data.MACD?.MACD_score || 0,
            V1: res.data.volumeSurgeScore?.volume_surge_score || 0,
            T1: res.data.trendScore?.trend_score || 0,
            R1: res.data.riskFactorScore?.risk_score || 0,
            details: {
              momentumPercentage: res.data.momentumPercentage,
              RSI: res.data.RSI,
              MACD: res.data.MACD,
              volumeSurgeScore: res.data.volumeSurgeScore,
              trendScore: res.data.trendScore,
              riskFactorScore: res.data.riskFactorScore,
            },
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    const checkWatchlist = async () => {
      try {
        const res = await axios.get(`${url}watchlist/find/${company}`)
        if (res.data.exists) {
          const list = await axios.get(`${url}watchlist`)
          const match = list.data.find((item) => item.symbol === company.toUpperCase())
          setWatchlistId(match?.id || true)
        } else {
          setWatchlistId(false)
        }
      } catch (error) {
        console.error('Failed to check watchlist:', error)
      }
    }

    if (company) {
      fetchData()
      checkWatchlist()
    }
  }, [company])

  const toggleWatchlist = async () => {
    try {
      if (watchlistId) {
        await axios.delete(`${url}watchlist/${watchlistId}`)
        setWatchlistId(false)
      } else {
        await axios.post(`${url}watchlist`, {
          symbol: company.toUpperCase(),
          score: finalScore,
          momentum: metrics.M1,
          rsi: metrics.M2,
          macd: metrics.M3,
          volume: metrics.V1,
          trend: metrics.T1,
          risk: metrics.R1,
        })
        setWatchlistId(true)
      }
      if (onWatchlistChange) onWatchlistChange()
    } catch (err) {
      console.error('Error toggling watchlist:', err)
    }
  }

  const filteredData = useMemo(() => {
    const now = dayjs()
    const sortedData = (stockData || []).sort((a, b) => new Date(a.date) - new Date(b.date))

    return sortedData
      .map((item, index, arr) => {
        if (index === 0) {
          return { ...item, changePercent: 0 }
        }
        const prevPrice = arr[index - 1]?.price || 0
        const changePercent = prevPrice !== 0 ? ((item.price - prevPrice) / prevPrice) * 100 : 0
        return { ...item, changePercent }
      })
      .filter((item) => {
        const itemDate = dayjs(item.date)
        switch (range) {
          case '1M':
            return itemDate.isAfter(now.subtract(1, 'month'))
          case '6M':
            return itemDate.isAfter(now.subtract(6, 'month'))
          case 'YTD':
            return itemDate.isAfter(dayjs(`${now.year()}-01-01`))
          case '1Y':
            return itemDate.isAfter(now.subtract(1, 'year'))
          case '5Y':
            return itemDate.isAfter(now.subtract(5, 'year'))
          default:
            return true
        }
      })
  }, [range, stockData])

  const getScoreColor = (score) => (score >= 65 ? '#006400' : score >= 0 ? '#FF8C00' : '#8B0000')
  const getScoreLabel = (score) => (score >= 65 ? 'Buy' : score >= 0 ? 'Hold' : 'Risk')

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <div className="d-flex justify-content-between align-items-center flex-wrap w-100">
          <div style={{ fontWeight: 'bold' }}>
            {company && price !== null && finalScore !== null && (
              <span>
                <FontAwesomeIcon
                  icon={watchlistId ? filledStar : emptyStar}
                  style={{ color: '#f4c542', cursor: 'pointer', marginRight: '6px' }}
                  onClick={toggleWatchlist}
                  title={watchlistId ? 'Remove from Watchlist' : 'Add to Watchlist'}
                />
                Symbol: {company} | Price: ${price.toFixed(4)} |{' '}
                <span style={{ color: getScoreColor(finalScore) }}>
                  Final Score: {finalScore} ({getScoreLabel(finalScore)})
                </span>
              </span>
            )}
          </div>

          <div className="d-flex gap-2 flex-wrap align-items-center">
            {ranges.map((r) => (
              <CButton
                key={r}
                color={r === range ? 'primary' : 'light'}
                onClick={() => setRange(r)}
                size="sm"
              >
                {r}
              </CButton>
            ))}
            {company && price && (
              <Link
                to={`/AddInvestmentForm?symbol=${encodeURIComponent(company)}&price=${price}&qty=1`}
                className="btn btn-sm btn-outline-success"
                title="Add investment"
              >
                ➕ Add Investment
              </Link>
            )}
          </div>
        </div>
      </CCardHeader>

      <CCardBody className="overflow-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={295}>
              <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => dayjs(date).format('MMM D')}
                  minTickGap={20}
                />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip
                  labelFormatter={(label) => dayjs(label).format('MMMM D, YYYY')}
                  formatter={(value, name, props) => {
                    const changePercent = props.payload?.changePercent ?? 0
                    const formattedChange = changePercent.toFixed(2) + '%'
                    const color = changePercent >= 0 ? 'green' : 'red'

                    return [
                      <>
                        <div>Price: ${value.toFixed(2)}</div>
                        <div style={{ color }}>Change: {formattedChange}</div>
                      </>,
                      'Stock Info',
                    ]
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>

            <CRow className="mt-4 g-3">
              {[
                { key: 'M1', label: 'Momentum' },
                { key: 'M2', label: 'RSI' },
                { key: 'M3', label: 'MACD' },
                { key: 'V1', label: 'Volume' },
                { key: 'T1', label: 'Trend' },
                { key: 'R1', label: 'Risk' },
              ].map(({ key, label }) => (
                <CCol xs={6} md={4} lg={2} key={key}>
                  <CTooltip content={generateDynamicTooltip(key, metrics)} placement="top">
                    <div className="p-3 border rounded bg-light shadow-sm">
                      <strong>{label}</strong>
                      <div className="fs-5">{metrics[key]}</div>
                    </div>
                  </CTooltip>
                </CCol>
              ))}
            </CRow>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default CompanyStockChart
