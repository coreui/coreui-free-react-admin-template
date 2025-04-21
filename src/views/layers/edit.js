import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormCheck,
  CFormLabel,
  CSpinner,
  CAlert,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CContainer,
} from '@coreui/react'
import { cilArrowLeft, cilSave, cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axiosInstance from '../../utils/api/axiosConfig'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const EditLayer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isNewLayer = location.state?.isNew || false

  const [activeTab, setActiveTab] = useState('general')
  const [layer, setLayer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [layerData, setLayerData] = useState({
    isSearchable: true,
    isBackground: false,
    minZoom: 1,
    maxZoom: 16,
    color: '#3388ff',
    title: '',
    fields: [],
  })

  // Fetch layer data on component mount
  useEffect(() => {
    fetchLayerData()
  }, [id])

  // Display and clear alerts
  const showErrorAlert = (message) => {
    setError(message)
    setSuccess(null)
  }

  const showSuccessAlert = (message) => {
    setSuccess(message)
    setError(null)
  }

  // Clear alerts after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error, success])

  // Fetch layer data
  const fetchLayerData = async () => {
    if (!id) return

    setLoading(true)
    try {
      const response = await axiosInstance.get(`/layers/${id}`)
      setLayer(response.data)

      // Initialize layer data
      setLayerData({
        isSearchable: response.data.isSearchable !== undefined ? response.data.isSearchable : true,
        isBackground: response.data.isBackground !== undefined ? response.data.isBackground : false,
        minZoom: response.data.minZoom || 1,
        maxZoom: response.data.maxZoom || 16,
        color: response.data.color || '#3388ff',
        title: response.data.title || response.data.name || '',
        fields: response.data.fields
          ? response.data.fields.map((field) => ({
              ...field,
              title: field.title || field.name || '',
              isMandatory: field.isMandatory || false,
              isSearchable: field.isSearchable || false,
              isActive: field.isActive !== undefined ? field.isActive : true,
            }))
          : [],
      })

      setError(null)

      // Show success message for new layer
      if (isNewLayer) {
        showSuccessAlert('Layer successfully uploaded! Please finalize the configuration.')
      }
    } catch (err) {
      showErrorAlert(`Failed to fetch layer details: ${err.response?.data?.message || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Handle field change
  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...layerData.fields]
    updatedFields[index] = { ...updatedFields[index], [field]: value }

    setLayerData({
      ...layerData,
      fields: updatedFields,
    })
  }

  // Save or finalize layer
  const saveLayer = async () => {
    if (!layer) return

    setSaving(true)
    try {
      // Check if layer is in READY_FOR_CREATION status (needs finalization)
      if (layer.status === 'READY_FOR_CREATION') {
        await axiosInstance.post(`/layers/finalize/${layer.id}`, layerData)
        showSuccessAlert('Layer finalized successfully')
        navigate('/layers')
      } else {
        // Otherwise update the existing layer
        await axiosInstance.put(`/layers/${layer.id}`, layerData)
        showSuccessAlert('Layer updated successfully')
        navigate('/layers')
      }

      // Refresh layer data
      fetchLayerData()
    } catch (err) {
      showErrorAlert(`Save failed: ${err.response?.data?.error || err.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading && !layer) {
    return (
      <CContainer className="px-5 mt-4">
        <CCol>
          <div className="text-center my-5">
            <CSpinner />
            <p className="mt-3">Loading layer data...</p>
          </div>
        </CCol>
      </CContainer>
    )
  }

  return (
    <CContainer className="px-5 mt-4">
      <CCol>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>
              {layer?.status === 'READY_FOR_CREATION' ? 'Finalize Layer' : 'Edit Layer'}:{' '}
              {layer?.name}
            </strong>
            <CButton color="secondary" variant="outline" onClick={() => navigate('/layers')}>
              <CIcon icon={cilArrowLeft} className="me-2" />
              Back to Layers
            </CButton>
          </CCardHeader>

          <CCardBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}

            <CNav variant="tabs" className="mb-4">
              <CNavItem>
                <CNavLink
                  active={activeTab === 'general'}
                  onClick={() => setActiveTab('general')}
                  href="#"
                >
                  General Settings
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeTab === 'fields'}
                  onClick={() => setActiveTab('fields')}
                  href="#"
                >
                  Fields Configuration
                </CNavLink>
              </CNavItem>
            </CNav>

            <CTabContent>
              <CTabPane visible={activeTab === 'general'}>
                <CForm>
                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel>Layer Name</CFormLabel>
                        <CFormInput type="text" value={layer?.name || ''} disabled />
                      </div>

                      <div className="mb-3">
                        <CFormLabel>Layer Title </CFormLabel>
                        <CFormInput
                          type="text"
                          value={layerData.title}
                          onChange={(e) =>
                            setLayerData({
                              ...layerData,
                              title: e.target.value,
                            })
                          }
                          placeholder="Enter display title for users"
                        />
                      </div>

                      <div className="mb-3">
                        <CFormLabel>Status</CFormLabel>
                        <div>
                          <span
                            className={`badge ${layer?.status === 'CREATED' ? 'bg-success' : 'bg-warning'}`}
                          >
                            {layer?.status}
                          </span>
                        </div>
                      </div>
                    </CCol>

                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel>Layer ID</CFormLabel>
                        <CFormInput type="text" value={layer?.id || ''} disabled />
                      </div>
                      <div className="mb-3">
                        <CFormLabel style={{marginRight:"6px"}}>Is Searchable</CFormLabel>
                        <CFormCheck
                          checked={layerData.isSearchable}
                          onChange={(e) =>
                            setLayerData({
                              ...layerData,
                              isSearchable: e.target.checked,
                            })
                          }
                        />
                        <div className="form-text">Enable searching features in this layer</div>
                      </div>

                      <div className="mb-3">
                        <CFormLabel style={{marginRight:"6px"}}>Is Background Layer</CFormLabel>
                        <CFormCheck
                          checked={layerData.isBackground}
                          onChange={(e) =>
                            setLayerData({
                              ...layerData,
                              isBackground: e.target.checked,
                            })
                          }
                        />
                        <div className="form-text">
                          Background layers are always visible without needing to be selected
                        </div>
                      </div>

                      <div className="mb-3">
                        <CFormLabel>Layer Color</CFormLabel>
                        <CFormInput
                          type="color"
                          value={layerData.color}
                          onChange={(e) =>
                            setLayerData({
                              ...layerData,
                              color: e.target.value,
                            })
                          }
                        />
                       
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel>Min Zoom</CFormLabel>
                        <CFormInput
                          type="number"
                          min="1"
                          max="20"
                          value={layerData.minZoom}
                          onChange={(e) =>
                            setLayerData({
                              ...layerData,
                              minZoom: parseInt(e.target.value, 10) || 1,
                            })
                          }
                        />
                       
                      </div>
                    </CCol>

                    <CCol md={6}>
                      <div className="mb-3">
                        <CFormLabel>Max Zoom</CFormLabel>
                        <CFormInput
                          type="number"
                          min="1"
                          max="20"
                          value={layerData.maxZoom}
                          onChange={(e) =>
                            setLayerData({
                              ...layerData,
                              maxZoom: parseInt(e.target.value, 10) || 16,
                            })
                          }
                        />
                       
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CTabPane>

              <CTabPane visible={activeTab === 'fields'}>
                {layerData.fields.length > 0 ? (
                  layerData.fields.map((field, index) => (
                    <CCard key={index} className="mb-3 p-3">
                      <CRow>
                        <CCol md={6}>
                          <div className="mb-2">
                            <CFormLabel>Field Name</CFormLabel>
                            <CFormInput type="text" value={field.name || ''} onChange={(e) => handleFieldChange(index, 'name', e.target.value)}/> 
                          </div>
                        </CCol>

                        <CCol md={6}>
                          <div className="mb-2">
                            <CFormLabel>Field Type</CFormLabel>
                            <CFormInput type="text" value={field.type || ''} />
                          </div>
                        </CCol>
                        <CCol md={6}>
                          <div className="mb-2">
                            <CFormLabel>Field Title</CFormLabel>
                            <CFormInput type="text" value={field.title || ''} onChange={(e) => handleFieldChange(index, 'title', e.target.value)} />
                            
                          </div>
                        </CCol>
                      </CRow>

                      <CRow className="mt-2">
                        <CCol md={4}>
                          <div className="mb-1">
                            <CFormCheck
                              label="Is Mandatory"
                              checked={field.isMandatory || false}
                              onChange={(e) =>
                                handleFieldChange(index, 'isMandatory', e.target.checked)
                              }
                            />
                            <div className="form-text">Field is required when adding features</div>
                          </div>
                        </CCol>

                        <CCol md={4}>
                          <div className="mb-1">
                            <CFormCheck
                              label="Is Searchable"
                              checked={field.isSearchable || false}
                              onChange={(e) =>
                                handleFieldChange(index, 'isSearchable', e.target.checked)
                              }
                            />
                            <div className="form-text">Include this field in search operations</div>
                          </div>
                        </CCol>

                        <CCol md={4}>
                          <div className="mb-1">
                            <CFormCheck
                              label="Is Active"
                              checked={field.isActive !== undefined ? field.isActive : true}
                              onChange={(e) =>
                                handleFieldChange(index, 'isActive', e.target.checked)
                              }
                            />
                            <div className="form-text">
                              Display and use this field in the application
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </CCard>
                  ))
                ) : (
                  <div className="text-center text-muted my-3">
                    No fields available for this layer
                  </div>
                )}
              </CTabPane>
            </CTabContent>
          </CCardBody>

          <CCardFooter className="d-flex justify-content-end">
            <CButton
              color="secondary"
              className="me-2"
              onClick={() => navigate('/layers')}
              disabled={saving}
            >
              Cancel
            </CButton>
            <CButton
              color={layer?.status === 'READY_FOR_CREATION' ? 'success' : 'primary'}
              onClick={saveLayer}
              disabled={saving}
            >
              {saving ? (
                <>
                  <CSpinner size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <CIcon
                    icon={layer?.status === 'READY_FOR_CREATION' ? cilCheck : cilSave}
                    className="me-2"
                  />
                  {layer?.status === 'READY_FOR_CREATION' ? 'Finalize Layer' : 'Save Changes'}
                </>
              )}
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CContainer>
  )
}

export default EditLayer
