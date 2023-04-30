import React from 'react'
import { Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import jurema from '../mapbox/jurema.json'
// import saobraz from '../mapbox/saobraz.json'
// import bonfim from '../mapbox/bonfim.json'
import createPolygon from '../utils'


function Neighbors () {
  const element = createPolygon(jurema)
  const layerStyle = {
    id: 'line',
    type: 'line',
    paint: {
      'line-color': '#007cbf'
    }
  }
  return (
    <>
     <Source id="my-data" type="geojson" data={element}>
        <Layer {...layerStyle}/>
      </Source>
    </>
  )
}

export default Neighbors
