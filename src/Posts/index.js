import React from 'react';
import AddPostForm from 'src/Posts/addPostForm';
import {useParams} from 'react-router-dom';
import {useState, useEffect } from 'react';
import * as restaurantClient from 'src/store/restaurants';

const ReviewsPage = () => {

    const {rId} = useParams();

    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        const findRestaurant = async () => {
            const restaurant = await restaurantClient.findRestaurantById(rId);
            setRestaurant(restaurant);
        }
        findRestaurant();
    }, [])

    return (
        <div>
            <h1>Leave Your Review for {restaurant.name} </h1>
            <AddPostForm rest={restaurant}/>
        </div>
    );
};

export default ReviewsPage;
