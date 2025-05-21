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
import { ticketApi, eventApi } from 'src/services/api'
import { Link, useNavigate } from 'react-router-dom'

const TicketsList = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [ticketTypes, setTicketTypes] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEvent, setFilterEvent] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Fetch tickets on component mount and when filters change
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const filters = {}
        if (searchTerm) filters.search = searchTerm
        if (filterEvent) filters.eventId = filterEvent
        if (filterType) filters.typeId = filterType
        if (filterStatus) filters.status = filterStatus

        const response = await ticketApi.getTickets(page, 10, filters)
        setTickets(response.data)
        setTotalPages(response.totalPages || 1)
      } catch (error) {
        console.error('Failed to fetch tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [page, searchTerm, filterEvent, filterType, filterStatus])

  // Fetch events and ticket types for filter dropdowns
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        // Get events for dropdown
        const eventsResponse = await eventApi.getEvents(1, 100, { status: 'published' })
        setEvents(eventsResponse.data || [])

        // Get ticket types for dropdown
        const typesResponse = await ticketApi.getTicketTypes()
        setTicketTypes(typesResponse || [])
      } catch (error) {
        console.error('Failed to fetch filter data:', error)
      }
    }

    fetchFilterData()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await ticketApi.deleteTicket(id)
        // Refresh tickets after deletion
        setTickets(tickets.filter(ticket => ticket.id !== id))
      } catch (error) {
        console.error('Failed to delete ticket:', error)
      }
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'available': { color: 'success', label: 'Available' },
      'reserved': { color: 'warning', label: 'Reserved' },
      'sold': { color: 'info', label: 'Sold' },
      'cancelled': { color: 'danger', label: 'Cancelled' },
      'checked-in': { color: 'primary', label: 'Checked In' },
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
            <strong>Tickets</strong>
            <CButton 
              color="primary" 
              className="float-end"
              onClick={() => navigate('/tickets/create')}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Create Ticket
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* Search and Filters */}
            <CForm onSubmit={handleSearch} className="mb-4">
              <CRow>
                <CCol md={3}>
                  <CFormInput
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormSelect 
                    value={filterEvent}
                    onChange={(e) => {
                      setFilterEvent(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Events</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CFormSelect 
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Types</option>
                    {ticketTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
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
                    <option value="">All Statuses</option>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="checked-in">Checked In</option>
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

            {/* Tickets Table */}
            {loading ? (
              <div className="text-center my-5">Loading tickets...</div>
            ) : (
              <>
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Ticket ID</CTableHeaderCell>
                      <CTableHeaderCell>Event</CTableHeaderCell>
                      <CTableHeaderCell>Type</CTableHeaderCell>
                      <CTableHeaderCell>Price</CTableHeaderCell>
                      <CTableHeaderCell>Buyer</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {tickets.length > 0 ? (
                      tickets.map(ticket => (
                        <CTableRow key={ticket.id}>
                          <CTableDataCell>
                            <div className="text-primary fw-bold">{ticket.ticketCode || ticket.id}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            {ticket.event?.name || 'N/A'}
                          </CTableDataCell>
                          <CTableDataCell>
                            {ticket.ticketType?.name || 'Standard'}
                          </CTableDataCell>
                          <CTableDataCell>
                            ${parseFloat(ticket.price).toFixed(2)}
                          </CTableDataCell>
                          <CTableDataCell>
                            {ticket.buyer ? (
                              <div>
                                <div>{ticket.buyer.name || ticket.buyer.email}</div>
                                <small className="text-muted">{ticket.purchaseDate && new Date(ticket.purchaseDate).toLocaleDateString()}</small>
                              </div>
                            ) : (
                              'Not sold'
                            )}
                          </CTableDataCell>
                          <CTableDataCell>
                            {getStatusBadge(ticket.status)}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CDropdown alignment="end">
                              <CDropdownToggle color="transparent" caret={false} className="p-0">
                                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                              </CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem 
                                  href={`/tickets/${ticket.id}`}
                                  component={Link}
                                >
                                  View Details
                                </CDropdownItem>
                                <CDropdownItem 
                                  href={`/tickets/edit/${ticket.id}`}
                                  component={Link}
                                >
                                  <CIcon icon={cilPencil} className="me-2" />
                                  Edit
                                </CDropdownItem>
                                <CDropdownItem 
                                  onClick={() => handleDelete(ticket.id)}
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
                          No tickets found
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

export default TicketsList 