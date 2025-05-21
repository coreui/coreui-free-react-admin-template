import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CButton,
  CAlert,
  CFormCheck,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'
import { eventApi } from 'src/services/api'
import { useNavigate, useParams } from 'react-router-dom'

const emptyEvent = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  time: '',
  location: '',
  venue: '',
  address: '',
  city: '',
  country: '',
  capacity: '',
  price: '',
  categoryId: '',
  featuredImage: '',
  status: 'draft',
  isPublic: true,
  isFeatured: false,
  showRemainingTickets: true,
  organizerId: '',
}

const EventForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(emptyEvent)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [categories, setCategories] = useState([])
  const [organizers, setOrganizers] = useState([])
  const isEditMode = !!id

  // Fetch event data if in edit mode
  useEffect(() => {
    const fetchEventData = async () => {
      if (isEditMode) {
        try {
          setLoading(true)
          const eventData = await eventApi.getEvent(id)
          setEvent(eventData)
        } catch (error) {
          setError('Failed to load event data. Please try again.')
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchEventData()
  }, [id, isEditMode])

  // Fetch categories and organizers on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await eventApi.getCategories()
        setCategories(categoriesData)
        
        // Placeholder for fetching organizers when that API is available
        // const organizersData = await userApi.getOrganizers()
        // setOrganizers(organizersData)
        
        // Mock organizer data for now
        setOrganizers([
          { id: '1', name: 'Main Organizer' },
          { id: '2', name: 'Partner Organization' },
        ])
      } catch (error) {
        console.error('Failed to fetch form data:', error)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setEvent({ ...event, [name]: checked })
    } else {
      setEvent({ ...event, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      setError(null)
      
      let result
      if (isEditMode) {
        result = await eventApi.updateEvent(id, event)
      } else {
        result = await eventApi.createEvent(event)
      }
      
      setSuccess(true)
      
      // Navigate back to events list after short delay
      setTimeout(() => {
        navigate('/events/list')
      }, 1500)
    } catch (error) {
      setError(error.message || 'Failed to save event. Please try again.')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center my-5">Loading event data...</div>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{isEditMode ? 'Edit Event' : 'Create New Event'}</strong>
          </CCardHeader>
          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && (
              <CAlert color="success">
                Event successfully {isEditMode ? 'updated' : 'created'}!
              </CAlert>
            )}
            
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={8}>
                  <CFormLabel htmlFor="name">Event Name</CFormLabel>
                  <CFormInput
                    id="name"
                    name="name"
                    value={event.name}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="status">Status</CFormLabel>
                  <CFormSelect
                    id="status"
                    name="status"
                    value={event.status}
                    onChange={handleInputChange}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    name="description"
                    rows={4}
                    value={event.description}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={4}>
                  <CFormLabel htmlFor="startDate">Start Date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={event.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="endDate">End Date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={event.endDate}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="time">Time</CFormLabel>
                  <CFormInput
                    id="time"
                    name="time"
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                    value={event.time}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="venue">Venue</CFormLabel>
                  <CFormInput
                    id="venue"
                    name="venue"
                    placeholder="Venue name"
                    value={event.venue}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="location">Location</CFormLabel>
                  <CFormInput
                    id="location"
                    name="location"
                    placeholder="e.g., Online or City name"
                    value={event.location}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="address">Address</CFormLabel>
                  <CFormInput
                    id="address"
                    name="address"
                    placeholder="Street address"
                    value={event.address}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="city">City</CFormLabel>
                  <CFormInput
                    id="city"
                    name="city"
                    value={event.city}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="country">Country</CFormLabel>
                  <CFormInput
                    id="country"
                    name="country"
                    value={event.country}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="capacity">Capacity</CFormLabel>
                  <CFormInput
                    type="number"
                    id="capacity"
                    name="capacity"
                    min="1"
                    value={event.capacity}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="price">Price</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>$</CInputGroupText>
                    <CFormInput
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={event.price}
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="categoryId">Category</CFormLabel>
                  <CFormSelect
                    id="categoryId"
                    name="categoryId"
                    value={event.categoryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="organizerId">Organizer</CFormLabel>
                  <CFormSelect
                    id="organizerId"
                    name="organizerId"
                    value={event.organizerId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an organizer</option>
                    {organizers.map(organizer => (
                      <option key={organizer.id} value={organizer.id}>
                        {organizer.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="featuredImage">Featured Image URL</CFormLabel>
                  <CFormInput
                    id="featuredImage"
                    name="featuredImage"
                    placeholder="https://example.com/image.jpg"
                    value={event.featuredImage}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-4">
                <CCol md={4}>
                  <CFormCheck 
                    id="isPublic"
                    name="isPublic"
                    label="Public Event"
                    checked={event.isPublic}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormCheck 
                    id="isFeatured"
                    name="isFeatured"
                    label="Featured Event"
                    checked={event.isFeatured}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormCheck 
                    id="showRemainingTickets"
                    name="showRemainingTickets"
                    label="Show Remaining Tickets"
                    checked={event.showRemainingTickets}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <div className="d-flex justify-content-end gap-2">
                <CButton 
                  color="secondary" 
                  variant="outline"
                  onClick={() => navigate('/events/list')}
                >
                  <CIcon icon={cilX} className="me-2" />
                  Cancel
                </CButton>
                <CButton 
                  type="submit" 
                  color="primary"
                  disabled={saving}
                >
                  <CIcon icon={cilSave} className="me-2" />
                  {saving ? 'Saving...' : isEditMode ? 'Update Event' : 'Create Event'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EventForm 