
import React, { useState } from 'react';
import axios from 'axios';

function SearchComponent() {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/yelp/search?term=${term}&location=${location}`);
      setRestaurants(response.data.businesses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Name" />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <button onClick={handleSearch}>Search</button>
      <div>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>{restaurant.name}</div>
        ))}
      </div>
    </div>
  );
}

export default SearchComponent;