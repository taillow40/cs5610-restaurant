// Use reviews to get dietary information
import db from "./../temp-database"
import React from "react";
import { Link } from "react-router-dom";
import PostsList from "src/Posts/postsList";

// Will need to match restaurants and reviews by ID
function ReviewsBox({ rId }) {
    return (
        <div>
            <h2>
                Reviews
            </h2>

            <Link to={`/restaurant/${rId}/review`}>
                <button>Write a review</button>
            </Link>

            <hr/>
            <PostsList restaurantId={rId}/>
        </div>
    )
}

export default ReviewsBox;