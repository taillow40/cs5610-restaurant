import "./restaurant.css";
import React from 'react'
import SummaryBox from "./SummaryBox";
import ReviewsBox from "./ReviewsBox";
import * as restaurantClient from "src/store/restaurants";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderBox from "./HeaderBox";

function Restaurant() {
  const { rId } = useParams();

  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const findRestaurant = async () => {
      const restaurant = await restaurantClient.findRestaurantById(rId);
      setRestaurant(restaurant);
    };
    const findAllReviews = async () => {
      const reviews = await restaurantClient.reviews(rId);
      setReviews(reviews);
    };
    findRestaurant();
    findAllReviews();
  }, []);

  return (
    <div className="flex-down">
      <div class="d-none d-md-block">
        <div className="restaurant-card">
          {restaurant && <HeaderBox restaurant={restaurant} reviews={reviews} />}
        </div>
        <div className="restaurant-card">
          {restaurant && <SummaryBox restaurant={restaurant} reviews={reviews} />}
        </div>
        <div className="restaurant-card">
          {restaurant && <ReviewsBox restaurant={restaurant} reviews={reviews} />}
        </div>
      </div>
      <div class="d-block d-md-none">
        <div className="restaurant-card-mobile">
          {restaurant && <HeaderBox restaurant={restaurant} reviews={reviews} />}
        </div>
        <div className="restaurant-card-mobile">
          {restaurant && <SummaryBox restaurant={restaurant} reviews={reviews} />}
        </div>
        <div className="restaurant-card-mobile">
          {restaurant && <ReviewsBox restaurant={restaurant} reviews={reviews} />}
        </div>
      </div>
    </div>
  )
}

export default Restaurant;