import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react'
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const url = process.env.REACT_APP_API_URL
const ranges = ['1M', '6M', 'YTD', '1Y', '5Y']

const SellCompanyChart = ({ symbol }) => {
  const [range, setRange] = useState('1M')
  const [data, setData] = useState([])
  const [livePriceData, setLivePriceData] = useState([])
  const [buyPrice, setBuyPrice] = useState(null)
  const [price, setPrice] = useState(null)
  const [buyScore, setBuyScore] = useState(null)
  const [sellScore, setSellScore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState({
    M1: 0,
    M2: 0,
    M3: 0,
    V1: 0,
    T1: 0,
    R1: 0,
  })

  const downloadExcel = () => {
    if (!data || !symbol) return
    const summarySheetData = [
      { Label: 'Symbol', Value: symbol },
      { Label: 'Buy Price', Value: buyPrice },
      { Label: 'Current Price', Value: price },
      { Label: 'Buy Score', Value: buyScore },
      { Label: 'Sell Score', Value: sellScore },
      { Label: 'Momentum (M1)', Value: metrics.M1 },
      { Label: 'RSI (M2)', Value: metrics.M2 },
      { Label: 'MACD (M3)', Value: metrics.M3 },
      { Label: 'Volume Surge (V1)', Value: metrics.V1 },
      { Label: 'Trend (T1)', Value: metrics.T1 },
      { Label: 'Risk (R1)', Value: metrics.R1 },
    ]
    const chartData = data.slice(0, 100).map(({ date, price }) => ({
      Date: date,
      Price: price,
    }))
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summarySheetData), 'Summary')
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(chartData), 'Chart Data')
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    saveAs(
      new Blob([excelBuffer], { type: 'application/octet-stream' }),
      `${symbol}_sell_report.xlsx`,
    )
  }

  const fetchStock = async () => {
    if (!symbol) return
    try {
      setLoading(true)
      const res = await axios.get(`${url}stock/sell-score/${symbol}`)
      const raw = res.data
      setData(raw.long_term_data || [])
      setBuyPrice(raw.buyPrice)
      setPrice(raw.price)
      setBuyScore(raw.buy_score)
      setSellScore(raw.sell_score)
      setMetrics({
        M1: raw.momentumPercentage?.score || 0,
        M2: raw.RSI?.RSI_score || 0,
        M3: raw.MACD?.MACD_score || 0,
        V1: raw.volumeSurgeScore?.volume_surge_score || 0,
        T1: raw.trendScore?.trend_score || 0,
        R1: raw.riskFactorScore?.risk_score || 0,
      })
    } catch (err) {
      console.error('Failed to fetch chart:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStock()
  }, [symbol])

  useEffect(() => {
    if (!symbol || !process.env.REACT_APP_TWELVE_DATA_API_KEY) return
    const socket = new WebSocket('wss://ws.twelvedata.com/v1/price')
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          action: 'subscribe',
          params: { symbols: symbol, apikey: process.env.REACT_APP_TWELVE_DATA_API_KEY },
        }),
      )
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.symbol === symbol && message.price) {
        setLivePriceData((prev) => [
          ...prev.slice(-199),
          { date: new Date().toISOString(), price: parseFloat(message.price) },
        ])
      }
    }
    socket.onerror = (err) => console.error('WebSocket error:', err)
    socket.onclose = () => console.log('WebSocket closed')
    return () => {
      try {
        socket.send(
          JSON.stringify({
            action: 'unsubscribe',
            params: { symbols: symbol, apikey: process.env.REACT_APP_TWELVE_DATA_API_KEY },
          }),
        )
      } catch (e) {
        console.warn('Unsubscribe failed:', e)
      }
      socket.close()
    }
  }, [symbol])

  const filteredData = useMemo(() => {
    const now = dayjs()
    return (data || [])
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
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [range, data])

  const chartData = useMemo(
    () => [...filteredData, ...livePriceData],
    [filteredData, livePriceData],
  )

  const yDomain = useMemo(() => {
    if (!filteredData.length || !buyPrice) return ['auto', 'auto']
    const prices = filteredData.map((d) => d.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const targetPrice = buyPrice * 1.15
    const trueMax = maxPrice > targetPrice ? maxPrice : targetPrice
    const buffer = (trueMax - minPrice) * 0.1
    return [minPrice - buffer, trueMax + buffer]
  }, [filteredData, buyPrice])

  const getScoreColor = (score) => (score >= 65 ? '#006400' : score >= 0 ? '#FF8C00' : '#8B0000')
  const getLabel = (score) => (score >= 65 ? 'Buy' : score >= 0 ? 'Hold' : 'Risk')

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <div className="d-flex justify-content-between align-items-center flex-wrap w-100">
          <div style={{ fontWeight: 'bold' }}>
            {symbol && price !== null && (
              <span>
                Symbol: {symbol.toUpperCase()} | Price: ${price.toFixed(2)} | Sell Score:
                <span style={{ color: getScoreColor(sellScore), marginLeft: '5px' }}>
                  {sellScore} ({getLabel(sellScore)})
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
            <CButton color="light" size="sm" onClick={fetchStock}>
              🔄 Refresh
            </CButton>
            <CButton color="success" size="sm" onClick={downloadExcel}>
              ⬇️ Download
            </CButton>
          </div>
        </div>
      </CCardHeader>

      <CCardBody className="overflow-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={295}>
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => dayjs(d).format('MMM D')}
                minTickGap={20}
              />
              <YAxis
                type="number"
                domain={yDomain}
                ticks={
                  buyPrice
                    ? [
                        (buyPrice - buyPrice * 0.05).toFixed(2) * 1,
                        buyPrice,
                        (buyPrice + buyPrice * 0.15).toFixed(2) * 1,
                      ]
                    : undefined
                }
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length && buyPrice) {
                    const price = parseFloat(payload[0].value)
                    const change = ((price - buyPrice) / buyPrice) * 100
                    const isPositive = change >= 0
                    return (
                      <div
                        style={{
                          background: 'white',
                          border: '1px solid #ccc',
                          padding: '8px',
                          fontSize: '13px',
                          lineHeight: '1.4',
                          minWidth: '120px',
                        }}
                      >
                        <div>
                          <strong>{label}</strong>
                        </div>
                        <div>Price: ${price.toFixed(2)}</div>
                        <div style={{ color: isPositive ? 'green' : 'red' }}>
                          Change: {isPositive ? '+' : ''}
                          {change.toFixed(2)}%
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              {/* Area dynamic color */}
              <Area
                type="monotone"
                dataKey="price"
                stroke={price > buyPrice ? '#198754' : '#dc3545'}
                fill={price > buyPrice ? '#198754' : '#dc3545'}
                fillOpacity={0.2}
                strokeWidth={2}
                dot={false}
              />

              {/* Live websocket line */}
              <Line
                type="monotone"
                dataKey="price"
                data={livePriceData}
                stroke="black"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />

              {buyPrice && (
                <>
                  <ReferenceLine
                    y={buyPrice}
                    stroke="#dc3545"
                    strokeDasharray="6 3"
                    strokeWidth={2}
                    label={{
                      value: `Buy @ ${buyPrice.toFixed(2)}`,
                      position: 'right',
                      fill: '#dc3545',
                      fontSize: 13,
                    }}
                  />
                  <ReferenceLine
                    y={buyPrice + buyPrice * 0.15}
                    stroke="#198754"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    label={{
                      value: `Target @ ${(buyPrice + buyPrice * 0.15).toFixed(2)}`,
                      position: 'right',
                      fill: '#198754',
                      fontSize: 13,
                    }}
                  />
                  <ReferenceLine
                    y={buyPrice - buyPrice * 0.05}
                    stroke="#fd7e14"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                    label={{
                      value: `Risk Sell @ ${(buyPrice - buyPrice * 0.05).toFixed(2)}`,
                      position: 'right',
                      fill: '#fd7e14',
                      fontSize: 13,
                    }}
                  />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CCardBody>
    </CCard>
  )
}

export default SellCompanyChart
