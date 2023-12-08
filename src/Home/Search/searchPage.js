import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchName,
  setDistance
} from "./searchReducer";
import { useEffect } from "react";
import StarRating from "./starRating";
import ApiImport from "./ApiImport";
import * as favoriteAPI from "src/store/favorites";
import * as client from "src/store/api";
import "./styling/search.css";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const searchName = useSelector((state) => state.search.name);
  const searchResults = useSelector((state) => state.search.results);
  const searchDistance = useSelector((state) => state?.search?.distance);
  //console.log("Distance:", searchDistance);

  const [userLocation, setUserLocation] = useState(null);
  const [restaurantDistance, setRestaurantDistance] = useState([]);

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
  useEffect(() => {

    getUserLocation();
    dispatch(setSearchName(searchName));
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
        return { distance };
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

  return (
    <div className="container">
      <h1> Search </h1>
      <p>Seach for the best restaurants that cater to you needs!</p>
      <SearchBar />
      <div>
        <h3>Search Results:</h3>
        {searchResults?.length === 0 ? (
          <ApiImport />
        ) : (
          <ol>
            {searchResults?.length > 0 &&
              searchResults?.map((result, index) => (
                <Link key={result._id} to={`/restaurant/${result._id}`}>
                  <li key={result._id} className="restaurantList">
                    <h3 style={{ color: "blue" }}>{result.name}</h3>
                    <button
                      onClick={(e) => detectFavUnFavButton(e, result._id)}
                    >
                      Toggle Favorite
                    </button>
                    <div className="d-flex">
                      <StarRating rating={result.averageRating} />{" "}
                      <p>{result.reviews.length} reviews</p>
                    </div>
                    <strong>
                      {searchDistance.length === 0
                        ? ""
                        : Math.round(
                            searchDistance[index]?.distance * 10
                          ) /
                            10 +
                          " mi away"}{" "}
                    </strong>
                    <h5>
                      {result.streetAddress}, {result.City}, {result.zipCode}
                    </h5>
                    <h5>{result.cuisine}</h5>
                  </li>
                </Link>
              ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
