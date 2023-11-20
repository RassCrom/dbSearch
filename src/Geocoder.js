import axios from 'axios';
import React, {useState} from 'react';

function Geocoder({ onLocationFound, setAttributes }) {
    const [query, setQuery] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: 42.30, lon: 69.61 });
  
    const handleGeocode = async () => {
      try {
        const country = 'Kazakhstan';
        const city = 'Shymkent';

        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query},${city},${country}`
    );
  
        if (response.data && response.data[0]) {
          const { lat, lon } = response.data[0];
          setCoordinates({ lat, lon });
          // setAttributes(response.data[0].display_name)
          // onLocationFound({ lat, lon });
        }
        
    
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };
  
    return (
      <div style={{ marginTop: '0.6rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an address"
        />
        <button onClick={handleGeocode}>Geocode</button>
        <p>Latitude: {coordinates.lat}</p>
        <p>Longitude: {coordinates.lon}</p>
      </div>
    );
  }
  
  export default Geocoder;