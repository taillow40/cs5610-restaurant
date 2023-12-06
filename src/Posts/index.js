import React from 'react';
import AddPostForm from 'src/Posts/addPostForm';
import {useParams} from 'react-router-dom';
import {useState, useEffect } from 'react';
import * as restaurantClient from 'src/store/restaurants';

const ReviewsPage = () => {

    const {rId} = useParams();

    console.log("Restaurant Id: ", rId)

    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        const findRestaurant = async () => {
            const restaurant = await restaurantClient.findRestaurantById(rId);
            console.log("Here is the restaurant:", restaurant);
            setRestaurant(restaurant);
        }
        findRestaurant();
    }, [])

    return (
        <div>
            <h1>Leave Your Review for {} </h1>
            <AddPostForm restaurantId={rId}/>
        </div>
    );
};

export default ReviewsPage;