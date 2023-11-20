import './App.css';
import { useState, useRef } from 'react';
import SearchBar from './Searcher';
import MapComponent from './Map';
import DatabaseApi from './DatabaseAPI';

function App() {
  const [sharedValue, setSharedValue] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const mapRef = useRef(null);

  const handleFlyTo = (coords) => {
    const map = mapRef.current;
    console.log(coords)

    if (map) {
      map.flyTo([coords[1], coords[0]], 18, { easeLinearity: 1 });
    }
  }

  return (
    <>
      <MapComponent searchTerm={searchTerm} sharedValue={sharedValue} handleFlyTo={handleFlyTo} mapRef={mapRef} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} serverData={data} setSharedValue={setSharedValue} handleFlyTo={handleFlyTo} mapRef={mapRef} />
      <DatabaseApi searchTerm={searchTerm} data={data} setData={setData} />
    </>
  );
}

export default App;
