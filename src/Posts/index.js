import React from 'react';
import AddPostForm from 'src/Posts/addPostForm';
import {useParams} from 'react-router-dom';
import './styling/posts.css'
const ReviewsPage = () => {

    const {rId} = useParams();

    return (
        <div className="addReviews">
            <h1>Add Your Review</h1>
            <AddPostForm restaurantId={rId}/>
        </div>
    );
};

export default ReviewsPage;
