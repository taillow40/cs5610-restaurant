import { React, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./searchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchName,
  setDistance,
  setCityFilter,
  setCuisineFilter,
  setSearchSuccess,
  setSearchError,
  setZipCodeFilter,
  setStreetAddressFilter,
  sortRating,
  sortDistance,
  searchAsync,
  BASE_API
} from "./searchReducer";
import { useEffect } from "react";
import StarRating from "./starRating";
import ApiImport from "./ApiImport";
import * as favoriteAPI from "src/store/favorites";
import * as client from "src/store/api";
import "./styling/search.css";
import axios from "axios";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const city = queryParams.get('city');
  const cuisine = queryParams.get('cuisine');
  const zipCode = queryParams.get('zipCode');
  const streetAddress = queryParams.get('streetAddress');
  const sort = queryParams.get('sortByRating');
  const sortDist = queryParams.get('sortByDistance');


  //console.log("Name", name);
  //console.log("Cuisine", cuisine);


  const [restaurants, setRestaurants] = useState([]);
  const searchName = useSelector((state) => state.search.name);
  const searchResults = useSelector((state) => state.search.results);
  const searchDistance = useSelector((state) => state?.search?.distance);
  const sortByRating = useSelector((state) => state.search.sortByRating);
  const sortByDistance = useSelector((state) => state.search.sortByDistance);

  //console.log("Distance:", searchDistance);

  const [userLocation, setUserLocation] = useState(null);
  const [restaurantDistance, setRestaurantDistance] = useState([]);
  const [userId, setUserId] = useState({});

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          setUserLocation(location);
          //console.log(location);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported in your browser.");
    }
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Earth radius in miles

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in miles
    return distance;
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const findUser = async () => {
    const fetchedProfile = await client.account();
    if(fetchedProfile){
        setUserId(fetchedProfile?.data._id);
    }
    else{
        setUserId(Date.now());
    }
  }
/*
  const fetchSearchCriteria = async () => {
    try {
      // Replace with actual user ID or authentication logic
      const response = await axios.get(`${BASE_API}/api/getSearchCriteria`);
        console.log("Response:", response);
      if (response.status === 200) {
        // Dispatch success action with retrieved search criteria
        dispatch(setSearchName(response.data.savedSearchCriteria.name));
        dispatch(setCuisineFilter(response.data.savedSearchCriteria.cuisine));
        dispatch(setCityFilter(response.data.savedSearchCriteria.city));
        dispatch(setZipCodeFilter(response.data.savedSearchCriteria.zipCode));
        dispatch(setStreetAddressFilter(response.data.savedSearchCriteria.streetAddress));
        dispatch(searchAsync());
      } else {
        // Dispatch error action if the criteria could not be retrieved
        dispatch(setSearchError());
      }
    } catch (error) {
      console.error('Error fetching search criteria:', error.message);
      // Dispatch error action if an exception occurred
      dispatch(setSearchError());
    }
  };
  */

  useEffect(() => {
    getUserLocation();
    dispatch(setSearchName(name));
    dispatch(setCuisineFilter(cuisine));
    dispatch(setCityFilter(city));
    dispatch(setZipCodeFilter(zipCode));
    dispatch(setStreetAddressFilter(streetAddress));
    dispatch(sortRating(sort));
    dispatch(sortDistance(sortDist));
    dispatch(searchAsync());
    // Fetch search criteria from the server
    //findUser();
    //fetchSearchCriteria();
  }, []);

  useEffect(() => {
    if (userLocation && searchResults.length > 0) {
      const updateResults = searchResults.map((restaurant) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.long,
          restaurant.Lat,
          restaurant.Long
        );
        const id = restaurant._id;
        return { distance, id };
      });
      dispatch(setDistance(updateResults));
      //console.log( 'Distance:', updateResults);
    }
  }, [userLocation]);

  const detectFavUnFavButton = async (e, resId) => {
    e.preventDefault();
    e.stopPropagation();
    const fetchedProfile = await client.account();
    if (!fetchedProfile) return navigate("/login");
    const userId = fetchedProfile?.data?._id;
    const response = await favoriteAPI.onGetUserFavorites(userId);
    const restaurant = response.restaurants?.find((res) => res == resId);
    return restaurant ? onRemoveFromFav(e, resId) : onAddToFav(e, resId);
  };
  const onAddToFav = async (e, restaurantId) => {
    const fetchedProfile = await client.account();
    const userId = fetchedProfile?.data?._id;
    await favoriteAPI.onAddToFavorites({
      userId,
      restaurantId,
    });
    alert("Added to favorites");
  };
  const onRemoveFromFav = async (e, restaurantId) => {
    const fetchedProfile = await client.account();
    const userId = fetchedProfile?.data?._id;
    await favoriteAPI.onRemoveFromFavorites({
      userId,
      restaurantId,
    });
    alert("Removed from favorites");
  };

    // Local state to store sorted results for display
    const [sortedResults, setSortedResults] = useState([]);

    useEffect(() => {
      // Sort the results when sortByRating changes
      //console.log("Search Distance:", searchDistance);
      if (sortByRating) {
        const sorted = [...searchResults].sort((a, b) => b.averageRating - a.averageRating);
        setSortedResults(sorted);
      }
      else if(sortByDistance && searchDistance.length !== 0){
        const sorted = [...searchResults].sort((a, b) => {
            const distanceA = searchDistance.find((d) => d.id == a._id)?.distance;
            const distanceB = searchDistance.find((d) => d.id == b._id)?.distance;
          
            // Handle the case where distances are undefined
            if (distanceA === undefined && distanceB === undefined) {
              return 0; // No change in order
            }
          
            if (distanceA === undefined) {
              return 1; // Move items with undefined distance to the end
            }
          
            if (distanceB === undefined) {
              return -1; // Move items with undefined distance to the end
            }
          
            // Compare distances directly
            return distanceA - distanceB;
          });
          //console.log("Sorted Dist", sorted);
        setSortedResults(sorted);
      } else {
        // Reset the sorted results if sortByRating is false
        setSortedResults([]);
      }
    }, [sortByRating, sortByDistance, searchResults]);
  
  return (
    <div className="container">
      <h1>Search</h1>
      <p>Search for the best restaurants that cater to your needs!</p>
      <SearchBar />
      <div>
        <h3>Search Results:</h3>
        {searchResults?.length === 0 ? (
          <ApiImport />
        ) : (
          <ol>
            {(sortByRating || sortByDistance) && sortedResults.length > 0 ? (
              // Display sorted results when sortByRating is true and sortedResults is not empty
              sortedResults.map((result, index) => (
                <Link key={result._id} to={`/restaurant/${result._id}`}>
                  <li key={result._id} className="restaurantList">
                    <h3 style={{ color: "blue" }}>{result.name}</h3>
                    <button onClick={(e) => detectFavUnFavButton(e, result._id)}>
                      Toggle Favorite
                    </button>
                    <div className="d-flex">
                      <StarRating rating={result.averageRating} />{" "}
                      <p>{result.reviews.length} reviews</p>
                    </div>
                    <strong>
                      {searchDistance.length === 0
                        ? ""
                        : Math.round(searchDistance.find((d) => d.id == result._id)?.distance * 10) /
                            10 +
                          " mi away"}{" "}
                    </strong>
                    <h5>
                      {result.streetAddress}, {result.City}, {result.zipCode}
                    </h5>
                    <h5>{result.cuisine}</h5>
                  </li>
                </Link>
              ))
            ) : (
              // Display original search results
              searchResults.map((result, index) => (
                <Link key={result._id} to={`/restaurant/${result._id}`}>
                  <li key={result._id} className="restaurantList">
                    <h3 style={{ color: "blue" }}>{result.name}</h3>
                    <button onClick={(e) => detectFavUnFavButton(e, result._id)}>
                      Toggle Favorite
                    </button>
                    <div className="d-flex">
                      <StarRating rating={result.averageRating} />{" "}
                      <p>{result.reviews.length} reviews</p>
                    </div>
                    <strong>
                      {searchDistance.length === 0
                        ? ""
                        : Math.round(searchDistance.find((d) => d.id == result._id)?.distance * 10) /
                            10 +
                          " mi away"}{" "}
                    </strong>
                    <h5>
                      {result.streetAddress}, {result.City}, {result.zipCode}
                    </h5>
                    <h5>{result.cuisine}</h5>
                  </li>
                </Link>
              ))
            )}
          </ol>
        )}
      </div>
    </div>
  );
};
export default SearchPage;
