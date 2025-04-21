import React, { useState, useEffect } from 'react'
import Draw from 'ol/interaction/Draw'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Style, Stroke } from 'ol/style'
import GeoJSON from 'ol/format/GeoJSON'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CFormFeedback,
  CAlert,
} from '@coreui/react'
import axiosInstance from '../../../utils/api/axiosConfig'

const DrawingControl = ({ map, onShapeCreated, selectedLayer }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [drawInteraction, setDrawInteraction] = useState(null)
  const [vectorLayer, setVectorLayer] = useState(null)
  const [currentFeature, setCurrentFeature] = useState(null)
  const [formData, setFormData] = useState({})
  const [layerFields, setLayerFields] = useState([])
  const [validationErrors, setValidationErrors] = useState({})

  // Replace toast with simpler message handling like in RolesTable
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (selectedLayer) {
      const dynamicFields = selectedLayer.fields.filter(
        (field) =>
          field.name !== 'gid' &&
          field.name !== 'id' &&
          field.name !== 'gridcode' &&
          field.geometryField !== field.name,
      )
      setLayerFields(dynamicFields)

      const initialFormData = dynamicFields.reduce((acc, field) => {
        acc[field.name] = ''
        return acc
      }, {})
      setFormData(initialFormData)

      const initialValidationErrors = dynamicFields.reduce((acc, field) => {
        acc[field.name] = field.isMandatory ? 'This field is required' : ''
        return acc
      }, {})
      setValidationErrors(initialValidationErrors)
    }
  }, [selectedLayer])

  const resetForm = () => {
    const initialFormData = layerFields.reduce((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {})
    setFormData(initialFormData)

    const initialValidationErrors = layerFields.reduce((acc, field) => {
      acc[field.name] = field.isMandatory ? 'This field is required' : ''
      return acc
    }, {})
    setValidationErrors(initialValidationErrors)
  }

  useEffect(() => {
    const source = new VectorSource()
    const vector = new VectorLayer({
      source: source,
      style: new Style({
        stroke: new Stroke({
          color: '#0066ff',
          width: 2,
        }),
      }),
      zIndex: 100,
    })

    map.addLayer(vector)
    setVectorLayer(vector)

    return () => {
      if (vector) {
        map.removeLayer(vector)
      }
    }
  }, [map])

  const startDrawing = () => {
    if (!vectorLayer) return

    const draw = new Draw({
      source: vectorLayer.getSource(),
      type: 'Polygon',
    })

    draw.on('drawend', (event) => {
      const feature = event.feature
      setCurrentFeature(feature)
      setIsDrawing(false)
      setShowForm(true)
      map.removeInteraction(draw)
    })

    map.addInteraction(draw)
    setDrawInteraction(draw)
    setIsDrawing(true)
  }

  const validateField = (fieldName, value) => {
    const field = layerFields.find((f) => f.name === fieldName)

    if (field.isMandatory && !value) {
      return 'This field is required'
    }

    switch (field.type) {
      case 'integer':
        return value && !Number.isInteger(Number(value)) ? 'Must be a whole number' : ''
      case 'double precision':
        return value && isNaN(parseFloat(value)) ? 'Must be a number' : ''
      default:
        return ''
    }
  }

  const handleInputChange = (fieldName, value) => {
    const field = layerFields.find((f) => f.name === fieldName)
    let processedValue = value

    if (value !== '') {
      if (field.type === 'integer') {
        processedValue = value === '' ? '' : parseInt(value, 10)
      } else if (field.type === 'double precision') {
        processedValue = value === '' ? '' : parseFloat(value)
      }
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: processedValue,
    }))

    const error = validateField(fieldName, processedValue)
    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const newValidationErrors = {}
    layerFields.forEach((field) => {
      const error = validateField(field.name, formData[field.name])
      if (error) {
        newValidationErrors[field.name] = error
      }
    })

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors((prev) => ({
        ...prev,
        ...newValidationErrors,
      }))
      setErrorMessage('Please fix the errors in the form before submitting.')
      setTimeout(() => setErrorMessage(''), 2000)
      return
    }

    if (!currentFeature) {
      setErrorMessage('No shape data available. Please draw a shape first.')
      setTimeout(() => setErrorMessage(''), 2000)
      return
    }

    try {
      const geoJSONFormat = new GeoJSON()
      const featureGeoJSON = geoJSONFormat.writeFeatureObject(currentFeature)

      const finalData = {}

      Object.keys(formData).forEach((key) => {
        const field = layerFields.find((f) => f.name === key)
        const value = formData[key]

        if (value === '') {
          finalData[key] = null
        } else {
          switch (field.type) {
            case 'integer':
              finalData[key] = Number.isNaN(parseInt(value)) ? null : parseInt(value, 10)
              break
            case 'double precision':
              finalData[key] = Number.isNaN(parseFloat(value)) ? null : parseFloat(value)
              break
            default:
              finalData[key] = value
          }
        }
      })

      const shapeData = {
        layerName: selectedLayer.name,
        coordinates: featureGeoJSON.geometry.coordinates[0],
        data: finalData,
      }

      await axiosInstance.post('/layers/shape', shapeData)

      setSuccessMessage(`Shape added to ${selectedLayer.name} successfully!`)
      setTimeout(() => setSuccessMessage(''), 2000)

      onShapeCreated()

      resetForm()
      setShowForm(false)
      vectorLayer.getSource().clear()
      setCurrentFeature(null)
    } catch (error) {
      setErrorMessage(`Error saving shape data: ${error.response?.data?.message || error.message}`)
      console.error('Error saving shape:', error)
      setTimeout(() => setErrorMessage(''), 2000)
    }
  }

  const cancelDrawing = () => {
    if (vectorLayer) {
      const source = vectorLayer.getSource()
      source.clear()
    }
    if (drawInteraction) {
      map.removeInteraction(drawInteraction)
    }
    resetForm()
    setIsDrawing(false)
    setShowForm(false)
    setCurrentFeature(null)
    setErrorMessage('')
    setSuccessMessage('')
  }

  // Field name to title mapping similar to the one in FeatureProperties
  const getFieldTitle = (fieldName) => {
    // Default field mappings as in FeatureProperties component
    const defaultFieldMappings = {
      
    }

    // First check if the field has a title property
    const field = layerFields.find(f => f.name === fieldName)
    if (field && field.title) {
      return field.title
    }
    
    // Otherwise use the mapping or fallback to the original field name
    return defaultFieldMappings[fieldName] || fieldName
  }

  const renderFormInput = (field) => {
    const inputProps = {
      id: field.name,
      value: formData[field.name] === 0 ? '0' : formData[field.name] || '',
      onChange: (e) => handleInputChange(field.name, e.target.value),
      invalid: !!validationErrors[field.name],
      valid: !validationErrors[field.name] && formData[field.name] !== '',
    }

    let inputType = 'text'
    let inputStep = undefined

    switch (field.type) {
      case 'integer':
        inputType = 'number'
        inputStep = '1'
        break
      case 'double precision':
        inputType = 'number'
        inputStep = '0.01'
        break
      case 'date':
        inputType = 'date'
        break
    }

    return (
      <>
        <CFormInput {...inputProps} type={inputType} step={inputStep} />
        {validationErrors[field.name] && (
          <CFormFeedback invalid>{validationErrors[field.name]}</CFormFeedback>
        )}
      </>
    )
  }

  if (!selectedLayer) return null

  return (
    <>
      <div>
        <CButton
          color={isDrawing ? 'danger' : 'light'}
          size="sm"
          className="ms-2"
          style={{ fontWeight: '800', borderRadius: '4px', fontSize: '1.5rem', padding: '0rem 0.75rem 0.25rem 0.75rem ', color: 'green' }}
          onClick={isDrawing ? cancelDrawing : startDrawing}
        >
          +
        </CButton>
      </div>

      {showForm && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}
        >
          <CCard
            style={{
              position: 'absolute',
              top: 145,
              right: 10,
              width: '600px',
              maxHeight: '60vh',
              overflow: 'hidden',
             
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
            }}
          >
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <CCardTitle>Add Shape for {selectedLayer.title}</CCardTitle>
              <CButton 
                color="close" 
                size="sm" 
                onClick={cancelDrawing}
                aria-label="Close"
              />
            </CCardHeader>
            <CCardBody
              style={{
                maxHeight: 'calc(80vh - 60px)',
                overflowY: 'auto',
              }}
            >
              {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
              {successMessage && <CAlert color="success">{successMessage}</CAlert>}

              <CForm onSubmit={handleFormSubmit}>
                <CRow>
                  {layerFields.length > 0 ? (
                    layerFields.map((field) => (
                      <CCol key={field.name} md="6" className="mb-3">
                        <CFormLabel htmlFor={field.name} className="d-flex align-items-center">
                          {getFieldTitle(field.name)}
                          {field.isMandatory && (
                            <span className="text-danger ms-1" title="Mandatory Field">
                              *
                            </span>
                          )}
                        </CFormLabel>
                        {renderFormInput(field)}
                      </CCol>
                    ))
                  ) : (
                    <CCol>No additional fields for this layer</CCol>
                  )}
                </CRow>

                <div className="d-flex gap-2 mt-3">
                  <CButton type="submit" color="primary" className="flex-fill">
                    Save
                  </CButton>
                  <CButton
                    type="button"
                    color="secondary"
                    onClick={cancelDrawing}
                    className="flex-fill"
                  >
                    Cancel
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </div>
      )}
    </>
  )
}

export default DrawingControl