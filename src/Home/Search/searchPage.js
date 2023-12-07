import {React, useState} from "react";
import {Link} from 'react-router-dom';
import SearchBar from "./searchBar"
import {useDispatch, useSelector} from 'react-redux';
import {setSearchName, setDistance} from './searchReducer'
import {useEffect} from 'react'
import StarRating from "./starRating"
import ApiImport from "./ApiImport";
import * as restaurantClient from "src/store/restaurants";
import "./styling/search.css";
import { server } from "fontawesome";


const SearchPage = () => {

    const dispatch = useDispatch();
    const searchName = useSelector((state) => state.search.name);
    const searchResults = useSelector((state) => state.search.results);
    const searchDistance = useSelector((state) => state.search.distance);
    console.log("Distance:", searchDistance);

    const searchLoading = useSelector((state) => state.search.loading);
    const searchError = useSelector((state) => state.search.error);

    console.log("Error State:", searchError);

    const [userLocation, setUserLocation] = useState(null);
    const [restaurantDistance, setRestaurantDistance] = useState([]);

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) =>
            {
                const location = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                };
                setUserLocation(location);
                console.log(location);
            },
            (error) => {
                console.error('Error getting user location:', error.message)
            }
            );
        }
        else{
            console.error('Geolocation is not supported in your browser.')
        }
    };

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 3958.8; // Earth radius in miles
      
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = R * c; // Distance in miles
        return distance;
      }
      
      function toRadians(degrees) {
        return degrees * (Math.PI / 180);
      }

    useEffect(() =>{

        getUserLocation();

        //Add entire restaurant list when there is no search terms
        dispatch(setSearchName(searchName));

        console.log("Search Results:", searchResults);

    },[]);

   /* useEffect(() => {
        const findAllRestaurants = async () => {
            const allRestaurants = await restaurantClient.findAllRestaurants();
        }
    })
*/
    useEffect(() => {

        if(userLocation && searchResults.length > 0){
            const updateResults = searchResults.map((restaurant) => {
                console.log("Restaurant", restaurant);
                const distance = calculateDistance(userLocation.lat, userLocation.long, restaurant.Lat, restaurant.Long);
                return distance;
            });
            dispatch(setDistance(updateResults));
            console.log( 'Distance:', updateResults);
        } 

        console.log("user Location", userLocation);
        console.log("Search Distance", searchDistance);
        console.log("Search Results", searchResults);

    }, [userLocation, searchLoading, dispatch]);

    return(
        <div className="container">
            <h1> Search </h1>
            <p>Seach for the best restaurants that cater to you needs!</p>
            <SearchBar/>
            <div>
                <h3>Search Results:</h3>
                {searchLoading && <p>Loading...</p>}
                { !searchLoading && searchResults.length === 0 ? <ApiImport/> :
                (
                    <ol>
                    
                        {searchResults.map((result, index) => (
                            <Link key={result._id} to={`/restaurant/${result._id}`}>
                                <li key={result._id} className="restaurantList"> 
                                    <h3 style={{color: "blue"}}>{result.name}</h3>  
                                    <div className="d-flex">
                                    <StarRating rating={result.averageRating}/> <p>{result.reviews.length} reviews</p>
                                    </div>
                                    <strong>{searchDistance.length === 0 ? "" : Math.round(searchDistance[index] * 10)/10 + " mi away"} </strong>
                                    <h5>{result.streetAddress}, {result.City}, {result.zipCode}</h5>
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