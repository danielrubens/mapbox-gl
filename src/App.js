import React, {useState, useCallback} from 'react'
import './App.css'
import Map, { Marker } from 'react-map-gl'
import MAPBOX_TOKEN from './mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as turf from '@turf/turf'


function App () {
  const latitude = -9.184663
  const longitude = -43.05188941
  const GEOFENCE = turf.circle([longitude, latitude], 5, {units: 'miles'})
  const zoom = 11
  const [viewState, setViewState] = useState({longitude, latitude, zoom})

  const onMove = useCallback(({viewState}) => {
    const newCenter = [viewState.longitude, viewState.latitude]
    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)){
      setViewState(newCenter)
    }
  }, [])

  return (
    <Map
      {...viewState}
      onMove={onMove}
      style={{ width: 1200, height: 700 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={longitude} latitude={latitude} color="red" />
    </Map>
  )
}

export default App
