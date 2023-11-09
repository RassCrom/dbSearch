import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DatabaseApi({ searchTerm, data, setData }) {
  // Add state to store the timer ID
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Clear the previous timer (if any) when the searchTerm changes
    if (timer) {
      clearTimeout(timer);
    }

    // Create a new timer to delay the request by 500 milliseconds (adjust as needed)
    const newTimer = setTimeout(() => {
      // Ensure 'searchTerm' is properly sanitized and validated before using it in your request.
      axios
        .get('http://localhost:3001/api/data', {
          params: {
            query: searchTerm, // Pass 'searchTerm' as a query parameter
          },
        })
        .then((response) => {
          // Check the response status
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
    }, 300); // Adjust the delay duration as needed (e.g., 500 milliseconds)

    // Set the new timer ID in the state
    setTimer(newTimer);

    // Clean up the timer when the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchTerm]);

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
