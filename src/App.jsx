import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Model from './Components/Model.jsx'

import Startup from './Components/Startup';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://startup-txy0.onrender.com/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = (id, startupName, IndustryVertical, SubVertical, CityLocation, InvestorsName, InvestmentType, AmountInUSD) => {
    setShowModel(true);
    setSelectedData({
      id,
      StartupName: startupName,
      IndustryVertical,
      SubVertical,
      CityLocation,
      InvestorsName,
      InvestmentType,
      AmountInUSD,
    });
  };

  const handleSearch = () => {
    const filteredResults = data.filter((startup) =>
      startup.StartupName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
    setNotFound(filteredResults.length === 0 && searchTerm !== ''); // Updated condition
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='nav'>
        <h1>Indian StartUp</h1>
        <div className='search'>
        <input
          type='text'
          placeholder='Search StartUp By Name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search Here</button>
        </div>
      </div>
      <div className='des'>
        <h3>
          <b>Startup Explorer:</b> Uncover Innovations with Our Web App
        </h3>
      </div>
      {notFound ? (
        <p>No matching startup name found.</p>
      ) : (
        searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div className='card' key={item._id} onClick={() =>
              handleClick(item._id, item.StartupName, item.IndustryVertical,
                item.SubVertical, item.CityLocation, item.InvestorsName, item.InvestmentType, item.AmountInUSD)} >
              <div className='info' >
                <h1>
                  {item.StartupName}
                </h1>
                <p><b>Industry Vertical :</b> {item.IndustryVertical}</p>
              </div>
            </div>
          ))
        ) : (
          <Startup />
        )
      )}
      {showModel && <Model data={selectedData} onclose={() => setShowModel(false)} />}
    </>
  );
}

export default App;
