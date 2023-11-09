import './App.css';
import { useState } from 'react';
import SearchBar from './Searcher';
import MapComponent from './Map';
import DatabaseApi from './DatabaseAPI';

function App() {
  const [sharedValue, setSharedValue] = useState('');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <MapComponent sharedValue={sharedValue} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} serverData={data} setSharedValue={setSharedValue} />
      <DatabaseApi searchTerm={searchTerm} data={data} setData={setData} />
    </>
  );
}

export default App;
