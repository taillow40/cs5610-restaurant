// Use reviews to get dietary information
import React from "react";
import { Link } from "react-router-dom";
import PostsList from "src/Posts/postsList";

// Will need to match restaurants and reviews by ID
function ReviewsBox({ restaurant, reviews }) {
    console.log(reviews)
    return (
        <div>
            <Link className="right-button" to={`/restaurant/${restaurant._id}/review`}>Write a Review</Link>
            <h2>
                Reviews
            </h2>

            <hr/>
            <PostsList restaurant={restaurant} reviews={reviews}/>
        </div>
    )
}

export default ReviewsBox;