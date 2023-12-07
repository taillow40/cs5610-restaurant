import "./restaurant.css";
import React from 'react'
import ImageBox from "./ImageBox";
import SummaryBox from "./SummaryBox";
import ReviewsBox from "./ReviewsBox";
import * as restaurantClient from "src/store/restaurants";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Restaurant() {
    const { rId } = useParams();

    const [restaurant, setRestaurant] = useState({});
    const [restaurants, setRestaurants] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      const findAllRestaurants = async () => {
        const restaurant = await restaurantClient.findRestaurantById(rId);
        setRestaurant(restaurant);
      };
      const findAllReviews = async () => {
        const reviews = await restaurantClient.reviews(rId);
        setReviews(reviews);
      };
      findAllRestaurants();
      findAllRestaurantsAvailable();
      findAllReviews();
    }, []);

    const findAllRestaurantsAvailable = async() => {
      try {
        const restaurants = await restaurantClient.findAllRestaurants();
        setRestaurants(restaurants);

      } catch (error) {
        
      }
    };

    return (
        <div className="flex-down">
            <div className="restaurant-card">
            {restaurant && <ImageBox restaurant={restaurant} reviews={reviews}/>}
            </div>
            <div className="restaurant-card">
            {restaurant &&<SummaryBox restaurants={restaurants} reviews={reviews}/>}
            </div>
            <div className="restaurant-card">
            {restaurant &&<ReviewsBox restaurant={restaurant} reviews={reviews}/>}
            </div>
        </div>
    )
}

export default Restaurant;