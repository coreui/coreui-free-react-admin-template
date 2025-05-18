import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: 40.7128, // Example: New York City
  lng: -74.006,
}

const GoogleMapView = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Add markers or other map features here */}
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapView
