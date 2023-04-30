import React, {useState, useCallback} from 'react'
import './App.css'
import Map, { Source, Layer, Marker } from 'react-map-gl'
import MAPBOX_TOKEN from './mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import city from './mapbox/city.json'
// import * as turf from '@turf/turf'


function App () {
  const latitude = -9.184663
  const longitude = -43.05188941
  const zoom = 11

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry:
      {
        type: city.features[0].geometry.type, 
        coordinates: city.features[0].geometry.coordinates
      }
    }
    ]
  }

  const layerStyle = {
    id: 'line',
    type: 'line',
    paint: {
      'line-color': '#007cbf'
    }
  }

  const [latInput, setLatInput] = useState('')
  const [lonInput, setLonInput] = useState('')
  const [invalidInputs, setInvalidInputs] = useState(false)
  const [viewState, setViewState] = useState({longitude, latitude, zoom})

  const onMove = useCallback(({viewState}) => {
    console.log(city.features[0].geometry.coordinates)
    const newCenter = [viewState.longitude, viewState.latitude]
    // if (turf.booleanPointInPolygon(newCenter, GEOFENCE)){
      setViewState(newCenter)
    // }
  }, [])

  const search = () => {
    if(typeof latInput === 'number' && typeof lonInput === 'number'){
      setViewState({latitude: latInput, longitude: lonInput, zoom})
      setInvalidInputs(false)
    } else{
      setInvalidInputs(true)
    }
  }
  
  const goHome = () => {setViewState({latitude, longitude, zoom})}
  
  return (
    <>
    <Map
      {...viewState}
      onMove={onMove}
      style={{ width: 1200, height: 700 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle}/>
      </Source>
      <Marker longitude={longitude} latitude={latitude} color="red" />
    </Map>
    <form >
      <input type="text" placeholder={'Type latitude'} 
             onChange={({target}) => setLatInput(Number(target.value))}
      />
      <input type="text" placeholder={'Type longitude'} 
             onChange={({target}) => setLonInput(Number(target.value))} />
      <button type="button" onClick={search}>Search</button>
      <button type="ubtton" onClick={goHome}>Go Back Home</button>
      {invalidInputs && (<p>Invalid Inputs. Type a numeric values for lat and long</p>)}
    </form>
    </>
  )
}

export default App
