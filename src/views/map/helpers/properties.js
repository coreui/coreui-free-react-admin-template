import React, { useEffect, useState } from 'react'
import { useColorModes } from '@coreui/react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cibOpenstreetmap } from '@coreui/icons'
import axiosInstance from '../../../utils/api/axiosConfig'
import ProtectedComponent from '../../../features/auth/ProtectedComp'

const cleanAndFormatProperties = (properties, layerFields) => {
  
  const defaultFieldMappings = {
    name: 'Номи',
    hujjat_raq: 'Ҳужжат рақами',
    hujjat_san: 'Ҳужжат санаси',
    huj_maydon: 'Ҳужжат майдони',
    huquq: 'Ҳуқуқ',
    kadastr: 'Кадастр рақами',
    kadastr_qi: 'Кадастр қиймати',
    manzil: 'Манзил',
    maqsad: 'Мақсад',
    maydon: 'Майдон',
    nomi: 'Номи',
    sana: 'Сана',
    toifa: 'Тоифа',
    tuman: 'Туман',
    tur: 'Тур',
    umumiy_foy: 'Умумий фойдаланиш',
    zaxvat: 'Ҳудуд',
  }

  // Build field mappings from layerFields if available
  let fieldMappings = { ...defaultFieldMappings }
  
  if (layerFields && Array.isArray(layerFields)) {
    layerFields.forEach(field => {
      if (field.name && field.title) {
        fieldMappings[field.name] = field.title
      }
    })
  }

  // Exclude these fields from display
  const excludeFields = [
    // 'field_1',
    // 'fid',
    // 'viloyat',
    // 'zona',
    // 'stir',
    // 'subyekt',
    // 'qurilish_o',
    // 'hujjat',
    // 'geometry',
  ]

  // If layer fields are provided, use them to filter
  const activeFields = layerFields
    ? layerFields
        .filter((field) => field.isActive && !excludeFields.includes(field.name))
        .map((field) => field.name)
    : null

  return Object.entries(properties)
    .filter(([key, value]) => {
      // Filter based on active fields if provided
      const isActiveField = !activeFields || activeFields.includes(key)

      return (
        isActiveField &&
        !excludeFields.includes(key) &&
        value !== '0' &&
        value !== 0 &&
        value !== null &&
        value !== undefined
      )
    })
    .reduce((acc, [key, value]) => {
      // Use mapped display name if available, otherwise use original key
      acc[fieldMappings[key] || key] = value
      return acc
    }, {})
}

const getThemeStyles = (colorMode) => ({
  backgroundColor: colorMode === 'dark' ? '#212529' : '#f8f9fa',
  color: colorMode === 'dark' ? '#fff' : '#212529',
  borderBottomColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#dee2e6',
  labelColor: colorMode === 'dark' ? '#a8a8a8' : '#666666',
})

const FeatureProperties = ({ properties, onClose, onShapeDeleted, layerFields, layerName, shapeID}) => {
  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [themeStyles, setThemeStyles] = useState(getThemeStyles(colorMode))
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [coordinates, setCoordinates] = useState(null)

  useEffect(() => {
    setThemeStyles(getThemeStyles(colorMode))
    
    // Extract coordinates from geometry
    if (properties && properties.geometry) {
      const coords = getGeometryCenter(properties.geometry)
      setCoordinates(coords)
    }
  }, [colorMode, properties])

  // Pass layer fields to cleanAndFormatProperties
  const cleanedProps = cleanAndFormatProperties(properties, layerFields)

  // Function to get center coordinates from geometry
  const getGeometryCenter = (geometry) => {
    if (!geometry || !geometry.coordinates) return null

    let result = null

    if (geometry.type === 'Point') {
      result = geometry.coordinates
    } else if (geometry.type === 'Polygon') {
      // Calculate centroid of polygon
      const coords = geometry.coordinates[0]
      let sumX = 0
      let sumY = 0

      for (let i = 0; i < coords.length; i++) {
        sumX += coords[i][0]
        sumY += coords[i][1]
      }

      result = [sumX / coords.length, sumY / coords.length]
    } else if (geometry.type === 'MultiPolygon') {
      // Use first polygon centroid for simplicity
      const coords = geometry.coordinates[0][0]
      let sumX = 0
      let sumY = 0

      for (let i = 0; i < coords.length; i++) {
        sumX += coords[i][0]
        sumY += coords[i][1]
      }

      result = [sumX / coords.length, sumY / coords.length]
    }

    return result
  }



  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      
      
      await axiosInstance.delete('/layers/shape', {
        data: {
          layerName,
          id: shapeID,
        },
      })

      setShowDeleteModal(false)
      setIsDeleting(false)

      if (onShapeDeleted) {
        onShapeDeleted()
      }

      onClose()
    } catch (error) {
      console.error('Error deleting shape:', error)
      setIsDeleting(false)
    }
  }

  const navigateToYandexMaps = () => {
    if (coordinates) {
      // Open Yandex Maps in a new tab
      // Format: https://yandex.com/maps/?ll=longitude,latitude&z=15
      const url = `https://yandex.com/maps/?pt=${coordinates[0]},${coordinates[1]}&z=17&l=map`;
      window.open(url, '_blank')
    }
  }

  return (
    <>
      <div
        className="feature-properties"
        style={{
          backgroundColor: themeStyles.backgroundColor,
          color: themeStyles.color,
        }}
      >
        <div
          className="feature-header"
          style={{
            borderBottomColor: themeStyles.borderBottomColor,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h3>Майдон маълумотлари</h3>
            {coordinates && (
              <CButton
                color="link"
                size="sm"
                className="p-0 ms-2"
                onClick={navigateToYandexMaps}
                title="Yandex Maps да кўриш"
              >
                <CIcon icon={cibOpenstreetmap} size="lg" />
              </CButton>
            )}
          </div>
          <div className="header-actions">
            <button className="close-button" onClick={onClose}>
              ✖
            </button>
          </div>
        </div>
        <div className="properties-list">
          {Object.entries(cleanedProps).map(([key, value]) => (
            <div key={key} className="property-item">
              <strong style={{ color: themeStyles.labelColor }}>{key}</strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div
          className="properties-footer"
          style={{
            borderTopColor: themeStyles.borderBottomColor,
            padding: '1rem',
            marginTop: 'auto',
          }}
        >
          <ProtectedComponent actionName={'Map Management'}>
            <CButton color="danger" className="w-100" onClick={() => setShowDeleteModal(true)}>
              Ўчириш
            </CButton>
          </ProtectedComponent>
        </div>
      </div>

      <CModal
        alignment="center"
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <CModalHeader>
          <CModalTitle>Тасдиқлаш</CModalTitle>
        </CModalHeader>
        <CModalBody>Ушбу майдонни ўчиришни хоҳлайсизми?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
            Бекор қилиш
          </CButton>
          <CButton color="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Ўчирилмоқда...' : 'Ўчириш'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default FeatureProperties