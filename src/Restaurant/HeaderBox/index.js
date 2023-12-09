import { Link } from "react-router-dom";
import PostStars from "src/Posts/postStars";

// Contains 
function HeaderBox({restaurant, reviews }) {
    
    const cuisinesList = restaurant.cuisine;

    // Get average rating from reviews
    const totalRating = reviews.reduce((acc, current) => {
        return acc + current.rating;
    }, 0);
    const averageRating = totalRating/reviews.length;

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
            <h1>{restaurant.name}</h1>
            <h6>{displayCuisines}</h6>
            <Link to={`/restaurant/${restaurant._id}/review`}>Write a Review</Link>
            <PostStars value={averageRating}/> {averageRating.toFixed(1)}/5, {reviews.length} reviews.
            <h6>{restaurant.streetAddress}</h6>
            <h6>{restaurant.City}</h6>
            <h6>{restaurant.zipcode}</h6>
        </div>

    )
}

export default HeaderBox;