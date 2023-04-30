const createPolygon = (city) => {
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
    return geojson
  }

export default createPolygon