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

function Home() {
  const [validUser, setValidUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookie = Cookies.get("user");
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

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
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await client.account();
      if (fetchedProfile) {
        getRests(fetchedProfile);
        setProfile(fetchedProfile?.data);
      }
    };
    fetchProfile();
  }, [navigate]);

  const getRests = async (fetchedProfile) => {
    try {
      setLoading(true);
      const fetchedRestaurants =
        await restaurantAPI.findAllRestaurantsByCousine(
          fetchedProfile.data.cuisine
        );
      setRestaurants(fetchedRestaurants || []);
    } catch (error) {
    } finally {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        setLoading(false);
      }, 1000);
    }
  };

  const homeStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#36454F",
    height: "60vh",
  };

  // console.log(profile?.cuisine[0]);

  const avgRating = (rating) => {
    let sum = 0;
    for (var i = 0; i < rating.length; i++) {
      sum += rating[i];
    }
    return sum / rating.length;
  };

  const searchDistance = useSelector((state) => state?.search?.distance);

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
    <>
      <div style={homeStyle}>
        <Link to="/search">
          <button className="btn btn-primary">Search</button>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Featured Restaurants</h2>
        <ol>
          {restaurants.map((result) => {
            return (
              <Link key={result._id} to={`/restaurant/${result._id}`}>
                <li
                  key={result._id}
                  className="restaurantList"
                  style={{
                    listStyle: "",
                  }}
                >
                  <h3 style={{ color: "blue" }}>{result.name}</h3>
                  <button onClick={(e) => detectFavUnFavButton(e, result._id)}>
                    Toggle Favorite
                  </button>
                  <div className="d-flex">
                    <StarRating rating={avgRating(result.reviews)} />{" "}
                    <p>{result.reviews.length} reviews</p>
                  </div>
                  <strong>
                    {searchDistance.length === 0
                      ? ""
                      : Math.round(
                          searchDistance[result.id - 1]?.distance * 10
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
            );
          })}
        </ol>
      </div>
    </>
  );
}

export default Home;
