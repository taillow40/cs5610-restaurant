import restaurantBanner from "./fiveguys.jpeg"
import { useState } from "react";

 
// Contains 
function ImageBox({restaurant, reviews }) {
    


    const cuisinesList = restaurant.cuisine;

    // Get average rating from reviews
    const totalRating = reviews.reduce((acc, current) => {
        return acc + current.rating;
    }, 0);

    // Show cuisines as a string comma separated list, show no more than three - truncate with ellipses
    let displayCuisines;
    if(cuisinesList) {
        if (cuisinesList.length > 3) {
            displayCuisines = cuisinesList.slice(0, 3).join(', ') + '...';
        }
        else {
            displayCuisines = cuisinesList.join(', ');
        }
    }


    return (
        <div>
            <div className="image-container">
                <img src={restaurantBanner} alt="restaurantimage" />
                <div className="text-overlay">
                    <h1>
                        {restaurant.name}
                    </h1>
                    <h4>
                        {displayCuisines}<br />
                        Rating: {(totalRating/reviews.length).toFixed(1)}
                    </h4>
                </div>
            </div>
        </div>

    )
}

export default ImageBox;