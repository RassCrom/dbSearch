import React, { useEffect } from 'react';
import axios from 'axios';

function DatabaseApi({ searchTerm, setData }) {
  useEffect(() => {
    // Create a timer to delay the request by 10 milliseconds
    const timer = setTimeout(() => {
      searchTerm &&
      axios
        .get('http://localhost:3001/api/data', {
          params: {
            query: searchTerm, // Pass 'searchTerm' as a query parameter
          },
        })
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
          throw new Error('Network response was not ok');
        })
        .then((apiData) => {
          console.log(apiData);
          setData(apiData);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, setData]);

  return (
    <div>
      <h1>Data from the API:</h1>
      <ul>
        {/* {
          data.map((item) => (
            <li key={uuidv4()}>{item}</li>
          ))
        } */}
      </ul>
    </div>
  );
}

export default DatabaseApi;
