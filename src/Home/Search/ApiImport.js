
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as restaurantClient from 'src/store/restaurants';
import {setSearchName, setCuisineFilter, setZipCodeFilter, setCityFilter, setStreetAddressFilter} from './searchReducer'

function SearchComponent() {
  const navigate = useNavigate();
  const {searchName2, cuisine, zipCode, city, streetAddress} = useSelector((state) => state.search);
  const searchName = useSelector((state) => state.search.name);
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/yelp/search?term=${searchName}&location=${zipCode || city || 'null'}`);
      setRestaurants(response.data.businesses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addRestaurant = (id) => async () => {
    try{
      const restraunt = await restaurantClient.createRestaurantFromYelp(id)
      navigate(`/restaurant/${restraunt._id}`);
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <div>Unable to find matching restaurant</div>
      <div>Search the web?</div>
      <button onClick={handleSearch}>Search</button>
      <div>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <span>{restaurant.name}</span>
            <button onClick={addRestaurant(restaurant.id)}>Add</button>
            </div>

        ))}
      </div>
    </div>
  );
}

export default SearchComponent;