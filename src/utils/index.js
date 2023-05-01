const createPolygon = (cities) => {
    const features = cities.map((city) => (
      {type: 'Feature', geometry:
          {
            type: city.features[0].geometry.type, 
            coordinates: city.features[0].geometry.coordinates
          }
        }
    ))
    const geojson = {
        type: 'FeatureCollection',
        features
    }
    return geojson
  }

export default createPolygon