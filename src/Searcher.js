import React, { useCallback } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function SearchBar({ searchTerm, setSearchTerm, setSharedValue, serverData, handleFlyTo }) {
  const suggestLocation = serverData.map((suggestion) => suggestion.name);

  const inputFill = (inputValue) => {
    setSearchTerm(inputValue);
    handleSearch()
  };

  const handleInputChange = useCallback((inputValue) => setSearchTerm(inputValue.target.value), [setSearchTerm]);

  const handleSearch = useCallback(() => {
    const coordsFromServerData = [serverData[0].geom[1], serverData[0].geom[0]];
    setSharedValue(coordsFromServerData);
    handleFlyTo(serverData[0].geom)
  }, [serverData, setSharedValue, handleFlyTo]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);
  
  const resetMapFilter = useCallback(() => {
    setSearchTerm('');
  }, [setSearchTerm]);

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
            {suggestLocation.length > 0 && searchTerm && (
              suggestLocation.map(element => (
                <div onClick={() => inputFill(element)} className='city-list' key={uuidv4()}>{element}</div>
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