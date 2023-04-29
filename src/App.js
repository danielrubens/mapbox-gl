import './App.css';
import Map, {Marker} from 'react-map-gl';
import MAPBOX_TOKEN from './mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';


function App() {
  const latitude = -9.184663
  const longitude= -43.05188941
  return (
    <Map
      initialViewState={{ latitude, longitude, zoom: 11 }}
      style={{width: 1200, height: 700}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={longitude} latitude={latitude} color="red" />
    </Map>
  );
}

export default App;
