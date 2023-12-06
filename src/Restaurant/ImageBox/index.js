import db from "./../temp-database"
import restaurantBanner from "./fiveguys.jpeg"

// Contains 
function ImageBox({ rId }) {
    const restaurantDb = db.restaurants;
    const reviewsDb = db.reviews;
    const cuisinesList = restaurantDb[0].cuisines;
    const matchingReviews = reviewsDb.filter(review => review.restaurant_id === rId );

    // Get average rating from reviews
    const totalRating = matchingReviews.reduce((acc, current) => {
        return acc + current.rating;
    }, 0);

    // Show cuisines as a string comma separated list, show no more than three - truncate with ellipses
    let displayCuisines;
    if (cuisinesList.length > 3) {
        displayCuisines = cuisinesList.slice(0, 3).join(', ') + '...';
    }
    else {
        displayCuisines = cuisinesList.join(', ');
    }


    return (
        <div>
            <div className="image-container">
                <img src={restaurantBanner} alt="restaurantimage" />
                <div className="text-overlay">
                    <h1>
                        {restaurantDb[0].name}
                    </h1>
                    <h4>
                        {displayCuisines}<br />
                        Rating: {(totalRating/matchingReviews.length).toFixed(1)}
                    </h4>
                </div>
            </div>
        </div>

    )
}

export default ImageBox;