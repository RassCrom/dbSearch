import React, { useCallback } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function SearchBar({ generateRegex, searchTerm, setSearchTerm, setSharedValue, serverData }) {


  const formatCityName = (cityName) => {
    return cityName[0].toUpperCase() + cityName.slice(1)
  };

  function suggestCity() {
    const matchSuggestionNames = serverData.map(suggestion => suggestion.name);
    return matchSuggestionNames;
  };

  function searchCity(cityName) {
    setSearchTerm(cityName);
    setSharedValue(formatCityName(cityName));
  };

  const handleInputChange = useCallback((inputValue) => setSearchTerm(inputValue.target.value), [setSearchTerm]);

  const handleSearch = useCallback(() => {
    const formattedCityName = formatCityName(searchTerm);
    searchTerm.trim() !== '' ? setSharedValue(formattedCityName) : setSharedValue(searchTerm);
  }, [searchTerm, setSharedValue]);

  const handleKeyPress = useCallback((event) => event.key === 'Enter' && handleSearch(), [handleSearch]);
  
  const resetMapFilter = useCallback(() => {
    setSearchTerm('');
    setSharedValue('');
  }, [setSearchTerm, setSharedValue]);

  return (
    <div className='search'>
      <div className='autocomplete'>
        <div className='input-city'>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onKeyUp={handleKeyPress}
            onChange={handleInputChange}
          />
          <div className='suggestion-list'>
            {suggestCity() && suggestCity().length > 0 && searchTerm && (
              suggestCity().map(element => (
                <div onMouseDown={() => searchCity(element)} className='city-list' key={uuidv4()}>{element}</div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className='buttons'>
        <button style={{display: 'inline-block'}} onClick={handleSearch}>Search</button>
        <button style={{display: 'inline-block'}} onClick={resetMapFilter}>Reset</button>
      </div>
    </div>
  );
};
  
export default SearchBar;