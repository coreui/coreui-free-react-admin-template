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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
  CFormInput,
  CForm,
  CFormSelect,
  CPagination,
  CPaginationItem,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilPencil, cilTrash, cilPlus, cilSearch } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'

// Mock data for gift baskets
const mockBaskets = [
  {
    id: 1,
    name: 'Premium Gift Basket',
    description: 'A luxury gift basket with premium items',
    basePrice: 99.99,
    totalItems: 10,
    probability: 0.05,
    status: 'active',
    createdAt: '2023-06-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Standard Gift Basket',
    description: 'A balanced gift basket with standard items',
    basePrice: 49.99,
    totalItems: 8,
    probability: 0.15,
    status: 'active',
    createdAt: '2023-07-20T14:20:00Z',
  },
  {
    id: 3,
    name: 'Basic Gift Basket',
    description: 'An affordable gift basket with essential items',
    basePrice: 29.99,
    totalItems: 6,
    probability: 0.30,
    status: 'active',
    createdAt: '2023-08-05T11:45:00Z',
  },
  {
    id: 4,
    name: 'Seasonal Special',
    description: 'Limited-time seasonal gift basket',
    basePrice: 69.99,
    totalItems: 12,
    probability: 0.10,
    status: 'inactive',
    createdAt: '2023-09-01T09:15:00Z',
  },
]

const GiftBasketsList = () => {
  const navigate = useNavigate()
  const [baskets, setBaskets] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPriceRange, setFilterPriceRange] = useState('')

  // Load mock data on component mount
  useEffect(() => {
    const fetchBaskets = () => {
      setLoading(true)
      
      // Filter mock data based on filters
      let filtered = [...mockBaskets]
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(basket => 
          basket.name.toLowerCase().includes(term) ||
          basket.description.toLowerCase().includes(term)
        )
      }
      
      if (filterStatus) {
        filtered = filtered.filter(basket => basket.status === filterStatus)
      }
      
      if (filterPriceRange) {
        switch (filterPriceRange) {
          case 'under30':
            filtered = filtered.filter(basket => basket.basePrice < 30)
            break
          case '30to50':
            filtered = filtered.filter(basket => basket.basePrice >= 30 && basket.basePrice <= 50)
            break
          case '50to100':
            filtered = filtered.filter(basket => basket.basePrice > 50 && basket.basePrice <= 100)
            break
          case 'over100':
            filtered = filtered.filter(basket => basket.basePrice > 100)
            break
          default:
            break
        }
      }
      
      setBaskets(filtered)
      setTotalPages(Math.max(1, Math.ceil(filtered.length / 10)))
      setLoading(false)
    }

    fetchBaskets()
  }, [searchTerm, filterStatus, filterPriceRange])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gift basket?')) {
      // For mock data, just filter out the deleted basket
      setBaskets(baskets.filter(basket => basket.id !== id))
    }
  }

  const getStatusBadge = (status) => {
    return status === 'active' ? 
      <CBadge color="success">Active</CBadge> : 
      <CBadge color="secondary">Inactive</CBadge>
  }

  const getProbabilityBadge = (probability) => {
    const percentage = probability * 100
    let color = 'success'
    
    if (percentage < 10) color = 'danger'
    else if (percentage < 20) color = 'warning'
    
    return (
      <div>
        <div className="small text-medium-emphasis">{percentage.toFixed(1)}%</div>
        <CProgress thin color={color} value={percentage} />
      </div>
    )
  }

  // Get paginated baskets
  const paginatedBaskets = baskets.slice((page - 1) * 10, page * 10)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Gift Baskets</strong>
            <CButton 
              color="primary" 
              className="float-end"
              onClick={() => navigate('/gift-baskets/create')}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Create Basket
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* Search and Filters */}
            <CForm onSubmit={handleSearch} className="mb-4">
              <CRow>
                <CCol md={5}>
                  <CFormInput
                    type="text"
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormSelect 
                    value={filterPriceRange}
                    onChange={(e) => {
                      setFilterPriceRange(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Price Ranges</option>
                    <option value="under30">Under $30</option>
                    <option value="30to50">$30 - $50</option>
                    <option value="50to100">$50 - $100</option>
                    <option value="over100">Over $100</option>
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CButton type="submit" color="primary" className="w-100">
                    <CIcon icon={cilSearch} className="me-2" />
                    Search
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Gift Baskets Table */}
            {loading ? (
              <div className="text-center my-5">Loading gift baskets...</div>
            ) : (
              <>
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Description</CTableHeaderCell>
                      <CTableHeaderCell>Price</CTableHeaderCell>
                      <CTableHeaderCell>Items</CTableHeaderCell>
                      <CTableHeaderCell>Probability</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {paginatedBaskets.length > 0 ? (
                      paginatedBaskets.map(basket => (
                        <CTableRow key={basket.id}>
                          <CTableDataCell>
                            <div className="fw-bold">{basket.name}</div>
                            <small className="text-muted">ID: {basket.id}</small>
                          </CTableDataCell>
                          <CTableDataCell>
                            {basket.description}
                          </CTableDataCell>
                          <CTableDataCell>
                            ${basket.basePrice.toFixed(2)}
                          </CTableDataCell>
                          <CTableDataCell>
                            {basket.totalItems}
                          </CTableDataCell>
                          <CTableDataCell>
                            {getProbabilityBadge(basket.probability)}
                          </CTableDataCell>
                          <CTableDataCell>
                            {getStatusBadge(basket.status)}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CDropdown alignment="end">
                              <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                              </CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem 
                                  href={`/gift-baskets/${basket.id}`}
                                  component={Link}
                                >
                                  View Details
                                </CDropdownItem>
                                <CDropdownItem 
                                  href={`/gift-baskets/edit/${basket.id}`}
                                  component={Link}
                                >
                                  <CIcon icon={cilPencil} className="me-2" />
                                  Edit
                                </CDropdownItem>
                                <CDropdownItem 
                                  onClick={() => handleDelete(basket.id)}
                                  style={{ color: 'red' }}
                                >
                                  <CIcon icon={cilTrash} className="me-2" />
                                  Delete
                                </CDropdownItem>
                              </CDropdownMenu>
                            </CDropdown>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center py-5">
                          No gift baskets found
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>

                {/* Pagination */}
                {totalPages > 1 && (
                  <CPagination align="center" className="mt-4">
                    <CPaginationItem 
                      disabled={page === 1} 
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </CPaginationItem>
                    
                    {[...Array(totalPages).keys()].map(number => (
                      <CPaginationItem
                        key={number + 1}
                        active={page === number + 1}
                        onClick={() => setPage(number + 1)}
                      >
                        {number + 1}
                      </CPaginationItem>
                    ))}
                    
                    <CPaginationItem 
                      disabled={page === totalPages} 
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </CPaginationItem>
                  </CPagination>
                )}
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GiftBasketsList 