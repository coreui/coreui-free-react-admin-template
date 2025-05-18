import L from 'leaflet'

export const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [20, 32],
    iconAnchor: [10, 32],
    popupAnchor: [1, -34],
    shadowSize: [32, 32],
    shadowAnchor: [10, 32],
  })

export const greenIcon = createIcon('green')
export const redIcon = createIcon('red')
