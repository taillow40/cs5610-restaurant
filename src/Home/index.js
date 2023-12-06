import React, { useEffect, useState } from "react";
import RestaurantCard from "./Home_Components/restaurantCard";
import restaurantData from "../Database/restaurants.json";
//import PostsList from "./Posts/postsList";
//import AddPostForm from "./Posts/addPostForm";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as client from "src/store/api";
import StarRating from "./Search/starRating";
import { useSelector } from "react-redux";

function Home() {
  const [validUser, setValidUser] = useState(false);
  const cookie = Cookies.get("user");
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (cookie) {
      const checkValidToken = () => {
        const response = client.checkToken(cookie);
        if (response) {
          setValidUser(true);
        }
      };
      checkValidToken();
    }
  }, [cookie]);

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await client.account();
      if (fetchedProfile) {
        setProfile(fetchedProfile?.data);
      }
    };
    fetchProfile();
  }, [navigate]);
  const homeStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#36454F",
    height: "60vh",
  };
  const restaurants = restaurantData;
  console.log(profile?.cuisine[0]);

  // useEffect()
  const avgRating = (rating) => {
    let sum = 0;
    for (var i = 0; i < rating.length; i++) {
      sum += rating[i];
    }
    return sum / rating.length;
  };

  const searchDistance = useSelector((state) => state.search.distance);

  return (
    <>
      <div style={homeStyle}>
        <h1>Welcome to Restaurant Dev branch Justin's Version</h1>
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
          {validUser &&
            restaurants
              .filter((r) => r.cuisine[0] === profile?.cuisine[0])
              .map((result, i) => {
                return (
                  <Link key={result.id} to={`/restaurant/${result.id}`}>
                    <li
                      key={result.id}
                      className="restaurantList"
                      style={{
                        listStyle: "",
                      }}
                    >
                      <h3 style={{ color: "blue" }}>{result.name}</h3>
                      <div className="d-flex">
                        <StarRating rating={avgRating(result.reviews)} />{" "}
                        <p>{result.reviews.length} reviews</p>
                      </div>
                      <strong>
                        {searchDistance.length === 0
                          ? ""
                          : Math.round(
                              searchDistance[result.id - 1].distance * 10
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
