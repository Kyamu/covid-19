// CovidData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const CovidData = () => {
  const [country, setCountry] = useState('India');
  const [data, setData] = useState(null);


//using promise
//   const fetchData = () => {
//     axios
//       .get(`https://disease.sh/v3/covid-19/countries/${country}`)
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   };

//using async await
const fetchData = async () => {
    try {
      const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [country]);

  return (
    <div className="container">
      <h1>COVID-19 CASES COUNTRY WISE</h1>
      <div>
        <input
          type="text"
          id="countryInput"
          placeholder="Enter a country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        
        <button onClick={fetchData}>Search</button>
      </div>
      {data ? (
        <div>
          <h2>Country Name:{data.country}</h2>
          <p>Cases: {data.cases}</p>
          <p>Deaths: {data.deaths}</p>
          <p>Recovered: {data.recovered}</p>
          <p>Cases Today:{data.todayCases}</p>
          <p>Deaths Today:{data.todayDeaths}</p>
          <p>Recovered Today:{data.todayRecovered}</p>
          {/* Add more data points as needed */}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default CovidData;
