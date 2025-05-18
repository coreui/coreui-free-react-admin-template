import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CAlert,
  CSpinner
} from '@coreui/react'
import { useAuth } from "../../context/AuthContext"

// Google Apps Script Web App URL - Replace with your actual deployment URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxsBrKuKOlKJVvOCUR4dAxuKLfM3eGjw3rPZIcsLYNVD1lgTip6xcYJgBBf_yi7r9d3/exec'

const CustomerForm = () => {
  const location = useLocation()
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: '',
    lat: '',
    lng: '',
    preferredProducts: '',
    madeOrder: 'No',
    orderGMV: '0'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setFormData(f => ({
      ...f,
      name: decodeURIComponent(params.get('name') || ''),
      phone: decodeURIComponent(params.get('phone') || ''),
      notes: decodeURIComponent(params.get('notes') || ''),
      lat: params.get('lat') || '',
      lng: params.get('lng') || ''
    }))
  }, [location.search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      // Get current location
      let locationstamp = ''
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 10000,
              maximumAge: 0
            })
          })
          locationstamp = `${position.coords.latitude},${position.coords.longitude}`
        } catch (err) {
          console.warn('Failed to get location:', err)
          // Continue without location
        }
      }

      const formPayload = {
        ...formData,
        locationstamp,
        assignee: user.username // Add the current user as assignee
      }

      // Using fetch with no-cors mode and URL parameters
      const params = new URLSearchParams({
        name: formPayload.name,
        phone: formPayload.phone,
        notes: formPayload.notes,
        preferredProducts: formPayload.preferredProducts,
        madeOrder: formPayload.madeOrder,
        orderGMV: formPayload.orderGMV,
        lat: formPayload.lat,
        lng: formPayload.lng,
        locationstamp: formPayload.locationstamp,
        assignee: formPayload.assignee
      });

      const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      });

      // Since we're using no-cors, we won't get a JSON response
      // Instead, we'll assume success if the request didn't throw an error
      setSuccess(true);
      
      // Reset only certain fields
      setFormData(f => ({
        ...f,
        preferredProducts: '',
        madeOrder: 'No',
        orderGMV: '0'
      }))
    } catch (err) {
      console.error('Form submission error:', err)
      setError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={8} lg={6}>
        <CCard className="mb-4">
          <CCardHeader>Submit Customer Form</CCardHeader>
          <CCardBody>
            {success && (
              <CAlert color="success" dismissible>
                Form submitted successfully!
              </CAlert>
            )}
            {error && (
              <CAlert color="danger" dismissible>
                {error}
              </CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <CFormLabel htmlFor="name">Name</CFormLabel>
              <CFormInput
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                required
              />

              <CFormLabel htmlFor="phone" className="mt-3">Phone</CFormLabel>
              <CFormInput
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                required
              />

              <CFormLabel htmlFor="notes" className="mt-3">Notes</CFormLabel>
              <CFormInput
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={(e) => setFormData(f => ({ ...f, notes: e.target.value }))}
              />

              <CFormLabel htmlFor="preferredProducts" className="mt-3">Preferred Products</CFormLabel>
              <CFormInput
                id="preferredProducts"
                name="preferredProducts"
                value={formData.preferredProducts}
                onChange={(e) => setFormData(f => ({ ...f, preferredProducts: e.target.value }))}
              />

              <CFormLabel htmlFor="madeOrder" className="mt-3">Made an Order?</CFormLabel>
              <CFormSelect
                id="madeOrder"
                name="madeOrder"
                value={formData.madeOrder}
                onChange={(e) => setFormData(f => ({ ...f, madeOrder: e.target.value }))}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </CFormSelect>

              <CFormLabel htmlFor="orderGMV" className="mt-3">Created Order GMV</CFormLabel>
              <CFormInput
                id="orderGMV"
                name="orderGMV"
                type="number"
                min="0"
                value={formData.orderGMV}
                onChange={(e) => setFormData(f => ({ ...f, orderGMV: e.target.value }))}
              />

              <CFormLabel htmlFor="location" className="mt-3">Customer Location</CFormLabel>
              <CFormInput
                id="location"
                value={`${formData.lat}, ${formData.lng}`}
                readOnly
              />

              <div className="mt-4 d-flex justify-content-end">
                <CButton type="submit" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? <CSpinner size="sm" /> : 'Submit'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerForm
