import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormSelect,
  CForm,
  CFormInput,
  CBadge,
  CAlert,
  CSpinner,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilFilter, cilSearch, cilCalendar } from '@coreui/icons'
import { eventApi } from '../../services/api'
import { CSVLink } from 'react-csv'

// Component cho phần tìm kiếm và lọc
const SearchAndFilters = ({ searchTerm, setSearchTerm, dateRange, setDateRange, handleSearch }) => {
  return (
    <CForm onSubmit={handleSearch} className="mb-4">
      <CRow>
        <CCol md={3}>
          <CInputGroup className="mb-3">
            <CFormInput
              placeholder="Search by User ID or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CButton type="submit" color="primary">
              <CIcon icon={cilSearch} />
            </CButton>
          </CInputGroup>
        </CCol>
        <CCol md={3}>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilCalendar} />
            </CInputGroupText>
            <CFormInput
              type="date"
              placeholder="Start Date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
          </CInputGroup>
        </CCol>
        <CCol md={3}>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilCalendar} />
            </CInputGroupText>
            <CFormInput
              type="date"
              placeholder="End Date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </CInputGroup>
        </CCol>
        <CCol md={3}>
          <CButton type="submit" color="primary" className="w-100">
            Generate Report
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

// Component cho bảng báo cáo
const ReportTable = ({ reportData, formatDate }) => {
  return (
    <CTable bordered responsive hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Date Export</CTableHeaderCell>
          <CTableHeaderCell>User ID</CTableHeaderCell>
          <CTableHeaderCell>Email</CTableHeaderCell>
          <CTableHeaderCell>KYC</CTableHeaderCell>
          <CTableHeaderCell>Tổng ref</CTableHeaderCell>
          <CTableHeaderCell>reffereId</CTableHeaderCell>
          <CTableHeaderCell>Ref success KYC</CTableHeaderCell>
          <CTableHeaderCell>total Luckybox</CTableHeaderCell>
          <CTableHeaderCell>total Luckybox claim</CTableHeaderCell>
          <CTableHeaderCell>IP claim luckybox</CTableHeaderCell>
          <CTableHeaderCell>Total reward (usdt)</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {reportData.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{formatDate(item.exportDate)}</CTableDataCell>
            <CTableDataCell>{item.userId}</CTableDataCell>
            <CTableDataCell>{item.email}</CTableDataCell>
            <CTableDataCell>
              <CBadge color={item.kyc ? 'success' : 'warning'}>
                {item.kyc ? 'Completed' : 'Not Completed'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>{item.totalRef}</CTableDataCell>
            <CTableDataCell>{item.referrerId || '-'}</CTableDataCell>
            <CTableDataCell>{item.refSuccessKYC}</CTableDataCell>
            <CTableDataCell>{item.totalLuckybox}</CTableDataCell>
            <CTableDataCell>{item.totalLuckyboxClaim}</CTableDataCell>
            <CTableDataCell>{item.ipClaimLuckybox}</CTableDataCell>
            <CTableDataCell>{item.totalRewardUSDT.toFixed(2)}</CTableDataCell>
          </CTableRow>
        ))}
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
const EventReport = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    totalPages: 0
  })

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  // Format numbers for easier reading
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
  }

  // Handle search and generate report
  const handleSearch = (e) => {
    e.preventDefault()
    generateReport()
  }

  // Handle pagination change
  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  // Generate report
  const generateReport = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // In a real app, replace with actual API call:
      // const response = await eventApi.getEventReport(page, searchTerm, dateRange)
      
      // Mock data for demonstration
      const mockData = getMockReportData()
      
      setTimeout(() => {
        setReportData(mockData.data)
        setPagination({
          total: mockData.total,
          pageSize: 10,
          totalPages: Math.ceil(mockData.total / 10)
        })
        setLoading(false)
      }, 800)
      
    } catch (err) {
      setError('Failed to generate report. Please try again later.')
      setLoading(false)
      console.error(err)
    }
  }

  // Generate mock data
  const getMockReportData = () => {
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        exportDate: new Date().toISOString(),
        userId: `user${1000 + i}`,
        email: `user${1000 + i}@example.com`,
        kyc: Math.random() > 0.3,
        totalRef: Math.floor(Math.random() * 20),
        referrerId: Math.random() > 0.2 ? `user${900 + Math.floor(Math.random() * 100)}` : null,
        refSuccessKYC: Math.floor(Math.random() * 10),
        totalLuckybox: Math.floor(Math.random() * 15) + 5,
        totalLuckyboxClaim: Math.floor(Math.random() * 10),
        ipClaimLuckybox: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        totalRewardUSDT: Math.random() * 100
      })
    }
    
    return {
      data,
      total: 256
    }
  }

  // Prepare data for CSV export
  const prepareExportData = () => {
    if (!reportData) return []

    const headers = [
      ['Date Export', 'User ID', 'Email', 'KYC', 'Tổng ref', 'reffereId', 'Ref success KYC', 'total Luckybox', 'total Luckybox claim', 'IP claim luckybox', 'Total reward (usdt)']
    ]

    const rows = reportData.map(item => [
      formatDate(item.exportDate),
      item.userId,
      item.email,
      item.kyc ? 'Completed' : 'Not Completed',
      item.totalRef,
      item.referrerId || '-',
      item.refSuccessKYC,
      item.totalLuckybox,
      item.totalLuckyboxClaim,
      item.ipClaimLuckybox,
      item.totalRewardUSDT.toFixed(2)
    ])

    return [...headers, ...rows]
  }

  // Load initial data
  useEffect(() => {
    generateReport()
  }, [page])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Event Report</strong>
            <div className="float-end">
              {reportData && (
                <CSVLink 
                  data={prepareExportData()} 
                  filename={`event-report-${new Date().toISOString().slice(0, 10)}.csv`}
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

            {/* Search & Filters Component */}
            <SearchAndFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              dateRange={dateRange}
              setDateRange={setDateRange}
              handleSearch={handleSearch}
            />

            {loading ? (
              <div className="text-center my-5">
                <CSpinner />
                <p className="mt-3">Generating report...</p>
              </div>
            ) : reportData ? (
              <>
                {/* Report Table Component */}
                <ReportTable 
                  reportData={reportData} 
                  formatDate={formatDate} 
                />

                {/* Pagination Component */}
                <PaginationComponent 
                  pagination={pagination}
                  page={page}
                  handlePageChange={handlePageChange}
                  formatNumber={formatNumber}
                />
              </>
            ) : (
              <CAlert color="info">
                Use the filters above to generate a report
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EventReport 