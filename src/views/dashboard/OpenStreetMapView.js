import React, { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-cluster/lib/assets/MarkerCluster.Default.css'
import openrouteservice from 'openrouteservice-js'
import { ORS_API_KEY } from './ors.config'
import L from 'leaflet'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { fetchGoogleSheetData } from '../../utils/googleSheets'
import { createIcon, greenIcon, redIcon } from '../../utils/mapIcons'
import { SHEET_BASE_URL, TABS, CUSTOMER_LOCATION_FIELD } from '../../constants/map'

// Import marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Delete default icon's reference since we'll use custom icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const OpenStreetMapView = () => {
  const [customersByTab, setCustomersByTab] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const [route, setRoute] = useState([])
  const [navigatingTo, setNavigatingTo] = useState(null)
  const navigate = useNavigate()
  const { user } = useAuth()

  // Fetch data from both tabs
  useEffect(() => {
    Promise.all(TABS.map((tab) => fetchGoogleSheetData(SHEET_BASE_URL, tab.gid))).then(
      (results) => {
        console.log('Fetched customer data:', results)
        setCustomersByTab(results)
      },
    )
  }, [])

  // Example: Use first two valid customers (from any tab) for routing
  useEffect(() => {
    const all = customersByTab.flat().filter((c) => c[CUSTOMER_LOCATION_FIELD])
    if (all.length >= 2) {
      const parseLatLng = (str) => str.split(',').map(Number)
      const start = parseLatLng(all[0][CUSTOMER_LOCATION_FIELD])
      const end = parseLatLng(all[1][CUSTOMER_LOCATION_FIELD])
      const Directions = new openrouteservice.Directions({ api_key: ORS_API_KEY })
      Directions.calculate({
        coordinates: [
          [start[1], start[0]],
          [end[1], end[0]],
        ],
        profile: 'driving-car',
        format: 'geojson',
      })
        .then((geojson) => {
          const coords = geojson.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng])
          setRoute(coords)
        })
        .catch((err) => console.error(err))
    }
  }, [customersByTab])

  // On map load, get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude])
      })
    }
  }, [])

  // Default center
  const allCustomers = customersByTab.flat().filter((c) => c[CUSTOMER_LOCATION_FIELD])
  console.log('All customers with location:', allCustomers)
  const center = allCustomers.length
    ? allCustomers[0][CUSTOMER_LOCATION_FIELD].split(',').map(Number)
    : [30.05487296, 31.3385129]
  // Memoize markers to prevent unnecessary re-renders
  const markers = useMemo(
    () =>
      customersByTab
        .map((customers, tabIdx) =>
          customers
            .filter((c) => {
              const loc = c[CUSTOMER_LOCATION_FIELD]
              if (!loc) return false
              const parts = loc.split(',').map(Number)
              // Check if customer is assigned to current user
              const assignee = c['Assignee']
              const isAssignedToUser = assignee === user?.username

              // Only show if coordinates are valid AND assigned to current user
              return parts.length === 2 && parts.every((n) => !isNaN(n)) && isAssignedToUser
            })
            .map((cust, idx) => {
              const [lat, lng] = cust[CUSTOMER_LOCATION_FIELD].split(',').map(Number)
              const assignee = cust['Assignee']
              return {
                id: `${tabIdx}-${idx}`,
                position: [lat, lng],
                isCurrentCustomer: tabIdx === 0,
                assignee: assignee,
              }
            }),
        )
        .flat(),
    [customersByTab, user],
  )

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '400px', width: '100%' }}
      preferCanvas={true}
      updateWhenZooming={false}
      updateWhenIdle={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        minZoom={3}
      />
      <MarkerClusterGroup chunkedLoading={true} maxClusterRadius={50} spiderfyOnMaxZoom={true}>
        {markers.map((marker) => {
          // Find the customer object for this marker
          const tabCustomers = customersByTab[marker.isCurrentCustomer ? 0 : 1] || []
          const customer = tabCustomers.find((c) => {
            const [lat, lng] = (c[CUSTOMER_LOCATION_FIELD] || '').split(',').map(Number)
            return lat === marker.position[0] && lng === marker.position[1]
          })
          return (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={marker.isCurrentCustomer ? greenIcon : redIcon}
              zIndexOffset={marker.isCurrentCustomer ? 1000 : 0}
            >
              <Popup>
                <div style={{ minWidth: 200 }}>
                  {' '}
                  <h6 style={{ marginBottom: 8 }}>
                    {marker.isCurrentCustomer ? 'Current Active Customer' : 'New Customer'}
                    <span
                      style={{
                        marginLeft: '8px',
                        padding: '2px 6px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        borderRadius: '4px',
                        fontSize: '12px',
                      }}
                    >
                      Assigned to: {marker.assignee}
                    </span>
                  </h6>
                  {customer ? (
                    <div>
                      {Object.entries(customer)
                        .filter(([key]) => key !== 'Assignee') // Hide the Assignee field since we show it above
                        .map(
                          ([key, value]) =>
                            value && (
                              <div key={key} style={{ marginBottom: 4 }}>
                                <strong>{key}:</strong> {value}
                              </div>
                            ),
                        )}
                      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <button
                          style={{
                            padding: '6px 12px',
                            background: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                          }}
                          onClick={async () => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                async (pos) => {
                                  const userLat = pos.coords.latitude
                                  const userLng = pos.coords.longitude
                                  const destLat = marker.position[0]
                                  const destLng = marker.position[1]
                                  // Use user's actual current location as origin
                                  const gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}&travelmode=driving`
                                  window.open(gmapsUrl, '_blank')
                                },
                                () => alert('Failed to get your current location.'),
                              )
                            } else {
                              alert('Geolocation is not supported by your browser.')
                            }
                          }}
                        >
                          Get Destination
                        </button>
                        <button
                          style={{
                            padding: '6px 12px',
                            background: '#28a745',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            // Encode customer data in URL parameters
                            const params = new URLSearchParams({
                              name: customer['اسم العميل'] || '',
                              phone: customer['رقم الموبايل'] || '',
                              notes: customer['Notes'] || '',
                              lat: marker.position[0],
                              lng: marker.position[1],
                            })
                            navigate(`/customer-form?${params.toString()}`)
                          }}
                        >
                          Submit a form
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span>No details available.</span>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MarkerClusterGroup>
      {userLocation && (
        <Marker
          position={userLocation}
          icon={L.icon({
            iconUrl:
              'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            iconSize: [20, 32],
            iconAnchor: [10, 32],
            popupAnchor: [1, -34],
            shadowUrl: markerShadow,
            shadowSize: [32, 32],
            shadowAnchor: [10, 32],
          })}
        >
          <Popup>Your Location</Popup>
        </Marker>
      )}
      {route.length > 0 && (
        <Polyline positions={route} color={'#007bff'} weight={4} opacity={0.8} />
      )}
    </MapContainer>
  )
}

export default OpenStreetMapView
