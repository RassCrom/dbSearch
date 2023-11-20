import './App.css';
import "../node_modules/leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import cities from './ext/cities.json';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import iconImage from '../src/ext/location-pin.png';

function MapComponent(props) {

  const iconMarker = L.icon({
    iconUrl: iconImage,
    iconSize: [24, 34], // size of the icon
  })

  const cityIcon = (feature, latlng) => {
    return L.circleMarker(latlng, {
      radius: 4,
      fillColor: 'blue', 
      color: 'black',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    });
  };

  function handleClick(feature, layer) {
    const coordinates = feature.geometry.coordinates;
    props.handleFlyTo(coordinates); // Fly to the clicked marker's coordinates
    const cityName = feature.properties.NAME;
    layer.bindPopup(`City Name: ${cityName} \nCoords: ${feature.geometry.coordinates}`).openPopup();
  };

  const handleFlyToSearch = (feature, layer) => {
    const marker = layer
    const searchPointCoords = marker.getLatLng();
    props.handleFlyTo([searchPointCoords.lng, searchPointCoords.lat]);
    console.log(layer);
  }

  return (
    <div className="App">
      {/* <Geocoder  /> */}
      <MapContainer center={[42.894498, 71.359966]} zoom={13} style={{ height: "100vh", width: "100%" }} 
      ref={props.mapRef}   whenCreated={mapInstance => {
        props.mapRef.current = mapInstance;
      }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          <GeoJSON data={cities} pointToLayer={cityIcon} onEachFeature={(feature, layer) => {
            layer.on('click', () => handleClick(feature, layer));
          }}>
          </GeoJSON>
        </MarkerClusterGroup>
        {props.sharedValue.length === 2 && 
          <Marker position={props.sharedValue} icon={iconMarker} onEachFeature={handleFlyToSearch}>
            <Popup>{props.searchTerm}</Popup>
          </Marker>
        }

      </MapContainer>
    </div>
  );
}

export default MapComponent;
