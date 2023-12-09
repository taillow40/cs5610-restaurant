import React, { useEffect, useState } from "react";
// import RestaurantCard from "./Home_Components/restaurantCard";
// import * as restaurantData from "../Database/restaurants.json";
//import PostsList from "./Posts/postsList";
//import AddPostForm from "./Posts/addPostForm";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as client from "src/store/api";
import * as restaurantAPI from "src/store/restaurants";
import * as favoriteAPI from "src/store/favorites";
import StarRating from "./Search/starRating";
import { useSelector } from "react-redux";
import "./index.css";
import FavoriteButton from "./Home_Components/favoriteButton";

function Home() {
  const [validUser, setValidUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookie = Cookies.get("user");
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});


  useEffect(() => {
    if (cookie) {
      checkValidToken();
    }
  }, [cookie]);

  const checkValidToken = async () => {
    try {
      const response = await client.checkToken(cookie);
      if (response) {
        setValidUser(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await client.account();
      if (fetchedProfile) {
        
        setProfile(fetchedProfile?.data);
        const fetchedFavorites = await favoriteAPI.onGetUserFavorites(fetchedProfile?.data?._id)
        setFavorites(fetchedFavorites);
        const fetchedRestaurants = await getRests(fetchedProfile);
        fillRatings(fetchedRestaurants);
      }
    };
    fetchProfile();
  }, [navigate]);

  const fillRatings = async(fetchedRestaurants) => {
    const updatedRatings = {};
    for(let i = 0; i < fetchedRestaurants.length; i++){
      const fetchedRatings = await restaurantAPI.reviews(fetchedRestaurants[i]._id);
      const avg = fetchedRatings.reduce((total, next) => total + (next.rating ? next.rating : 0), 0) / fetchedRatings.length;
      updatedRatings[fetchedRestaurants[i]._id] = avg? avg : 0;
    }
    setRatings(updatedRatings);
  }
  const getRests = async (fetchedProfile) => {
    try {
      setLoading(true);
      const fetchedRestaurants =
        await restaurantAPI.findAllRestaurantsByCousine(
          fetchedProfile.data.cuisine
        );
      setRestaurants(fetchedRestaurants || []);
      return fetchedRestaurants;
    } catch (error) {
    } finally {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        setLoading(false);
      }, 1000);
    }
    
  };

  const searchDistance = useSelector((state) => state?.search?.distance);

  const detectFavUnFavButton = async (resId) => {
    const fetchedProfile = await client.account();
    if (!fetchedProfile) return navigate("/login");
    const userId = fetchedProfile?.data?._id;
    const response = await favoriteAPI.onGetUserFavorites(userId);
    const restaurant = response.restaurants?.find((res) => res == resId);
    return restaurant ? onRemoveFromFav(resId) : onAddToFav(resId);
  };
  const onAddToFav = async (restaurantId) => {
    const fetchedProfile = await client.account();
    const userId = fetchedProfile?.data?._id;
    await favoriteAPI.onAddToFavorites({
      userId,
      restaurantId,
    });
  };
  const onRemoveFromFav = async (restaurantId) => {

    const fetchedProfile = await client.account();
    const userId = fetchedProfile?.data?._id;
    await favoriteAPI.onRemoveFromFavorites({
      userId,
      restaurantId,
    });
  };

  const checkIsFavorite = (restaurantId) => {
    if(!profile) return false;
    const restaurant = favorites.restaurants?.find((res) => res == restaurantId);
    return restaurant ? true : false;
  }

  return (
    <>
      <div className='searchBar'>
        <Link to="/search">
          <button className="btn btn-search">Search For More</button>
        </Link>
      </div>
      <div
        className='restaurantListContainer'
      >
        <h2>Featured Restaurants</h2>
        <ul className='restaurantList'>
          {restaurants.map((result) => {
            return (
              
                <li
                  key={result._id}
                  className="restaurantListItems"
                >
                  <Link className="restaurantListLink" key={result._id} to={`/restaurant/${result._id}`}>
                  <h3 className="restaurantListTitle">{result.name}</h3>
                  <FavoriteButton isFavorite={checkIsFavorite(result._id)} callback={() => detectFavUnFavButton(result._id)}/>
                  <div className="d-flex">
                    <StarRating rating={ratings[result._id]} />{" "}
                    <span className='reviewsText'>{result.reviews.length} reviews</span>
                  </div>
                  {searchDistance.length != 0 && <strong>
                    {searchDistance.length === 0
                      ? ""
                      : Math.round(
                          searchDistance[result.id - 1]?.distance * 10
                        ) /
                          10 +
                        " mi away"}{" "}
                  </strong> }
                  <h5>
                    {result.streetAddress}, {result.City}, {result.zipCode}
                  </h5>
                  <h5>{result.cuisine.join(", ")}</h5>
                  </Link>
                </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Home;
