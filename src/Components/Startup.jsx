import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Model from './Model';

function Startup() {
  const [data, setData] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [filterByIndustry, setFilterByIndustry] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleIndustryChange = (event) => {
    setFilterByIndustry(event.target.value);
  };

  const filteredData = filterByIndustry === 'All'
    ? data
    : data.filter(item => item.IndustryVertical === filterByIndustry);

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

  return (
    <>
      <div className='container'>
        <label htmlFor="industryFilter">Filter by Industry:</label>
        <select
          id="industryFilter"
          onChange={handleIndustryChange}
          value={filterByIndustry}
        >
          <option value="All">All Industries</option>
          {/* Add other industry options dynamically based on your data */}
          {/* Example: */}
          <option value="Technology">Technology</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Logistics">Logistics</option>
          <option value="FMCG">FMCG</option>
          <option value="eCommerce">eCommerce</option>
          <option value="Food & Beverage">Food & Beverages</option>
          <option value="BFSI">BFSI</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Others">Others</option>
        

        </select>

        {filteredData.map((item) => (
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
        ))}
      </div>
      {showModel && <Model data={selectedData} onclose={() => setShowModel(false)} />}
    </>
  )
}

export default Startup;
