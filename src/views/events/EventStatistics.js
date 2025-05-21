import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormSelect,
  CForm,
  CFormInput,
  CBadge,
  CAlert,
  CSpinner,
  CPagination,
  CPaginationItem,
  CInputGroup,
  CInputGroupText,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  cilCloudDownload, 
  cilFilter, 
  cilSearch,
  cilPeople,
  cilUser,
  cilGift,
  cilMoney 
} from '@coreui/icons'
import { eventApi } from '../../services/api'
import { CSVLink } from 'react-csv'

// Component cho phần hiển thị thông tin tổng hợp
const SummaryCards = ({ summary }) => {
  // Format numbers for easier reading
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
  }

  // Format points in Vietnamese Dong
  const formatVND = (points) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0 
    }).format(points)
  }

  return (
    <CRow className="mb-4">
      <CCol sm={6} lg={2}>
        <CCard className="text-white bg-primary">
          <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                {formatNumber(summary.totalParticipants)}
              </div>
              <div>Total Participants</div>
            </div>
            <div className="dropdown">
              <CIcon icon={cilPeople} size="xl" />
            </div>
          </CCardBody>
          <CCardBody className="pt-0">
            <CProgress white thin value={100} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} lg={2}>
        <CCard className="text-white bg-info">
          <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                {formatNumber(summary.kycCompleted)}
              </div>
              <div>KYC Completed</div>
            </div>
            <div className="dropdown">
              <CIcon icon={cilUser} size="xl" />
            </div>
          </CCardBody>
          <CCardBody className="pt-0">
            <CProgress white thin value={(summary.kycCompleted / summary.totalParticipants) * 100} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} lg={3}>
        <CCard className="text-white bg-warning">
          <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                {formatNumber(summary.totalGifts)}
                <span className="fs-6 fw-normal ms-2">
                  (avg: {summary.averageGiftsPerUser})
                </span>
              </div>
              <div>Total Gifts</div>
            </div>
            <div className="dropdown">
              <CIcon icon={cilGift} size="xl" />
            </div>
          </CCardBody>
          <CCardBody className="pt-0">
            <CProgress white thin value={75} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} lg={5}>
        <CCard className="text-white bg-success">
          <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                {formatVND(summary.totalPoints)}
                <span className="fs-6 fw-normal ms-2">
                  (avg: {formatVND(summary.averagePointsPerUser)})
                </span>
              </div>
              <div>Total Points</div>
            </div>
            <div className="dropdown">
              <CIcon icon={cilMoney} size="xl" />
            </div>
          </CCardBody>
          <CCardBody className="pt-0">
            <CProgress white thin value={75} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

// Component cho phần tìm kiếm và lọc
const SearchAndFilters = ({ searchTerm, setSearchTerm, filters, handleFilterChange, handleSearch }) => {
  const resetFilters = () => {
    setSearchTerm('')
    handleFilterChange('isKyc', '')
    handleFilterChange('device', '')
    handleFilterChange('hasBtc', '')
  }

  return (
    <CForm onSubmit={handleSearch} className="mb-4">
      <CRow>
        <CCol md={4}>
          <CInputGroup>
            <CFormInput
              placeholder="Search by user ID or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CButton type="submit" color="primary">
              <CIcon icon={cilSearch} />
            </CButton>
          </CInputGroup>
        </CCol>
        <CCol md={8} className="d-flex gap-2 justify-content-end">
          <CFormSelect
            value={filters.isKyc}
            onChange={(e) => handleFilterChange('isKyc', e.target.value)}
            className="w-auto"
          >
            <option value="">All KYC Status</option>
            <option value="true">KYC Completed</option>
            <option value="false">KYC Not Completed</option>
          </CFormSelect>
          <CFormSelect
            value={filters.device}
            onChange={(e) => handleFilterChange('device', e.target.value)}
            className="w-auto"
          >
            <option value="">All Devices</option>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
          </CFormSelect>
          <CFormSelect
            value={filters.hasBtc}
            onChange={(e) => handleFilterChange('hasBtc', e.target.value)}
            className="w-auto"
          >
            <option value="">All BTC Status</option>
            <option value="true">BTC Given</option>
            <option value="false">BTC Not Given</option>
          </CFormSelect>
          <CButton 
            type="button" 
            color="secondary"
            onClick={resetFilters}
          >
            Clear Filters
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

// Component cho phần bảng dữ liệu
const StatisticsTable = ({ records, formatDate, formatVND }) => {
  return (
    <CTable hover responsive bordered className="mb-3">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>User ID</CTableHeaderCell>
          <CTableHeaderCell>Email</CTableHeaderCell>
          <CTableHeaderCell>IP Address</CTableHeaderCell>
          <CTableHeaderCell>Device</CTableHeaderCell>
          <CTableHeaderCell>KYC Status</CTableHeaderCell>
          <CTableHeaderCell>Referral Code</CTableHeaderCell>
          <CTableHeaderCell>Gifts</CTableHeaderCell>
          <CTableHeaderCell>Points</CTableHeaderCell>
          <CTableHeaderCell>BTC Given</CTableHeaderCell>
          <CTableHeaderCell>Last Active</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {records.length > 0 ? (
          records.map((record, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{record.userId}</CTableDataCell>
              <CTableDataCell>{record.email}</CTableDataCell>
              <CTableDataCell>{record.ip_registered}</CTableDataCell>
              <CTableDataCell>
                <CBadge color={
                  record.device === 'mobile' ? 'info' : 
                  record.device === 'desktop' ? 'primary' : 
                  'secondary'
                }>
                  {record.device}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <CBadge color={record.is_kyc ? 'success' : 'warning'}>
                  {record.is_kyc ? 'Completed' : 'Not Completed'}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>{record.referral_code}</CTableDataCell>
              <CTableDataCell>{record.gifts}</CTableDataCell>
              <CTableDataCell>{formatVND(record.points)}</CTableDataCell>
              <CTableDataCell>
                <CBadge color={record.btcGiven ? 'success' : 'danger'}>
                  {record.btcGiven ? 'Yes' : 'No'}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>{formatDate(record.lastActive)}</CTableDataCell>
            </CTableRow>
          ))
        ) : (
          <CTableRow>
            <CTableDataCell colSpan={10} className="text-center">
              No records found
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}

// Component cho phân trang
const PaginationComponent = ({ pagination, page, handlePageChange, formatNumber }) => {
  if (pagination.totalPages <= 1) return null;

  return (
    <>
      <div className="d-flex justify-content-center">
        <CPagination>
          <CPaginationItem 
            disabled={page === 1} 
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </CPaginationItem>
          
          {[...Array(Math.min(5, pagination.totalPages)).keys()].map((i) => {
            // Show 5 pages around current page
            let pageNum
            if (page <= 3) {
              pageNum = i + 1
            } else if (page >= pagination.totalPages - 2) {
              pageNum = pagination.totalPages - 4 + i
            } else {
              pageNum = page - 2 + i
            }
            
            if (pageNum > 0 && pageNum <= pagination.totalPages) {
              return (
                <CPaginationItem 
                  key={pageNum} 
                  active={pageNum === page}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </CPaginationItem>
              )
            }
            return null
          })}
          
          {pagination.totalPages > 5 && page < pagination.totalPages - 2 && (
            <>
              <CPaginationItem disabled>...</CPaginationItem>
              <CPaginationItem onClick={() => handlePageChange(pagination.totalPages)}>
                {pagination.totalPages}
              </CPaginationItem>
            </>
          )}
          
          <CPaginationItem 
            disabled={page === pagination.totalPages} 
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </CPaginationItem>
        </CPagination>
      </div>
      
      <div className="text-center text-muted mt-2">
        Showing {((page - 1) * pagination.pageSize) + 1} to {Math.min(page * pagination.pageSize, pagination.total)} of {formatNumber(pagination.total)} entries
      </div>
    </>
  )
}

// Component chính
const EventStatistics = () => {
  // State
  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    isKyc: '',
    device: '',
    hasBtc: ''
  })

  // Fetch statistics and records
  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true)
      try {
        // Sẵn sàng cho API thực tế:
        // const response = await eventApi.getEventParticipationStatistics(page, searchTerm, filters)
        // setStatistics(response)
        
        // Mock data for demonstration
        const mockData = getMockData(page)
        
        setTimeout(() => {
          setStatistics(mockData)
          setLoading(false)
        }, 800)
        
      } catch (err) {
        setError('Failed to load statistics. Please try again later.')
        setLoading(false)
        console.error(err)
      }
    }

    fetchStatistics()
  }, [page, searchTerm, filters])

  // Hàm tạo dữ liệu giả cho demo
  const getMockData = (currentPage) => {
    return {
      records: [
        {
          userId: "user123",
          email: "user123@example.com",
          ip_registered: "192.168.1.1",
          device: "mobile",
          is_kyc: true,
          referral_code: "REF123",
          gifts: 5,
          points: 250000,
          btcGiven: false,
          lastActive: "2023-10-21T15:30:00Z"
        },
        {
          userId: "user456",
          email: "user456@example.com",
          ip_registered: "192.168.1.2",
          device: "desktop",
          is_kyc: false,
          referral_code: "REF456",
          gifts: 3,
          points: 150000,
          btcGiven: true,
          lastActive: "2023-10-20T10:15:00Z"
        },
        {
          userId: "user789",
          email: "user789@example.com",
          ip_registered: "192.168.1.3",
          device: "tablet",
          is_kyc: true,
          referral_code: "REF789",
          gifts: 8,
          points: 400000,
          btcGiven: false,
          lastActive: "2023-10-21T08:45:00Z"
        },
        {
          userId: "user101",
          email: "user101@example.com",
          ip_registered: "192.168.1.4",
          device: "mobile",
          is_kyc: false,
          referral_code: "REF101",
          gifts: 2,
          points: 100000,
          btcGiven: false,
          lastActive: "2023-10-19T14:20:00Z"
        },
        {
          userId: "user202",
          email: "user202@example.com",
          ip_registered: "192.168.1.5",
          device: "desktop",
          is_kyc: true,
          referral_code: "REF202",
          gifts: 10,
          points: 500000,
          btcGiven: true,
          lastActive: "2023-10-21T12:10:00Z"
        },
        {
          userId: "user303",
          email: "user303@example.com",
          ip_registered: "192.168.1.6",
          device: "mobile",
          is_kyc: false,
          referral_code: "REF303",
          gifts: 1,
          points: 50000,
          btcGiven: false,
          lastActive: "2023-10-18T09:30:00Z"
        },
        {
          userId: "user404",
          email: "user404@example.com",
          ip_registered: "192.168.1.7",
          device: "desktop",
          is_kyc: true,
          referral_code: "REF404",
          gifts: 6,
          points: 300000,
          btcGiven: false,
          lastActive: "2023-10-20T16:45:00Z"
        },
        {
          userId: "user505",
          email: "user505@example.com",
          ip_registered: "192.168.1.8",
          device: "mobile",
          is_kyc: true,
          referral_code: "REF505",
          gifts: 4,
          points: 200000,
          btcGiven: true,
          lastActive: "2023-10-21T11:25:00Z"
        },
        {
          userId: "user606",
          email: "user606@example.com",
          ip_registered: "192.168.1.9",
          device: "tablet",
          is_kyc: false,
          referral_code: "REF606",
          gifts: 2,
          points: 100000,
          btcGiven: false,
          lastActive: "2023-10-19T13:15:00Z"
        },
        {
          userId: "user707",
          email: "user707@example.com",
          ip_registered: "192.168.1.10",
          device: "desktop",
          is_kyc: true,
          referral_code: "REF707",
          gifts: 7,
          points: 350000,
          btcGiven: false,
          lastActive: "2023-10-20T08:50:00Z"
        }
      ],
      pagination: {
        total: 1250,
        page: currentPage,
        pageSize: 10,
        totalPages: 125
      },
      summary: {
        totalParticipants: 1250,
        kycCompleted: 450,
        totalGifts: 4500,
        averageGiftsPerUser: 3.6,
        totalPoints: 1234500000,
        averagePointsPerUser: 987600
      }
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  // Format numbers for easier reading
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
  }

  // Format points in Vietnamese Dong
  const formatVND = (points) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0 
    }).format(points)
  }

  // Handle pagination change
  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

  // Handle filter change
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
    setPage(1) // Reset to first page on filter change
  }

  // Prepare data for CSV export
  const prepareExportData = () => {
    if (!statistics) return []

    const headers = [
      ['Event Participation Statistics Report'],
      ['Generated on:', new Date().toLocaleString()],
      [''],
      ['Summary'],
      ['Total Participants:', statistics.summary.totalParticipants],
      ['KYC Completed:', `${statistics.summary.kycCompleted} (${(statistics.summary.kycCompleted / statistics.summary.totalParticipants * 100).toFixed(1)}%)`],
      ['Total Gifts:', statistics.summary.totalGifts],
      ['Average Gifts per User:', statistics.summary.averageGiftsPerUser],
      ['Total Points:', statistics.summary.totalPoints],
      ['Average Points per User:', statistics.summary.averagePointsPerUser],
      [''],
      ['Participant Records'],
      ['User ID', 'Email', 'IP Address', 'Device', 'KYC Status', 'Referral Code', 'Gifts', 'Points', 'BTC Given', 'Last Active']
    ]

    const rows = statistics.records.map(record => [
      record.userId,
      record.email,
      record.ip_registered,
      record.device,
      record.is_kyc ? 'Completed' : 'Not Completed',
      record.referral_code,
      record.gifts,
      record.points,
      record.btcGiven ? 'Yes' : 'No',
      formatDate(record.lastActive)
    ])

    return [...headers, ...rows]
  }

  // Render hàm chính
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Event Participation Statistics</strong>
            <div className="float-end">
              {statistics && (
                <CSVLink 
                  data={prepareExportData()} 
                  filename={`event-participation-statistics-${new Date().toISOString().slice(0, 10)}.csv`}
                  className="btn btn-success"
                >
                  <CIcon icon={cilCloudDownload} className="me-2" />
                  Export to CSV
                </CSVLink>
              )}
            </div>
          </CCardHeader>
          
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}

            {loading && !statistics ? (
              <div className="text-center my-5">
                <CSpinner />
                <p className="mt-3">Loading statistics...</p>
              </div>
            ) : statistics ? (
              <>
                {/* Summary Cards Component */}
                <SummaryCards summary={statistics.summary} />

                {/* Search & Filters Component */}
                <SearchAndFilters 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                  handleSearch={handleSearch}
                />

                {/* Records Table Component */}
                <StatisticsTable 
                  records={statistics.records} 
                  formatDate={formatDate} 
                  formatVND={formatVND} 
                />

                {/* Pagination Component */}
                <PaginationComponent 
                  pagination={statistics.pagination}
                  page={page}
                  handlePageChange={handlePageChange}
                  formatNumber={formatNumber}
                />
              </>
            ) : (
              <CAlert color="warning">No data available</CAlert>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EventStatistics 