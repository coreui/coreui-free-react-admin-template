import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CInputGroup,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CContainer,
  CFormSelect,
  CTooltip,
  CProgress
} from '@coreui/react'
import { cilCloudUpload, cilTrash, cilSearch, cilCheck, cilCloudDownload, cilWarning, cilReload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axiosInstance from '../../utils/api/axiosConfig'
import { useNavigate } from 'react-router-dom'

const WmsLayerManagement = () => {
  const [layers, setLayers] = useState([])
  const [loading, setLoading] = useState(false)
  const [downloadingLayer, setDownloadingLayer] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [downloadModalVisible, setDownloadModalVisible] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState(null)
  const [downloadFormat, setDownloadFormat] = useState('json')

  const navigate = useNavigate()

  useEffect(() => {
    fetchLayers()
  }, [])

  const showErrorAlert = (message) => {
    setError(message)
    setSuccess(null)
  }

  const showSuccessAlert = (message) => {
    setSuccess(message)
    setError(null)
  }

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  const fetchLayers = async () => {
    setLoading(true)
    try {
      const url = searchQuery ? `/layers?name=${encodeURIComponent(searchQuery)}` : '/layers'
      const response = await axiosInstance.get(url)
      setLayers(response.data)
    } catch (err) {
      showErrorAlert(`Failed to fetch layers: ${err.response?.data?.message || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const deleteLayer = async () => {
    if (!selectedLayer) return
    setLoading(true)
    try {
      await axiosInstance.delete(`/layers/${selectedLayer.id}`)
      showSuccessAlert(`Layer "${selectedLayer.name}" has been deleted successfully`)
      fetchLayers()
    } catch (err) {
      showErrorAlert(`Deletion failed: ${err.response?.data?.message || err.message}`)
    } finally {
      setDeleteModalVisible(false)
      setLoading(false)
    }
  }

  const showDeleteConfirmation = (e, layer) => {
    e.stopPropagation() // Prevent row click from triggering
    setSelectedLayer(layer)
    setDeleteModalVisible(true)
  }
  
  const showDownloadModal = (e, layer) => {
    e.stopPropagation() // Prevent row click from triggering
    setSelectedLayer(layer)
    setDownloadFormat('json') // Reset to default format
    setDownloadModalVisible(true)
  }

  const downloadLayer = async () => {
    if (!selectedLayer) return
    
    setDownloadingLayer(selectedLayer.id)
    try {
      // Make a request to download endpoint
      const response = await axiosInstance.get(`/layers/download/${selectedLayer.name}/${downloadFormat}`, {
        responseType: 'blob', // Important for file downloads
      })
      
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${selectedLayer.name}.${downloadFormat}`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      showSuccessAlert(`Layer "${selectedLayer.name}" has been downloaded successfully as ${downloadFormat.toUpperCase()}`)
    } catch (err) {
      showErrorAlert(`Download failed: ${err.response?.data?.message || err.message}`)
    } finally {
      setDownloadModalVisible(false)
      setDownloadingLayer(null)
    }
  }

  const handleRowClick = (layer) => {
    // Only navigate if not in loading state and not in READY_FOR_CREATION status
    if (downloadingLayer !== layer.id) {
      navigate(`/layers/edit/${layer.id}`)
    }
  }

  const renderLayerRow = (layer) => {
    const isReadyForCreation = layer.status === 'READY_FOR_CREATION'
    const rowClasses = `
      ${isReadyForCreation ? 'bg-light' : ''}
      ${downloadingLayer === layer.id ? '' : 'cursor-pointer'}
    `

    return (
      <CTableRow 
        key={layer.id} 
        className={rowClasses}
        onClick={() => handleRowClick(layer)}
        style={{ cursor: downloadingLayer === layer.id ? 'default' : 'pointer' }}
      >
        <CTableDataCell>{layer.id}</CTableDataCell>
        <CTableDataCell>{layer.name}</CTableDataCell>
        <CTableDataCell>{layer.title}</CTableDataCell>
        <CTableDataCell>
          {layer.status === 'CREATION_FAILED' ? (
            <CTooltip 
              content={
                <div className="p-2">
                  <strong>Failure Reason:</strong><br />
                  {layer.failCause || "No specific failure reason provided"}
                </div>
              }
              placement="top"
            >
              <span className="badge bg-danger me-1">{layer.status}</span>
            </CTooltip>
          ) : (
            <span className={`badge ${
              layer.status === 'CREATED' ? 'bg-success' : 
              layer.status === 'READY_FOR_CREATION' ? 'bg-info' : 
              'bg-warning'
            }`}>
              {layer.status}
            </span>
          )}
        </CTableDataCell>
        
        <CTableDataCell>
          {layer.isBackground ? (
            <CIcon icon={cilCheck} className="text-success" />
          ) : (
            <span className="text-muted">—</span>
          )}
        </CTableDataCell>
        <CTableDataCell>
          {layer.isSearchable ? (
            <CIcon icon={cilCheck} className="text-success" />
          ) : (
            <span className="text-muted">—</span>
          )}
        </CTableDataCell>
        <CTableDataCell onClick={(e) => e.stopPropagation()}>
          <div className="d-flex align-items-center">
            {layer.status !== 'CREATION_FAILED' ? (
              <CButton
                color="success"
                size="sm"
                className="me-2"
                onClick={(e) => showDownloadModal(e, layer)}
                disabled={downloadingLayer === layer.id}
              >
                {downloadingLayer === layer.id ? (
                  <CSpinner size="sm" color="light" />
                ) : (
                  <CIcon icon={cilCloudDownload} />
                )}
              </CButton>
            ) : (
              <div className="me-2" style={{ width: '32px', height: '32px' }}></div>
            )}
            <CButton
              color="danger"
              size="sm"
              onClick={(e) => showDeleteConfirmation(e, layer)}
              disabled={downloadingLayer === layer.id}
            >
              <CIcon icon={cilTrash} />
            </CButton>
          </div>
        </CTableDataCell>
      </CTableRow>
    )
  }

  return (
    <CContainer className="px-5 mt-4">
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>WMS Layer Management</strong>
          </CCardHeader>
          <CCardBody style={{ height: '75vh' }}>
            {error && <CAlert color="danger">{error}</CAlert>}
            {success && <CAlert color="success">{success}</CAlert>}

            <CRow className="mb-3">
              <CCol sm={8}>
                <CInputGroup>
                  <CFormInput
                    placeholder="Search layers..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      fetchLayers()
                    }}
                  />
                  <CButton color="primary" onClick={fetchLayers}>
                    <CIcon icon={cilReload} />
                  </CButton>
                </CInputGroup>
              </CCol>
              <CCol sm={4} className="d-flex justify-content-end">
                <CButton color="primary" onClick={() => navigate('/layers/add')}>
                  <CIcon icon={cilCloudUpload} className="me-2" />
                  Upload New Layer
                </CButton>
              </CCol>
            </CRow>

            {loading ? (
              <div className="text-center my-4">
                <CSpinner />
                <p className="mt-2">Loading layers...</p>
              </div>
            ) : (
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Main Layer</CTableHeaderCell>
                    <CTableHeaderCell>Searchable</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {layers.length > 0 ? (
                    layers.map(layer => renderLayerRow(layer))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="7" className="text-center">
                        <p className="text-muted my-3">No layers found. Use the upload button to add a new layer.</p>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Delete Confirmation Modal */}
      <CModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete the layer <strong>{selectedLayer?.name}</strong>?</p>
          <p className="text-danger"><small>This action cannot be undone.</small></p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={deleteLayer}>
            {loading ? (
              <>
                <CSpinner size="sm" color="light" className="me-2" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Download Format Selection Modal */}
      <CModal visible={downloadModalVisible} onClose={() => setDownloadModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Download Layer</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Select format to download <strong>{selectedLayer?.name}</strong>:</p>
          <CFormSelect 
            value={downloadFormat} 
            onChange={(e) => setDownloadFormat(e.target.value)}
            disabled={downloadingLayer === selectedLayer?.id}
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="xlsx">Excel (XLSX)</option>
            <option value="shp">Shapefile</option>
          </CFormSelect>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDownloadModalVisible(false)} disabled={downloadingLayer === selectedLayer?.id}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={downloadLayer} disabled={downloadingLayer === selectedLayer?.id}>
            {downloadingLayer === selectedLayer?.id ? (
              <>
                <CSpinner size="sm" color="light" className="me-2" />
                Downloading...
              </>
            ) : (
              'Download'
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default WmsLayerManagement