import React, { useEffect, useRef, useState } from 'react'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import { XYZ } from 'ol/source'
import Zoom from 'ol/control/Zoom'
import WKT from 'ol/format/WKT'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { useDispatch } from 'react-redux'
import { handleLogout } from '../../features/auth/authSlice'
import { CCard, CCardBody, CFormSelect } from '@coreui/react'
import './map.css'

// Import components and utilities
import ProtectedComponent from '../../features/auth/ProtectedComp'
import FeatureProperties from './helpers/properties'
import SearchPanel from './helpers/searchingMap'
import DrawingControl from './helpers/drawingMap'
import CheckboxDropdown from './selector/selectLayer'
import ModeSelection from './helpers/modeSelection'
import axiosInstance from '../../utils/api/axiosConfig'
import { createWMSLayer } from './helpers/layerCreation'
import { addPrintStyles } from './helpers/print'
import {
  WMTS_URL,
  zoom,
  projection,
  minZoom,
  maxZoom,
  SEARCH_URL,
  WFS_URL,
  center,
  mapExtent,
  LAYERS_API_URL,
} from './utils/constants'

const MapComponent = () => {
  // Map and ref states
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  // Layer references
  const backgroundLayers = useRef({})
  const mainLayers = useRef({})

  // UI states
  const [currentZoom, setCurrentZoom] = useState(zoom)
  const [isEditMode, setIsEditMode] = useState(false)
  const [showSearchPanel, setShowSearchPanel] = useState(false)
  const [showLayerPanel, setShowLayerPanel] = useState(true)
  const [modeTransitioning, setModeTransitioning] = useState(false)

  // Data states
  const [allLayers, setAllLayers] = useState([])
  const [backgroundLayerData, setBackgroundLayerData] = useState([])
  const [mainLayerData, setMainLayerData] = useState([])
  const [selectedLayers, setSelectedLayers] = useState([])
  const [loadingLayers, setLoadingLayers] = useState(false)
  const [featureProperties, setFeatureProperties] = useState(null)
  const [shapeId, setShapeId] = useState(null)

  // Search states
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchResultsLayer = useRef(null)

  // Fetch available layers from API and categorize them
  const fetchAvailableLayers = async () => {
    setLoadingLayers(true)
    try {
      const response = await axiosInstance.get(LAYERS_API_URL)
      const createdLayers = response.data.filter((layer) => layer.status === 'CREATED')

      // Separate layers based on isBackground property
      const backgrounds = createdLayers.filter((layer) => layer.isBackground)
      const mains = createdLayers.filter((layer) => !layer.isBackground)

      setAllLayers(createdLayers)
      setBackgroundLayerData(backgrounds)
      setMainLayerData(mains)
    } catch (error) {
      console.error('Error fetching layers:', error)
    } finally {
      setLoadingLayers(false)
    }
  }

  // Initialize map
  useEffect(() => {
    fetchAvailableLayers()

    if (!mapInstance.current) {
      // Create base map
      mapInstance.current = new Map({
        target: mapRef.current,
        view: new View({
          projection: projection,
          center: center,
          extent: mapExtent,
          minZoom: minZoom,
          maxZoom: maxZoom,
          zoom: zoom,
          background: '#e0f7fa',
        }),
        controls: [
          new Zoom({
            zoomInTipLabel: 'Zoom in',
            zoomOutTipLabel: 'Zoom out',
            className: 'custom-zoom-control',
          }),
        ],
        layers: [
          new TileLayer({
            source: new XYZ({
              maxZoom: 17,
              url: WMTS_URL + '/{z}/{x}/{y}',
              tileLoadFunction: (tile, src) => {
                const currentToken = localStorage.getItem('token')
                const xhr = new XMLHttpRequest()
                xhr.open('GET', src, true)
                xhr.setRequestHeader('Authorization', `Bearer ${currentToken}`)
                xhr.responseType = 'blob'

                xhr.onload = function () {
                  if (xhr.status === 200) {
                    const image = tile.getImage()
                    image.src = URL.createObjectURL(xhr.response)
                  } else if (xhr.status === 401) {
                    dispatch(handleLogout())
                  }
                }
                xhr.send()
              },
            }),
          }),
        ],
      })
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined)
        mapInstance.current = null
      }
    }
  }, [])

  // Load background layers when they're available
  useEffect(() => {
    if (!mapInstance.current || backgroundLayerData.length === 0) return

    const oldBackgroundLayers = { ...backgroundLayers.current }

    backgroundLayers.current = {}

    backgroundLayerData.forEach((layerInfo, index) => {
      const layer = createWMSLayer(layerInfo.name, layerInfo.color || '#3388ff', 1 + index, layerInfo.minZoom, layerInfo.maxZoom)

      mapInstance.current.addLayer(layer)
      backgroundLayers.current[layerInfo.name] = layer

      layer.getSource().once('imageloadend', () => {
        layer.setVisible(layer.values_.minZoom <= currentZoom && layer.values_.maxZoom >= currentZoom)
        if (oldBackgroundLayers[layerInfo.name]) {
          mapInstance.current.removeLayer(oldBackgroundLayers[layerInfo.name])
          delete oldBackgroundLayers[layerInfo.name]
        }
      })
    })

    setTimeout(() => {
      Object.values(oldBackgroundLayers).forEach((layer) => {
        if (layer && mapInstance.current) {
          mapInstance.current.removeLayer(layer)
        }
      })
    }, 1000)
  }, [backgroundLayerData])
  // Handle map events like zoom and click
  useEffect(() => {
    if (!mapInstance.current) return

    const handleMoveEnd = () => {
      const newZoom = mapInstance.current.getView().getZoom()
      if (newZoom !== currentZoom) {
        setCurrentZoom(newZoom)

        // Update layer visibility based on zoom level
        const showBackground = newZoom < 14
        const showMainLayers = newZoom >= 14

        // Update background layers visibility
        Object.values(backgroundLayers.current).forEach((layer) => {
          
          if (layer) {
            layer.setVisible(layer.values_.minZoom <= newZoom && layer.values_.maxZoom >= newZoom)
          }
        })

        // Update main layers visibility
        Object.values(mainLayers.current).forEach((layer) => {
          console.log('Background Layer:', layer.values_.minZoom, layer.values_.maxZoom)
          if (layer) {
            layer.setVisible(layer.values_.minZoom <= newZoom && layer.values_.maxZoom >= newZoom)
          }
        })
      }
    }

    const handleClick = async (event) => {
      if (selectedLayers.length === 0 || !isEditMode) return

      const coordinate = mapInstance.current.getCoordinateFromPixel(event.pixel)
      const [lon, lat] = coordinate

      // Use the first selected layer for clicking
      const primaryLayer = selectedLayers[0]

      try {
        const response = await fetch(`${WFS_URL}/${primaryLayer}?lat=${lat}&lon=${lon}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.status === 401) {
          dispatch(handleLogout())
          return
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.features?.[0]) {
          
          console.log('Feature ID:', data.features[0].id.split('.')[1])
          setShapeId(data.features[0].id.split('.')[1])
          setFeatureProperties({
            ...data.features[0].properties,
            geometry: data.features[0].geometry,
          })
        } else {
          setFeatureProperties(null)
        }
      } catch (error) {
        console.error('Error fetching WFS data:', error)
        setFeatureProperties(null)
      }
    }

    mapInstance.current.on('moveend', handleMoveEnd)
    mapInstance.current.on('click', handleClick)

    return () => {
      if (mapInstance.current) {
        mapInstance.current.un('moveend', handleMoveEnd)
        mapInstance.current.un('click', handleClick)
      }
    }
  }, [selectedLayers, currentZoom, token, dispatch, isEditMode])

  // Update layers when selection changes
  useEffect(() => {
    if (!mapInstance.current) return

    updateMapLayers()

    // Clear search results
    clearResults()
  }, [selectedLayers])

  // Function to update map layers based on selection
  const updateMapLayers = () => {
    const oldMainLayers = { ...mainLayers.current }

    mainLayers.current = {}

    selectedLayers.forEach((layerName, index) => {
      const layerInfo = allLayers.find((layer) => layer.name === layerName)
      const layerColor = layerInfo?.color || '#3388ff'

      const newLayer = createWMSLayer(layerName, layerColor, 10 + index, layerInfo?.minZoom, layerInfo?.maxZoom)

      mapInstance.current.addLayer(newLayer)
      mainLayers.current[layerName] = newLayer

      newLayer.getSource().once('imageloadend', () => {
        newLayer.setVisible(newLayer.values_.minZoom <= currentZoom && newLayer.values_.maxZoom >= currentZoom)

        if (oldMainLayers[layerName]) {
          mapInstance.current.removeLayer(oldMainLayers[layerName])
          delete oldMainLayers[layerName]
        }
      })
    })

    setTimeout(() => {
      Object.values(oldMainLayers).forEach((layer) => {
        if (layer && mapInstance.current) {
          mapInstance.current.removeLayer(layer)
        }
      })
    }, 1000)
  }

  // Handle layer selection change
  const handleLayerSelectChange = (newSelectedLayers) => {
    setSelectedLayers(newSelectedLayers)
  }

  // Print functionality
  const handlePrint = () => {
    addPrintStyles()
    window.print()
  }

  // Search functionality
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query)
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const layerIds = allLayers
        .filter((layer) => selectedLayers.includes(layer.name))
        .map((layer) => layer.id)

      const response = await axiosInstance.get(
        `${SEARCH_URL}?query=${encodeURIComponent(searchQuery)}${
          layerIds.length > 0 ? `&layerIds=${layerIds.join(',')}` : ''
        }`,
      )

      const results = response.data || []
      setSearchResults(results)
      displaySearchResults(results)
    } catch (error) {
      console.error('Error searching:', error)
      setSearchResults([])
    }
  }

  const displaySearchResults = (results) => {
    // Remove existing search results layer
    if (searchResultsLayer.current) {
      mapInstance.current.removeLayer(searchResultsLayer.current)
    }

    if (results.length === 0) return

    // Create vector source for search results
    const vectorSource = new VectorSource()
    const wktFormat = new WKT()

    // Add features for each result
    results.forEach((result) => {
      if (result.data.geom) {
        try {
          const wktString = result.data.geom.replace(/SRID=\d+;/, '')
          const geometry = wktFormat.readGeometry(wktString)

          const feature = new Feature({
            geometry: geometry,
            properties: result.data,
          })

          // Style the feature
          feature.setStyle(
            new Style({
              fill: new Fill({
                color: 'rgba(255, 165, 0, 0.3)',
              }),
              stroke: new Stroke({
                color: '#ff8c00',
                width: 2,
              }),
            }),
          )

          vectorSource.addFeature(feature)
        } catch (error) {
          console.error('Error parsing geometry:', error)
        }
      }
    })

    // Create and add the vector layer
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10,
    })

    searchResultsLayer.current = vectorLayer
    mapInstance.current.addLayer(vectorLayer)

    // Show search panel when results are displayed
    setShowSearchPanel(true)
  }

  const handleResultClick = (result) => {
    if (result.data.geom) {
      try {
        // Parse WKT geometry
        const wktFormat = new WKT()
        const wktString = result.data.geom.replace(/SRID=\d+;/, '')
        const geometry = wktFormat.readGeometry(wktString)

        // Get the center of the geometry's extent
        const extent = geometry.getExtent()
        const center = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]

        // Animate to the location
        mapInstance.current.getView().animate({
          center: center,
          zoom: 16,
          duration: 1000,
        })

        // Highlight the selected feature
        if (searchResultsLayer.current) {
          const features = searchResultsLayer.current.getSource().getFeatures()
          features.forEach((feature) => {
            const properties = feature.get('properties')
            if (properties.kadastr === result.data.kadastr) {
              feature.setStyle(
                new Style({
                  fill: new Fill({
                    color: 'rgba(15, 219, 26, 0.3)',
                  }),
                  stroke: new Stroke({
                    color: 'rgba(15, 219, 25, 0.78)',
                    width: 3,
                  }),
                }),
              )
            } else {
              feature.setStyle(
                new Style({
                  fill: new Fill({
                    color: 'rgba(255, 165, 0, 0.3)',
                  }),
                  stroke: new Stroke({
                    color: '#ff8c00',
                    width: 2,
                  }),
                }),
              )
            }
          })
        }
      } catch (error) {
        console.error('Error handling result click:', error)
      }
    }
  }

  const clearResults = () => {
    setSearchQuery('')
    setSearchResults([])
    if (searchResultsLayer.current) {
      mapInstance.current.removeLayer(searchResultsLayer.current)
      searchResultsLayer.current = null
    }
  }

  // Mode toggle with animation
  const toggleMode = () => {
    setModeTransitioning(true)

    if (!isEditMode) {
      // Switching to edit mode - show single layer
      if (selectedLayers.length > 1) {
        setSelectedLayers([selectedLayers[0]])
      }

      setTimeout(() => {
        setIsEditMode(true)
        setShowSearchPanel(true)
        setModeTransitioning(false)
      }, 300)
    } else {
      // Switching to view mode - clear properties
      setFeatureProperties(null)
      clearResults()
      setShowSearchPanel(false)

      setTimeout(() => {
        setIsEditMode(false)
        setModeTransitioning(false)
      }, 300)
    }
  }

  // Reload WMS layers (used after drawing new shapes)
  const reloadWMSLayers = () => {
    fetchAvailableLayers()
    updateMapLayers()
  }

  // Add print styles when component mounts
  useEffect(() => {
    addPrintStyles()
  }, [])

  return (
    <div className="map-container">
      <div ref={mapRef} className="map" />

      {/* Mode Selection Controls */}
      <ModeSelection
        isEditMode={isEditMode}
        onToggle={toggleMode}
        modeTransitioning={modeTransitioning}
        onPrint={handlePrint}
      />

      {/* Drawing Controls (Edit Mode) */}
      <ProtectedComponent actionName={'Map Management'}>
        {isEditMode && mapInstance.current && selectedLayers.length === 1 && (
          <div
            className="print-hide"
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              zIndex: 1000,
            }}
          >
            <DrawingControl
              map={mapInstance.current}
              onShapeCreated={reloadWMSLayers}
              selectedLayer={allLayers.find((layer) => layer.name === selectedLayers[0])}
            />
          </div>
        )}
      </ProtectedComponent>

      {/* Layer Selection Panel */}
      <CCard
        className="layer-panel print-hide"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          maxWidth: isEditMode ? '250px' : '300px',
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          transform: showLayerPanel ? 'translateX(0)' : 'translateX(calc(100% - 40px))',
        }}
      >
        <CCardBody style={{ padding: '0' }}>
          {!isEditMode ? (
            <div className="d-flex align-items-center">
              <CheckboxDropdown
                options={mainLayerData.map((layer) => ({
                  ...layer,
                  displayName: layer.title || layer.name, 
                }))}
                selectedValues={selectedLayers}
                onChange={handleLayerSelectChange}
              />
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <CFormSelect
                value={selectedLayers[0] || ''}
                onChange={(e) => setSelectedLayers(e.target.value ? [e.target.value] : [])}
                className="form-select"
                size="sm"
              >
                <option value={''}>Select a layer</option>
                {mainLayerData.map((layer) => (
                  <option key={layer.id} value={layer.name}>
                    {layer.title || layer.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
          )}
        </CCardBody>
      </CCard>

      {/* Search Panel (Edit Mode) */}
      {isEditMode && (
        <div className="print-hide">
          <SearchPanel
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            onSearch={handleSearch}
            searchResults={searchResults}
            onResultClick={handleResultClick}
            onClearResults={clearResults}
          />
        </div>
      )}

      {/* Feature Properties Panel */}
      {featureProperties && (
        <div className="print-hide">
          <FeatureProperties
            properties={featureProperties}
            onClose={() => setFeatureProperties(null)}
            onShapeDeleted={reloadWMSLayers}
            layerFields={allLayers.find((layer) => layer.name === selectedLayers[0])?.fields}
            layerName={allLayers.find((layer) => layer.name === selectedLayers[0])?.name}
            shapeID={shapeId}
          />
        </div>
      )}
    </div>
  )
}

export default MapComponent
