
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as restaurantClient from 'src/store/restaurants';
import {setSearchName, setCuisineFilter, setZipCodeFilter, setCityFilter, setStreetAddressFilter} from './searchReducer'
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import './APIImport.css'
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

  useEffect(() => {
    if (restaurants.length > 0) {
        window.scrollBy(0, 200);
    }
}, [restaurants]);

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
      <div className="apiSearchText">Search the web?</div>
      <button className="apiSearchButton" onClick={handleSearch}>Search <FaExternalLinkAlt className="apiSearchIcon"/></button>
      <hr className='apiSearchHr'></hr>
      <ul className="apiImportList">
        {restaurants.map((restaurant) => (
          <li className='apiImportItem' key={restaurant.id}>
            <Link className='apiImportLink' onClick={addRestaurant(restaurant.id)}>
              <div>{restaurant.name}</div>
              <div>{restaurant.location?.address1}, {restaurant.location?.city}</div>
              <FaCloudDownloadAlt className="apiDownloadIcon"/>
            </Link>
          </li>

        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;