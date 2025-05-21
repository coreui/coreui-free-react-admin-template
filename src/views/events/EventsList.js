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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilPencil, cilTrash, cilPlus, cilSearch } from '@coreui/icons'
import { eventApi } from 'src/services/api'
import { Link, useNavigate } from 'react-router-dom'

const EventsList = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Fetch events on component mount and when filters change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const filters = {}
        if (searchTerm) filters.search = searchTerm
        if (filterCategory) filters.category = filterCategory
        if (filterStatus) filters.status = filterStatus

        const response = await eventApi.getEvents(page, 10, filters)
        setEvents(response.data)
        setTotalPages(response.totalPages || 1)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [page, searchTerm, filterCategory, filterStatus])

  // Fetch categories for filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await eventApi.getCategories()
        setCategories(response)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventApi.deleteEvent(id)
        // Refresh events after deletion
        setEvents(events.filter(event => event.id !== id))
      } catch (error) {
        console.error('Failed to delete event:', error)
      }
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'draft': { color: 'secondary', label: 'Draft' },
      'published': { color: 'success', label: 'Published' },
      'cancelled': { color: 'danger', label: 'Cancelled' },
      'completed': { color: 'info', label: 'Completed' },
    }
    
    const statusInfo = statusMap[status] || { color: 'light', label: status }
    
    return (
      <CBadge color={statusInfo.color}>{statusInfo.label}</CBadge>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Events</strong>
            <CButton 
              color="primary" 
              className="float-end"
              onClick={() => navigate('/events/create')}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Create Event
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* Search and Filters */}
            <CForm onSubmit={handleSearch} className="mb-4">
              <CRow>
                <CCol md={4}>
                  <CFormInput
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormSelect 
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
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

            {/* Events Table */}
            {loading ? (
              <div className="text-center my-5">Loading events...</div>
            ) : (
              <>
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Event Name</CTableHeaderCell>
                      <CTableHeaderCell>Date</CTableHeaderCell>
                      <CTableHeaderCell>Location</CTableHeaderCell>
                      <CTableHeaderCell>Category</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {events.length > 0 ? (
                      events.map(event => (
                        <CTableRow key={event.id}>
                          <CTableDataCell>
                            <div className="fw-bold">{event.name}</div>
                            <small className="text-muted">ID: {event.id}</small>
                          </CTableDataCell>
                          <CTableDataCell>
                            {new Date(event.startDate).toLocaleDateString()}{' '}
                            {event.endDate && <>- {new Date(event.endDate).toLocaleDateString()}</>}
                            <div><small className="text-muted">{event.time}</small></div>
                          </CTableDataCell>
                          <CTableDataCell>{event.location}</CTableDataCell>
                          <CTableDataCell>
                            {event.category ? event.category.name : 'N/A'}
                          </CTableDataCell>
                          <CTableDataCell>
                            {getStatusBadge(event.status)}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CDropdown alignment="end">
                              <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                              </CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem 
                                  href={`/events/${event.id}`}
                                  component={Link}
                                >
                                  View Details
                                </CDropdownItem>
                                <CDropdownItem 
                                  href={`/events/edit/${event.id}`}
                                  component={Link}
                                >
                                  <CIcon icon={cilPencil} className="me-2" />
                                  Edit
                                </CDropdownItem>
                                <CDropdownItem 
                                  onClick={() => handleDelete(event.id)}
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
                        <CTableDataCell colSpan="6" className="text-center py-5">
                          No events found
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

export default EventsList 