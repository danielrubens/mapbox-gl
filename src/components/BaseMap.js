import React, {useState, useCallback} from 'react'
import './BaseMap.css'
import Map, { Source, Layer, Marker, NavigationControl, ScaleControl } from 'react-map-gl'
import MAPBOX_TOKEN from '../mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import city from '../mapbox/city.json'
import createPolygon from '../utils'


function BaseMap () {
  const latitude = -9.24663
  const longitude = -43.05188941
  const zoom = 10
  const geojson = createPolygon(city)

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
    const newCenter = [viewState.longitude, viewState.latitude]
    setViewState(newCenter)
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
      style={{ width: 1280, height: 660 }}
      // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      // mapStyle="mapbox://styles/mapbox/navigation-day-v1"
      // mapStyle='mapbox://styles/mapbox/light-v11'
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle}/>
      </Source>
      <Marker longitude={longitude} latitude={-9.184663} color="red" />
      <NavigationControl/>
      <ScaleControl />
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

export default BaseMap
