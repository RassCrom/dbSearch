import './App.css';
// import * as turf from '@turf/turf';
import "../node_modules/leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import cities from './ext/cities.json';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useEffect, useState, useRef } from 'react';
// import customIconUrl from './ext/location-pin.png';
import 'leaflet.vectorgrid';

function MapComponent(props) {
  const [key, setKey] = useState(0);
  const mapRef = useRef(null);
  // const [position, setPosition] = useState({ lat: 42.30, lon: 69.61 });
  // const [geoJsonData, setGeoJsonData] = useState(null);
  // const [bufferedGeojsonData, setBufferedGeojsonData] = useState(null);

  // const handleLocationFound = (coords) => {
  //   setPosition(coords);
  // };

  // useEffect(() => {
  //   let startTimeWFS = performance.now();
  //   axios.get('http://92.47.59.229:7080/geoserver/gis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gis%3Amerged_4g_data_aqt_beeline&outputFormat=text%2Fjavascript')
  //     .then((response) => response)
  //     .then((data) => {
  //       // setGeoJsonData(turf.buffer(data.data, 1, {units:'kilometres'}));
  //       setBufferedGeojsonData(data.data);

  //       // Measure the load time
  //       const endTime = performance.now();
  //       const loadTime = endTime - startTimeWFS;
  //       console.log(`GeoJSON Layer Load Time: ${loadTime} ms`);
  //     })
  //     .catch((err) => console.error(err))
  // }, [])

  const handleFlyTo = (coords) => {
    const map = mapRef.current;

    if (map) {
      map.flyTo([coords[1], coords[0]], 10, { easeLinearity: 1 });
    }
  }

  // const wmsLayerParams = {
  //   url: 'http://92.47.59.229:7080/geoserver/gis/wms',
  //   layers: 'gis:merged_4g_data_aqt_beeline',
  //   format: 'image/png',
  //   transparent: true,
  //   version: '1.1.0',
  //   attribution: 'country layer',
  //   pointerCursor: true
  // };

  const cityIcon = (feature, latlng) => {
    return L.circleMarker(latlng, {
      radius: 4,  // Customize marker size
      fillColor: 'blue',  // Customize marker fill color
      color: 'black',    // Customize marker border color
      weight: 1,         // Customize marker border weight
      opacity: 1,        // Customize marker opacity
      fillOpacity: 0.8   // Customize marker fill opacity
    });
  };

  function handleClick(feature, layer) {
    const coordinates = feature.geometry.coordinates;
    handleFlyTo(coordinates); // Fly to the clicked marker's coordinates
    const cityName = feature.properties.NAME;
    layer.bindPopup(`City Name: ${cityName} \nCoords: ${feature.geometry.coordinates}`).openPopup();
  };

  function filterPoints(geojsonFeature) {
    return props.sharedValue ? geojsonFeature.properties.NAME === props.sharedValue : true;
  };

  // const customIconGeocoder = L.icon({
  //   iconUrl: customIconUrl, // Make sure 'customIconUrl' points to your icon image
  //   iconSize: [32, 32], // Set the icon size as needed
  //   iconAnchor: [16, 32], // Set the icon anchor (usually half of the icon size)
  //   popupAnchor: [0, -32], // Set the popup anchor
  // });

  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // Increment the key to force re-render
  }, [props.sharedValue]);

  // const dataTest = (feature) => {
  //   const swappedCoordinates = [feature.latlng.lng, feature.latlng.lat];
  //   handleFlyTo(swappedCoordinates);
  // }

  return (
    <div className="App">
      {/* <Geocoder onLocationFound={handleLocationFound} /> */}
      <MapContainer center={[42.34611, 69.57590]} zoom={15} style={{ height: "100vh", width: "100%" }} 
      ref={mapRef}   whenCreated={mapInstance => {
        mapRef.current = mapInstance;
      }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <MarkerClusterGroup>
          <WMSTileLayer
            url={wmsLayerParams.url}
            layers={wmsLayerParams.layers}
            format={wmsLayerParams.format}
            transparent={wmsLayerParams.transparent}
            version={wmsLayerParams.version}
            attribution={wmsLayerParams.attribution}
          />
        </MarkerClusterGroup> */}
        <MarkerClusterGroup chunkedLoading>
          <GeoJSON filter={filterPoints} data={cities} pointToLayer={cityIcon} onEachFeature={(feature, layer) => {
            layer.on('click', () => handleClick(feature, layer));
          }} key={key}>
          </GeoJSON>
        </MarkerClusterGroup>      
        {/* {geoJsonData && (
          <GeoJSON crs='EPSG:4326' data={geoJsonData} pointToLayer={cityIcon}/>
        )} */}
        {/* {bufferedGeojsonData && (
          <MarkerClusterGroup chunkedLoading>
            <GeoJSON crs='EPSG:4326' data={bufferedGeojsonData} pointToLayer={cityIcon}/>
          </MarkerClusterGroup>
        )} */}
        {/* <Marker position={position} icon={customIconGeocoder} eventHandlers={{ click: dataTest }}/> */}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
