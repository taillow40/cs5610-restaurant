import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchName, setCuisineFilter, setZipCodeFilter, setCityFilter, setStreetAddressFilter, searchAsync, sortRating, sortDistance} from './searchReducer'
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
  //const [searchTerm, setSearchTerm] = useState('');
  //const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const [isChecked, setisChecked] = useState(false);
  const [isCheckedDist, setisCheckedDist] = useState(false);


  const dispatch = useDispatch();
  const {name, cuisine, zipCode, city, streetAddress, sortByRating: sortChecked, sortByDistance: sortDist } = useSelector((state) => state.search);

  const handleNameChange = (event) => {
  //  console.log(event.target.value);
    dispatch(setSearchName(event.target.value));
  //  console.log(`New Name: ${event.target.value}`);
  };

  const handleCuisineChange = (newCuisine) => {
    dispatch(setCuisineFilter(newCuisine));
  };

  const handleZipCodeChange = (newZipCode) => {
    dispatch(setZipCodeFilter(newZipCode));
  };

  const handleCityChange = (newCity) => {
    dispatch(setCityFilter(newCity));
  };

  const handleStreetAddressChange = (newStreetAddress) => {
    dispatch(setStreetAddressFilter(newStreetAddress));
  };

  const handleSortChange = (sortBy) => {
    if (sortBy === "rating") {
      setisChecked(true);
      setisCheckedDist(false);
      dispatch(sortRating(true));
      dispatch(sortDistance(false)); // Uncheck sortByDistance when selecting sortByRating
    } else if (sortBy === "distance") {
      setisChecked(false);
      setisCheckedDist(true);
      dispatch(sortDistance(true));
      dispatch(sortRating(false)); // Uncheck sortByRating when selecting sortByDistance
    }
    else{
      setisChecked(false);
      setisCheckedDist(false);
      dispatch(sortDistance(false));
      dispatch(sortRating(false));
    }
  };

  const handleSearch = () => {
    dispatch(searchAsync());

    navigate(
      `/search?name=${name}&cuisine=${cuisine}&zipCode=${zipCode}&city=${city}&streetAddress=${streetAddress}&sortByRating=${isChecked}&sortByDistance=${isCheckedDist}`
    );

  };

  /*useEffect(() => {
    // Use useEffect to automatically trigger a search when sortChecked is false
    if (!sortChecked) {
      dispatch(searchAsync());
    }
  }, [sortChecked, dispatch]);
*/

  const searchStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc", 
    borderRadius: "5px",
  };

  const searchBarForm = {
    display: "flex",
    alignItems: "center"
  }

  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    marginLeft: '0px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={{width: "100%"}}>
      <label htmlFor='name'>Restaurant Name</label>
        <input
          style={searchStyle}
          id="name"
          type="text"
          placeholder="Search by Restaurant Name"
          value={name}
          onChange={handleNameChange}
        />
      <label htmlFor='cuisine'>Cuisine</label>
      <input style={searchStyle} id="cuisine" type="text" placeholder="Search by Cuisine" value={cuisine} onChange={(e) => handleCuisineChange(e.target.value)} />
      <label htmlFor='zip'>Zip Code</label>
      <input style={searchStyle} id="zip" type="text" placeholder="Search by ZIP Code" value={zipCode} onChange={(e) => handleZipCodeChange(e.target.value)} />
      <label htmlFor='city'>City</label>
      <input style={searchStyle} id="city" type="text" placeholder="Search by City" value={city} onChange={(e) => handleCityChange(e.target.value)} />
      <label htmlFor='address'>Address</label>
      <input style={searchStyle} id="address" type="text" placeholder="Search by Street Address" value={streetAddress} onChange={(e) => handleStreetAddressChange(e.target.value)} />
      <div>
      <label>
          Clear Sorts
          <input
            type="radio"
            name="sortOption"
            onChange={() => handleSortChange("none")}
          />
        </label>
        <label>
          Sort by Rating
          <input
            type="radio"
            name="sortOption"
            onChange={() => handleSortChange("rating")}
          />
        </label>
        <label>
          Sort by Distance
          <input
            type="radio"
            name="sortOption"
            onChange={() => handleSortChange("distance")}
          />
        </label>
      </div>
      <button style={buttonStyle} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;