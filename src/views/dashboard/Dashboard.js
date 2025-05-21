import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CWidgetStatsA,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsF,
  CBadge,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilGift, 
  cilMoney, 
  cilArrowTop, 
  cilArrowBottom,
  cilCalendar,
  cilClock,
} from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // In a real app, replace with actual API call
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('/api/dashboard')
    //     const data = await response.json()
    //     setDashboardData(data)
    //   } catch (err) {
    //     setError('Failed to load dashboard data')
    //     console.error(err)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    
    // Mock data for development
    const mockData = {
      totalUsers: 1250,
      activeUsers: 980,
      totalGifts: 4500,
      openedGifts: 3200,
      totalPoints: 1234500000,
      claimedPoints: 987600000,
      btcStatus: {
        btcGivenToday: true,
        lastRecipient: "user123",
        timestamp: "2023-10-21T14:30:22Z"
      },
      todayStats: {
        newUsers: 45,
        activeUsers: 320,
        giftsOpened: 189,
        pointsClaimed: 3450000
      },
      weeklyTrends: {
        users: [120, 95, 110, 85, 130, 150, 45],
        gifts: [410, 380, 420, 310, 350, 390, 189],
        points: [12500000, 9800000, 11200000, 8500000, 10200000, 9500000, 3450000]
      }
    }
    
    // Simulate API call
    setTimeout(() => {
      setDashboardData(mockData)
      setLoading(false)
    }, 800)
    
    // fetchData()
  }, [])
  
  // Format numbers for easier reading
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num
  }
  
  // Format points in Vietnamese Dong
  const formatVND = (points) => {
    return formatNumber(points) + ' VND'
  }
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }
  
  // Generate week labels (last 7 days)
  const generateWeekLabels = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toLocaleDateString('en-US', { weekday: 'short' }))
    }
    return days
  }

  if (loading) {
    return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>
  }

  if (error) {
    return <CAlert color="danger">{error}</CAlert>
  }

  return (
    <>
      {/* User and Gift Summary Widgets */}
      <CRow className="mb-4">
        <CCol sm={6} lg={3}>
          <CWidgetStatsC
            className="mb-3"
            icon={<CIcon icon={cilPeople} height={36} />}
            color="primary"
            title="Total Users"
            value={formatNumber(dashboardData.totalUsers)}
            progress={{ value: Math.round((dashboardData.activeUsers / dashboardData.totalUsers) * 100) }}
            text={`${formatNumber(dashboardData.activeUsers)} active users (${Math.round((dashboardData.activeUsers / dashboardData.totalUsers) * 100)}%)`}
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsC
            className="mb-3"
            icon={<CIcon icon={cilUser} height={36} />}
            color="info"
            title="Today's Active Users"
            value={formatNumber(dashboardData.todayStats.activeUsers)}
            progress={{ value: Math.round((dashboardData.todayStats.activeUsers / dashboardData.activeUsers) * 100) }}
            text={`${formatNumber(dashboardData.todayStats.newUsers)} new users today`}
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsC
            className="mb-3"
            icon={<CIcon icon={cilGift} height={36} />}
            color="warning"
            title="Total Gift Boxes"
            value={formatNumber(dashboardData.totalGifts)}
            progress={{ value: Math.round((dashboardData.openedGifts / dashboardData.totalGifts) * 100) }}
            text={`${formatNumber(dashboardData.openedGifts)} boxes opened (${Math.round((dashboardData.openedGifts / dashboardData.totalGifts) * 100)}%)`}
          />
            </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsC
            className="mb-3"
            icon={<CIcon icon={cilMoney} height={36} />}
            color="success"
            title="Total Points"
            value={formatVND(dashboardData.totalPoints)}
            progress={{ value: Math.round((dashboardData.claimedPoints / dashboardData.totalPoints) * 100) }}
            text={`${formatVND(dashboardData.claimedPoints)} points claimed (${Math.round((dashboardData.claimedPoints / dashboardData.totalPoints) * 100)}%)`}
          />
            </CCol>
          </CRow>

      {/* BTC Status and Today's Stats */}
      <CRow className="mb-4">
        <CCol lg={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>BTC Status</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex align-items-center mb-3">
                <h4 className="mb-0 me-3">
                  Today's BTC: 
                </h4>
                <CBadge color={dashboardData.btcStatus.btcGivenToday ? "success" : "warning"} shape="rounded-pill" className="px-3 py-2">
                  {dashboardData.btcStatus.btcGivenToday ? "Given" : "Not Given"}
                </CBadge>
              </div>
              {dashboardData.btcStatus.btcGivenToday && (
                <>
                  <div className="mb-2">
                    <strong>Last Recipient:</strong> {dashboardData.btcStatus.lastRecipient}
                  </div>
                  <div>
                    <strong>Time:</strong> {formatDate(dashboardData.btcStatus.timestamp)}
                  </div>
                </>
              )}
        </CCardBody>
          </CCard>
              </CCol>
        
        <CCol lg={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Today's Statistics</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={6} md={3}>
                  <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">New Users</div>
                    <div className="fs-5 fw-semibold">{formatNumber(dashboardData.todayStats.newUsers)}</div>
                      </div>
                    </CCol>
                
                <CCol sm={6} md={3}>
                  <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">Active Users</div>
                    <div className="fs-5 fw-semibold">{formatNumber(dashboardData.todayStats.activeUsers)}</div>
                    </div>
                </CCol>
                
                <CCol sm={6} md={3}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">Gifts Opened</div>
                    <div className="fs-5 fw-semibold">{formatNumber(dashboardData.todayStats.giftsOpened)}</div>
                      </div>
                    </CCol>
                
                <CCol sm={6} md={3}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">Points Claimed</div>
                    <div className="fs-5 fw-semibold">{formatVND(dashboardData.todayStats.pointsClaimed)}</div>
                    </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Weekly Trends */}
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Weekly Trends</strong>
          <small className="ms-2 text-medium-emphasis">Last 7 days</small>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs={12} md={4} className="mb-4">
              <h4>Users</h4>
              <CChart
                type="line"
                data={{
                  labels: generateWeekLabels(),
                  datasets: [
                    {
                      label: 'New Users',
                      backgroundColor: 'rgba(51, 153, 255, 0.2)',
                      borderColor: 'rgba(51, 153, 255, 1)',
                      pointBackgroundColor: 'rgba(51, 153, 255, 1)',
                      pointBorderColor: '#fff',
                      data: dashboardData.weeklyTrends.users,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        drawBorder: false,
                      },
                      ticks: {
                        stepSize: 50,
                      },
                    },
                  },
                }}
                style={{ height: '300px' }}
              />
            </CCol>
            <CCol xs={12} md={4} className="mb-4">
              <h4>Gift Boxes</h4>
              <CChart
                type="line"
                data={{
                  labels: generateWeekLabels(),
                  datasets: [
                    {
                      label: 'Gift Boxes Opened',
                      backgroundColor: 'rgba(255, 153, 0, 0.2)',
                      borderColor: 'rgba(255, 153, 0, 1)',
                      pointBackgroundColor: 'rgba(255, 153, 0, 1)',
                      pointBorderColor: '#fff',
                      data: dashboardData.weeklyTrends.gifts,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        drawBorder: false,
                      },
                      ticks: {
                        stepSize: 100,
                      },
                    },
                  },
                }}
                style={{ height: '300px' }}
              />
            </CCol>
            <CCol xs={12} md={4} className="mb-4">
              <h4>Points Claimed</h4>
              <CChart
                type="line"
                data={{
                  labels: generateWeekLabels(),
                  datasets: [
                    {
                      label: 'Points Claimed (VND)',
                      backgroundColor: 'rgba(40, 167, 69, 0.2)',
                      borderColor: 'rgba(40, 167, 69, 1)',
                      pointBackgroundColor: 'rgba(40, 167, 69, 1)',
                      pointBorderColor: '#fff',
                      data: dashboardData.weeklyTrends.points,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          let label = context.dataset.label || '';
                          if (label) {
                            label += ': ';
                          }
                          if (context.parsed.y !== null) {
                            label += formatVND(context.parsed.y);
                          }
                          return label;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        drawBorder: false,
                      },
                      ticks: {
                        callback: function(value) {
                          return formatVND(value);
                        }
                      },
                    },
                  },
                }}
                style={{ height: '300px' }}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
