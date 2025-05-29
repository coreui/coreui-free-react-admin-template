import React, { useState, useEffect } from 'react'
import axios from '../axiosConfig'
import { AppFooter, AppHeader } from '../index'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const StockSummary = () => {
  const url = process.env.REACT_APP_API_URL
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(Number(number || 0).toFixed(2))
  }

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(url + 'stock/investment-summary')
        if (response.data) {
          setSummary(response.data)
        }
      } catch (error) {
        console.error('Error fetching summary:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [url])

  if (loading) {
    return <div>Loading...</div>
  }

  const totalProfit = summary.total_profit
  const targetProfit = summary.targetProfit
  const remaining = Math.max(targetProfit - totalProfit, 0)

  const donutData = {
    labels: ['Achieved', 'Remaining'],
    datasets: [
      {
        data: [totalProfit, remaining],
        backgroundColor: ['#28a745', '#e0e0e0'],
        borderWidth: 1,
        cutout: '75%',
        rotation: -90,
        circumference: 180,
      },
    ],
  }

  const donutOptions = {
    animation: {
      animateRotate: true,
      duration: 1000,
      easing: 'easeOutBounce',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${formatNumber(ctx.raw)} USD`,
        },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <CRow>
              <CCol sm={6} lg={2}>
                <CCard className="mb-3 border border-secondary">
                  <CCardBody style={{ padding: '2px' }}>
                    <div style={{ position: 'relative', height: 84 }}>
                      <Doughnut data={donutData} options={donutOptions} />
                      <div
                        style={{
                          position: 'absolute',
                          top: '65%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: '13px',
                        }}
                      >
                        {formatNumber(totalProfit)} /<br />
                        {formatNumber(targetProfit)} USD
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm={6} lg={2}>
                <CCard color="primary" textColor="white" className="mb-3">
                  <CCardBody>
                    <CCardTitle>Total Profit</CCardTitle>
                    <CCardText>{formatNumber(totalProfit)} USD</CCardText>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol sm={6} lg={2}>
                <CCard color="success" textColor="white" className="mb-3">
                  <CCardBody>
                    <CCardTitle>Total Investment</CCardTitle>
                    <CCardText>{formatNumber(summary?.total_investment)} USD</CCardText>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol sm={6} lg={2}>
                <CCard color="info" textColor="white" className="mb-3">
                  <CCardBody>
                    <CCardTitle>In Stock</CCardTitle>
                    <CCardText>{formatNumber(summary?.inStock)} USD</CCardText>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol sm={6} lg={2}>
                <CCard color="danger" textColor="white" className="mb-3">
                  <CCardBody>
                    <CCardTitle>Cash Out</CCardTitle>
                    <CCardText>{formatNumber(summary?.cash_out)} USD</CCardText>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol sm={6} lg={2}>
                <CCard color="warning" textColor="white" className="mb-3">
                  <CCardBody>
                    <CCardTitle>Available at Wallet</CCardTitle>
                    <CCardText>{formatNumber(summary?.available_at_wallet)} USD</CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default StockSummary
