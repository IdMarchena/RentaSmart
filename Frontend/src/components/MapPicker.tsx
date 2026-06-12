import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api'

interface MapPickerProps {
  onLocationSelect: (location: {
    lat: number
    lng: number
    address: string
    city: string
    department: string
  }) => void
  initialPosition?: { lat: number; lng: number }
}

const libraries: ('places')[] = ['places']

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '10px',
}

// Posición por defecto (Bogotá, Colombia)
const defaultCenter = {
  lat: 4.6097,
  lng: -74.0817,
}

export function MapPicker({ onLocationSelect, initialPosition }: MapPickerProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState(initialPosition || defaultCenter)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const [address, setAddress] = useState('')

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  })

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()
        setMarker({ lat, lng })

        // Geocodificación inversa (obtener dirección de coordenadas)
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const addressComponents = results[0].address_components
            let city = ''
            let department = ''

            addressComponents.forEach((component) => {
              if (component.types.includes('locality')) {
                city = component.long_name
              }
              if (component.types.includes('administrative_area_level_1')) {
                department = component.long_name
              }
            })

            setAddress(results[0].formatted_address)
            onLocationSelect({
              lat,
              lng,
              address: results[0].formatted_address,
              city: city || 'No disponible',
              department: department || 'No disponible',
            })
          }
        })
      }
    },
    [onLocationSelect]
  )

  const onAutocompleteLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        setMarker({ lat, lng })
        map?.panTo({ lat, lng })

        // Extraer ciudad y departamento
        const addressComponents = place.address_components || []
        let city = ''
        let department = ''

        addressComponents.forEach((component) => {
          if (component.types.includes('locality')) {
            city = component.long_name
          }
          if (component.types.includes('administrative_area_level_1')) {
            department = component.long_name
          }
        })

        setAddress(place.formatted_address || '')
        onLocationSelect({
          lat,
          lng,
          address: place.formatted_address || '',
          city: city || 'No disponible',
          department: department || 'No disponible',
        })
      }
    }
  }

  if (loadError) {
    return <div className="text-red-500">Error al cargar Google Maps</div>
  }

  if (!isLoaded) {
    return <div className="text-gray-500">Cargando mapa...</div>
  }

  return (
    <div className="space-y-4">
      {/* Buscador de direcciones */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Buscar dirección
        </label>
        <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Escribe una dirección..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </Autocomplete>
      </div>

      {/* Mapa */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={marker}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <Marker position={marker} />
      </GoogleMap>

      {/* Dirección seleccionada */}
      {address && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-semibold text-green-800">📍 Ubicación seleccionada:</p>
          <p className="text-sm text-green-700">{address}</p>
          <p className="text-xs text-green-600 mt-1">
            Lat: {marker.lat.toFixed(6)}, Lng: {marker.lng.toFixed(6)}
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500">
        💡 Tip: Busca una dirección arriba o haz clic en el mapa para seleccionar la ubicación
      </p>
    </div>
  )
}